export function filterAdult(data: any[], hideAdult: boolean) {
  return (
    data?.filter((item: any) => {
      if (hideAdult && item.adult === true) return false;
      return true;
    }) || []
  );
}
