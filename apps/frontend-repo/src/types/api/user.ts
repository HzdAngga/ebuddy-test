import { CommonResponse } from "../common/response";

export interface ApiUser {
  id: string;
  email: string;
  totalAverageWeightRatings: number;
  numberOfRents: number;
  recentlyActive: string;
  password: string;
  name: string;
  rankingScore: string;
  highestRents?: number;
}

export type GetAllUsersReponse = {
  users: ApiUser[];
} & CommonResponse;

export type UpdateUserBody = Omit<
  ApiUser,
  "password" | "recentlyActive" | "email"
>;
