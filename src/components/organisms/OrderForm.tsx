import {TextView} from '../atoms/TextView';
import {ControlledInput} from '../atoms/ControlledInput';
import {Validations} from '../../util/validations';
import {View} from 'react-native';
import {Button} from '../atoms/Button';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {ControlledRadioButton} from '../atoms/ControlledRadioButton';
import {DateInput} from '../atoms/DateInput';

export interface OrderFormData {
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

export interface OrderFormProps {
  onSubmit: (data: OrderFormData) => void;
  defaultValues?: Partial<OrderFormData>;
}

export const OrderForm: React.FC<OrderFormProps> = ({
  onSubmit,
  defaultValues,
}) => {
  const {control, watch, handleSubmit, setValue} = useForm<OrderFormData>({
    defaultValues: defaultValues,
  });

  return (
    <>
      <TextView variant={'bodyM'} bold>
        Szczegóły zlecenia
      </TextView>

      <ControlledInput
        name={'number'}
        control={control}
        rules={{required: Validations.required}}
        label={'Nr. zlecenia'}
      />

      <ControlledInput
        name={'amount'}
        control={control}
        rules={{required: Validations.required}}
        label={'Kwota zlecenia (zł)'}
      />
      <View
        style={{
          width: '100%',
          gap: 16,
          flexDirection: 'row',
        }}>
        <ControlledRadioButton
          control={control}
          name={'paymentMethod'}
          title={'Gotówka'}
          value={'CASH'}
        />
        <ControlledRadioButton
          control={control}
          name={'paymentMethod'}
          title={'Karta'}
          value={'CARD'}
        />
        <ControlledRadioButton
          control={control}
          name={'paymentMethod'}
          title={'Przelew'}
          value={'TRANSFER'}
        />
      </View>

      <View
        style={{
          width: '100%',
          gap: 16,
          alignItems: 'flex-start',
          flexDirection: 'row',
        }}>
        <Controller
          control={control}
          rules={{required: Validations.required}}
          render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
            <DateInput
              setDate={onChange}
              value={value}
              error={error?.message}
              label={'Data wydania'}
            />
          )}
          name={'deliveryDate'}
        />
        <Controller
          control={control}
          rules={{required: Validations.required}}
          render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
            <DateInput
              setDate={onChange}
              value={value}
              error={error?.message}
              label={'Data odbioru'}
            />
          )}
          name={'receptionDate'}
        />
      </View>

      <TextView variant={'bodyM'} bold>
        Informacje o kliencie
      </TextView>

      <View style={{gap: 16, flexDirection: 'row'}}>
        <ControlledInput
          name={'customer.firstName'}
          control={control}
          rules={{required: Validations.required}}
          label={'Imię'}
        />
        <ControlledInput
          name={'customer.lastName'}
          control={control}
          rules={{required: Validations.required}}
          label={'Nazwisko'}
        />
      </View>

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
