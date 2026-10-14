export function vietnamNow(now = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const part = (type: string) => parts.find((p) => p.type === type)!.value;
  return `${part("year")}-${part("month")}-${part("day")}T${part("hour")}:${part("minute")}:${part("second")}`;
}

export function canManageSlot(
  date: string,
  start: string,
  now = vietnamNow(),
): boolean {
  return `${date}T${start.length === 5 ? `${start}:00` : start}` > now;
}

export function nextStartTime(date: string, now: string): string | undefined {
  if (date !== now.slice(0, 10)) return undefined;
  const minutes =
    Number(now.slice(11, 13)) * 60 + Number(now.slice(14, 16)) + 1;
  if (minutes >= 1440) return undefined;
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}
