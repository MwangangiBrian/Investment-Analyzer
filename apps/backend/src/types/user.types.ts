export interface UserInput {
  email: string;
  userName: string;
  password: string;
}

export interface UserOutput {
  userId: string;
  email: string;
  userName: string;
}

export interface AuthResponse {
  user: UserOutput;
  accessToken: string;
}