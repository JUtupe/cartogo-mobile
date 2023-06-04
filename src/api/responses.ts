export interface UserResponse {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface RentalInvitationResponse {
  id: string;
  rentalId: string;
  rentalName: string;
  email: string;
}

export interface AuthResponse {
  accessToken: string;
  user: UserResponse;
  properties: {
    isMemberOfAnyRental: boolean;
    pendingInvitation?: RentalInvitationResponse;
  };
}
