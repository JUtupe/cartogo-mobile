import {TextView} from '../atoms/TextView';
import {ControlledInput} from '../atoms/ControlledInput';
import {Validations} from '../../util/validations';
import {View} from 'react-native';
import {Button} from '../atoms/Button';
import React from 'react';
import {useForm} from 'react-hook-form';
import {ControlledRadioButton} from '../atoms/ControlledRadioButton';
import {ControlledSlider} from '../atoms/ControlledSlider';

export interface ReceptionFormData {
  address: {
    postalCode: string;
    street: string;
    city: string;
  };
  vehicleState: {
    mileage: string;
    fuelLevel: number;
    condition: 'CLEAN' | 'DIRTY' | 'SLIGHTLY_DIRTY';
  };
}

export interface DeliveryFormProps {
  onSubmit: (data: ReceptionFormData) => void;
  defaultValues?: Partial<ReceptionFormData>;
}

export const ReceptionForm: React.FC<DeliveryFormProps> = ({
  onSubmit,
  defaultValues,
}) => {
  const {control, watch, handleSubmit, setValue} = useForm<ReceptionFormData>({
    defaultValues: defaultValues,
  });

  const [fuelLevel] = watch(['vehicleState.fuelLevel']);

  return (
    <>
      <TextView variant={'bodyM'} bold>
        Podstawowe dane
      </TextView>

      <ControlledInput
        name={'description'}
        control={control}
        multiline
        inputStyle={{height: 100}}
        label={'Opis (opcjonalne)'}
      />

      <TextView variant={'bodyM'} bold>
        Adres odbioru pojazdu
      </TextView>

      <View style={{gap: 16, flexDirection: 'row'}}>
        <ControlledInput
          name={'customer.address.postalCode'}
          control={control}
          placeholder={'00-000'}
          rules={{
            pattern: Validations.postalCode,
            required: Validations.required,
          }}
          label={'Kod pocztowy'}
        />
        <ControlledInput
          name={'customer.address.city'}
          control={control}
          rules={{required: Validations.required}}
          label={'Miejscowość'}
        />
        <ControlledInput
          name={'customer.address.street'}
          control={control}
          rules={{required: Validations.required}}
          label={'Ulica'}
        />
      </View>

      <TextView variant={'bodyM'} bold>
        Stan pojazdu
      </TextView>

      <ControlledInput
        control={control}
        name={'vehicleState.mileage'}
        label={'Przebieg'}
        keyboardType={'number-pad'}
      />

      <ControlledSlider
        control={control}
        name={'vehicleState.fuelLevel'}
        label={`Poziom paliwa (${fuelLevel}%)`}
        min={0}
        max={100}
      />

      <View style={{width: '100%', gap: 16, alignItems: 'flex-start'}}>
        <ControlledRadioButton
          control={control}
          name={'vehicleState.condition'}
          title={'Czysty'}
          value={'CLEAN'}
        />
        <ControlledRadioButton
          control={control}
          name={'vehicleState.condition'}
          title={'Lekko brudny'}
          value={'SLIGHTLY_DIRTY'}
        />
        <ControlledRadioButton
          control={control}
          name={'vehicleState.condition'}
          title={'Brudny'}
          value={'DIRTY'}
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
