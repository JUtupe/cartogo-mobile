import {RentalResponse} from '../api/responses';
import React, {createContext, useState} from 'react';
import {
  createInvitation as apiCreateInvitation,
  deleteInvitation as apiDeleteInvitation,
  deleteEmployee as apiDeleteEmployee,
} from '../api/rental.api';

interface RentalContextProps {
  rental: RentalResponse | null;
  initRental: (rental: RentalResponse) => void;
  inviteEmployee: (email: string) => Promise<void>;
  deleteEmployee: (userId: string) => Promise<void>;
  deleteInvitation: (invitationId: string) => Promise<void>;
}

export const RentalContext = createContext<RentalContextProps>({
  rental: null,
  initRental: () => {},
  inviteEmployee: () => Promise.reject(),
  deleteEmployee: () => Promise.reject(),
  deleteInvitation: () => Promise.reject(),
});

interface Props {
  children: React.ReactNode;
}

export const RentalProvider = ({children}: Props) => {
  const [rental, setRental] = useState<RentalResponse | null>(null);

  const initRental = (rental: RentalResponse) => {
    setRental(rental);
  };

  const inviteEmployee = async (email: string) => {
    if (!rental) {
      return Promise.reject('No rental');
    }

    try {
      const savedRental = await apiCreateInvitation(email);

      setRental(savedRental);

      return Promise.resolve();
    } catch (error: any) {
      return Promise.reject(error.message);
    }
  };

  const deleteEmployee = async (employeeId: string) => {
    if (!rental) {
      return Promise.reject('No rental');
    }

    try {
      await apiDeleteEmployee(employeeId);

      //remove invitation from rental
      const updatedRental = rental;
      updatedRental.users = updatedRental.users.filter(
        user => user.id !== employeeId,
      );

      setRental({...updatedRental});

      return Promise.resolve();
    } catch (error: any) {
      return Promise.reject(error);
    }
  };

  const deleteInvitation = async (invitationId: string) => {
    if (!rental) {
      return Promise.reject('No rental');
    }

    try {
      await apiDeleteInvitation(invitationId);

      //remove invitation from rental
      const updatedRental = rental;
      updatedRental.invitations = updatedRental.invitations.filter(
        invitation => invitation.id !== invitationId,
      );

      setRental({...updatedRental});

      return Promise.resolve();
    } catch (error: any) {
      return Promise.reject(error);
    }
  };

  return (
    <RentalContext.Provider
      value={{
        rental: rental,
        inviteEmployee: inviteEmployee,
        initRental: initRental,
        deleteEmployee: deleteEmployee,
        deleteInvitation: deleteInvitation,
      }}>
      {children}
    </RentalContext.Provider>
  );
};
