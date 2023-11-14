export interface OrderRequest {
  number: string;
  amount: number;
  paymentMethod: 'CASH' | 'CARD' | 'TRANSFER';
  deliveryDate: Date;
  receptionDate: Date;
  customer: {
    firstName: string;
    lastName: string;
    address: {
      postalCode: string;
      street: string;
      city: string;
    };
  };
}

export interface RentalRequest {
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
}

export interface VehicleRequest {
  registrationNumber: string;
  name: string;
  state: {
    mileage: number;
    fuelLevel: number;
    condition: 'CLEAN' | 'DIRTY' | 'SLIGHTLY_DIRTY';
  };
}

export interface InvitationRequest {
  email: string;
}
