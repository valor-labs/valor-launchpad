export function formatStartEnd(startAt: string, endAt: string) {
  let start: Date;
  let end: Date;
  if (!startAt || !endAt) {
    start = new Date();
    end = new Date();
  } else {
    start = new Date(startAt);
    end = new Date(endAt);
  }
  return { start, end };
}
