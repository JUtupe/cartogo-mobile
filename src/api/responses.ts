export interface UserResponse {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface AuthResponse {
  user: UserResponse;
  accessToken: string;
}
