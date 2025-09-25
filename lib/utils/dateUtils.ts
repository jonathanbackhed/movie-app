export function formatDateShowYearOnly(date: string, date2?: string | null) {
  if (date2) {
    if (date2 === null) {
      return `${date?.slice(0, 4)} - `;
    }
    if (date?.slice(0, 4) !== date2?.slice(0, 4)) {
      return `${date?.slice(0, 4)} - ${date2?.slice(0, 4)}`;
    }
  }

  return date?.slice(0, 4);
}

export function isUnreleased(date: string): boolean {
  if (!date) return false;

  const today = new Date();
  const releaseDate = new Date(date);
  return releaseDate > today;
}
