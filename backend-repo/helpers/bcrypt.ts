import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

export function hashing(password: string) {
  return bcrypt.hashSync(password, salt);
}
export function checking(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}
