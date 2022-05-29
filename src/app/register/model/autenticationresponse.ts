import { User } from "./user";

export interface AutenticationResponse {
    accessToken: string;
    user: User;
  }
  