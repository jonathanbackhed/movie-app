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

export function getAge(birthDay?: string): number {
  if (!birthDay) return -1;

  const today = new Date();
  const birth = new Date(birthDay);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

export function formatDateFancy(date?: string): string {
  if (!date) return "N/A";

  return new Date(date).toUTCString().slice(5, 16);
}
