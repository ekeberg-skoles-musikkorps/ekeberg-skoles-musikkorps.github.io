export function randomString(length: number = 50) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let counter = 0; counter < length; counter++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
