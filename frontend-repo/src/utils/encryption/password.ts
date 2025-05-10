export const passwordEncrypt = (value: string) => {
  return btoa(value);
};

export const passwordDecrypt = (value: string) => {
  return atob(value);
};
