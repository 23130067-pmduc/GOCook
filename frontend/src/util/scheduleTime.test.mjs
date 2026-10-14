import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const source = await readFile(new URL('./scheduleTime.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
const { vietnamNow, canManageSlot, nextStartTime } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
test('uses Vietnam time across UTC date boundaries', () => {
  assert.equal(vietnamNow(new Date('2026-10-13T18:00:00Z')), '2026-10-14T01:00:00');
  assert.equal(vietnamNow(new Date('2026-10-14T17:00:00Z')), '2026-10-15T00:00:00');
});
test('past dates, started slots and exact current time are read only', () => {
  const now = '2026-10-14T15:00:00';
  assert.equal(canManageSlot('2026-10-13', '23:59', now), false);
  assert.equal(canManageSlot('2026-10-14', '09:00:00', now), false);
  assert.equal(canManageSlot('2026-10-14', '15:00', now), false);
  assert.equal(canManageSlot('2026-10-14', '15:01', now), true);
  assert.equal(canManageSlot('2026-10-15', '00:00', now), true);
});
test('minimum time advances to the next minute, including after 23:59', () => {
  assert.equal(nextStartTime('2026-10-14', '2026-10-14T15:00:01'), '15:01');
  assert.equal(nextStartTime('2026-10-14', '2026-10-14T23:58:59'), '23:59');
  assert.equal(nextStartTime('2026-10-14', '2026-10-14T23:59:00'), undefined);
  assert.equal(canManageSlot('2026-10-14', '23:59', '2026-10-14T23:59:00'), false);
  assert.equal(nextStartTime('2026-10-15', '2026-10-14T15:00:00'), undefined);
});
