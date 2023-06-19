export interface UserResponse {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
}

export interface RentalResponse {
  id: string;
  name: string;
  nip: string;
  address: {
    postalCode: string;
    street: string;
    city: string;
  };
  owner: {
    firstName: string;
    lastName: string;
  };
  ownerId: string;
  users: UserResponse[];
  invitations: RentalInvitationResponse[];
}

export interface VehicleResponse {
  id: string;
  registrationNumber: string;
  name: string;
  image?: string;
  state: {
    mileage: number;
    fuelLevel: number;
    condition: 'CLEAN' | 'DIRTY' | 'SLIGHTLY_DIRTY';
  };
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
  rental?: RentalResponse;
  properties: {
    isMemberOfAnyRental: boolean;
    isRentalOwner: boolean;
    pendingInvitation?: RentalInvitationResponse;
  };
}
