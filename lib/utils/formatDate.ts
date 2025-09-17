export function formatDateShowYearOnly(date: string, date2?: string) {
  if (date2) {
    if (date?.slice(0, 4) !== date2?.slice(0, 4)) {
      return `${date?.slice(0, 4)} - ${date2?.slice(0, 4)}`;
    }
  }

  return date?.slice(0, 4);
}
