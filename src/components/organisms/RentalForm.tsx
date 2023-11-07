import {TextView} from '../atoms/TextView';
import {ControlledInput} from '../atoms/ControlledInput';
import {Validations} from '../../util/validations';
import {View} from 'react-native';
import {Button} from '../atoms/Button';
import React from 'react';
import {useForm} from 'react-hook-form';
import {RentalRequest} from '../../api/requests';

export interface RentalFormProps {
  onSubmit: (data: RentalRequest) => void;
  defaultValues?: Partial<RentalRequest>;
}

export const RentalForm: React.FC<RentalFormProps> = ({
  onSubmit,
  defaultValues,
}) => {
  const {control, watch, handleSubmit, setValue} = useForm<RentalRequest>({
    defaultValues: defaultValues,
  });

  return (
    <>
      <TextView variant={'bodyM'} bold>
        Podstawowe dane
      </TextView>

      <ControlledInput
        name={'name'}
        control={control}
        rules={{required: Validations.required}}
        label={'Nazwa wypożyczalni'}
      />

      <View style={{gap: 16, flexDirection: 'row'}}>
        <ControlledInput
          name={'address.postalCode'}
          control={control}
          placeholder={'00-000'}
          rules={{
            pattern: {
              value: /^\d{2}-\d{3}$/,
              message: 'Kod pocztowy musi być w formacie 00-000',
            },
            required: Validations.required,
          }}
          label={'Kod pocztowy'}
        />
        <ControlledInput
          name={'address.city'}
          control={control}
          rules={{required: Validations.required}}
          label={'Miejscowość'}
        />
        <ControlledInput
          name={'address.street'}
          control={control}
          rules={{required: Validations.required}}
          label={'Ulica'}
        />
      </View>

      <TextView variant={'bodyM'} bold>
        Dane do dokumentów
      </TextView>

      <ControlledInput
        name={'nip'}
        control={control}
        label={'NIP'}
        rules={{
          required: Validations.required,
          minLength: {
            value: 10,
            message: 'NIP musi mieć 10 znaków',
          },
        }}
      />

      <View style={{gap: 16, flexDirection: 'row'}}>
        <ControlledInput
          name={'owner.firstName'}
          control={control}
          rules={{required: Validations.required}}
          label={'Imię właściciela'}
        />
        <ControlledInput
          name={'owner.lastName'}
          control={control}
          rules={{required: Validations.required}}
          label={'Nazwisko właściciela'}
        />
      </View>

      <View style={{width: '100%', gap: 16, alignItems: 'flex-end'}}>
        <Button
          title={'Zapisz'}
          primary
          greedy={false}
          style={{alignSelf: 'flex-end'}}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </>
  );
};
