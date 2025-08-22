export const getAssetUrl = (path: string) => {
  if (path.startsWith('http')) return path;
  const url = new URL(location.origin);
  const [pathWithoutQuery, query] = path.split('?');
  url.pathname = pathWithoutQuery ?? '/';
  if (query) {
    url.search = `?${query}`;
  }
  return url.href;
};
