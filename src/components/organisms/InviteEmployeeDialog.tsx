import React from 'react';
import {Dialog} from '../molecules/Dialog';
import {TextView} from '../atoms/TextView';
import {Colors} from '../../util/colors';
import {View} from 'react-native';
import {Button} from '../atoms/Button';
import {SubmitHandler, useForm} from 'react-hook-form';
import {ControlledInput} from '../atoms/ControlledInput';
import {Validations} from '../../util/validations';
import {InvitationRequest} from '../../api/requests';
import Toast from 'react-native-toast-message';
import {useRental} from '../../context/Rental.hooks';

interface InviteEmployeeDialogProps {
  isOpen: boolean;
  onDismiss: () => void;
}

export const InviteEmployeeDialog: React.FC<InviteEmployeeDialogProps> = ({
  isOpen,
  onDismiss,
}) => {
  const {inviteEmployee} = useRental();
  const {control, handleSubmit, reset} = useForm<InvitationRequest>();

  const onSubmit: SubmitHandler<InvitationRequest> = data => {
    inviteEmployee(data.email)
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Zaproszenie zostało wysłane',
        });

        reset({email: ''});
        onDismiss();
      })
      .catch(e => {
        Toast.show({
          type: 'error',
          text1: 'Nie udało się wysłać zaproszenia',
        });
      });
  };

  const onClickOutside = () => {
    reset({email: ''});
    onDismiss();
  };

  return (
    <Dialog isOpen={isOpen} onDismiss={onClickOutside}>
      <TextView variant={'headingS'} bold style={{color: Colors.White}}>
        Zaproś pracownika
      </TextView>

      <ControlledInput
        name={'email'}
        control={control}
        rules={{
          required: Validations.required,
          pattern: Validations.email,
        }}
        label={'Email'}
        labelStyle={{color: Colors.White}}
        greedy={false}
      />

      <View
        style={{
          display: 'flex',
          gap: 8,
          flexDirection: 'row',
        }}>
        <Button title={'Anuluj'} onPress={onDismiss} style={{flexGrow: 1}} />
        <Button
          title={'Zaproś'}
          onPress={handleSubmit(onSubmit)}
          primary
          style={{flexGrow: 1}}
        />
      </View>
    </Dialog>
  );
};
