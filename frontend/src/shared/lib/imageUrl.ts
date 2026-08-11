export function getOptimizedImageUrl(url: string, width: number, quality = 65) {
  if (!url.includes("images.unsplash.com")) return url;

  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}auto=format&fit=crop&w=${width}&q=${quality}`;
}
