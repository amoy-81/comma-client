export function cookieParse(cookieString: string): { [key: string]: string } {
  const cookieParts = cookieString.split(";").map((part) => part.trim());
  const cookieObj: { [key: string]: string } = {};

  cookieParts.forEach((part) => {
    const [key, value] = part.split("=");
    if (key && value) {
      cookieObj[key] = value;
    }
  });

  return cookieObj;
}
