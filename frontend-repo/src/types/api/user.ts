export interface ApiUser {
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
}

export type GetAllUsersReponse = ApiUser[];
