export function formatRuntime(runtime: number = -1) {
  if (runtime === -1) return "N/A";

  if (runtime > 60) {
    return `${Math.floor(runtime / 60)}h ${Math.floor(runtime % 60)}m`;
  }

  return `${runtime} minutes`;
}
