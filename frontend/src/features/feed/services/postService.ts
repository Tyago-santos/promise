export function daysSince(date: string): number {
  const dias = Math.floor(
    (Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24),
  );
  return Math.max(dias, 0);
}

export function formatCommentAge(date: string): string {
  const dias = daysSince(date);
  if (dias < 1) return "hoje";
  return dias === 1 ? "há 1 dia" : `há ${dias} dias`;
}
