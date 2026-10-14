import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

async function moduleUrl(relative) {
  const source = await readFile(new URL(relative, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
  return `data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`;
}
let source = await readFile(new URL('./loginDestination.ts', import.meta.url), 'utf8');
source = source.replace('../constants/roles', await moduleUrl('../constants/roles.ts'))
  .replace('../constants/routes', await moduleUrl('../constants/routes.ts'));
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
const { loginDestination, accountDestination } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
test('role defaults and account links land in the appropriate workspace', () => {
  assert.equal(loginDestination(['ROLE_INSTRUCTOR']), '/seller');
  assert.equal(accountDestination(['ROLE_INSTRUCTOR']), '/seller');
  assert.equal(loginDestination(['ROLE_SYSTEM_ADMIN']), '/admin');
  assert.equal(loginDestination(['ROLE_USER']), '/');
  assert.equal(accountDestination(['ROLE_USER']), '/account');
  assert.equal(loginDestination(['ROLE_USER', 'ROLE_INSTRUCTOR']), '/seller');
});
test('protected intended destinations survive login only for the matching role', () => {
  assert.equal(loginDestination(['ROLE_INSTRUCTOR'], '/seller/schedule?date=2026-10-14'), '/seller/schedule?date=2026-10-14');
  assert.equal(loginDestination(['ROLE_USER'], '/seller'), '/');
  assert.equal(loginDestination(['ROLE_INSTRUCTOR'], '/admin/users'), '/seller');
  assert.equal(loginDestination(['ROLE_USER'], '/orders'), '/orders');
});
test('external destinations and authentication loops are rejected', () => {
  for (const from of ['https://example.invalid', '//example.invalid', '/\\example.invalid', '/login?next=1', '/logout']) {
    assert.equal(loginDestination(['ROLE_INSTRUCTOR'], from), '/seller');
  }
});
