export const extractTokenFromCookie = (
  cookieString: string,
  tokenName: string
): string | null => {
  const cookies = cookieString.split(";");

  for (const cookie of cookies) {
    const [key, value] = cookie.trim().split("=");

    if (key === tokenName) {
      return decodeURIComponent(value);
    }
  }

  return null;
};
