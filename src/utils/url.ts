export const getAssetUrl = (path: string) => {
  const url = new URL(location.origin);
  url.pathname = path;
  return url.href;
};
