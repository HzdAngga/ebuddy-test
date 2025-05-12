import jwt from "jsonwebtoken";

export function getToken(payload: string | object) {
  return jwt.sign(payload, process.env.JWT_SECRET || "");
}

export function verify(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET || "");
}
