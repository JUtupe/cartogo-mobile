import {RootStackParamList} from '../../navigation/screens';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CommonStyles} from '../../util/styles';
import {ScrollView, StatusBar} from 'react-native';
import React from 'react';
import {SubmitHandler} from 'react-hook-form';
import {Colors} from '../../util/colors';
import Toast from 'react-native-toast-message';
import {useRental} from '../../context/Rental.hooks';
import {OrderRequest} from '../../api/requests';
import {OrderForm, OrderFormData} from '../../components/organisms/OrderForm';
import dayjs from 'dayjs';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateOrder'>;

export const CreateOrderScreen = ({navigation}: Props) => {
  const {createOrder} = useRental();

  const onSubmit: SubmitHandler<OrderFormData> = data => {
    const request: OrderRequest = {
      number: data.number,
      amount: data.amount,
      paymentMethod: data.paymentMethod,
      vehicleId: data.vehicleId.id,
      deliveryDate: dayjs(data.deliveryDate).toISOString(),
      receptionDate: dayjs(data.receptionDate).toISOString(),
      customer: {
        firstName: data.customer.firstName,
        lastName: data.customer.lastName,
        email: data.customer.email,
        phoneNumber: data.customer.phoneNumber,
      },
    };
    createOrder(request)
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Zlecenie zostało utworzone.',
        });

        navigation.goBack();
      })
      .catch(e => {
        console.log(e);

        Toast.show({
          type: 'error',
          text1: 'Nie udało się utworzyć zlecenia.',
          text2: 'Sprawdź poprawność formularza lub spróbuj ponownie później.',
        });
      });
  };

  return (
    <SafeAreaView style={CommonStyles.cutoutContainer}>
      <StatusBar backgroundColor={Colors.Dark1} />
      <ScrollView
        overScrollMode={'never'}
        style={CommonStyles.cutoutStyle}
        contentContainerStyle={CommonStyles.cutoutContentContainer}>
        <OrderForm
          onSubmit={onSubmit}
          defaultValues={{
            paymentMethod: 'CASH',
            deliveryDate: dayjs().toDate(),
            receptionDate: dayjs().add(1, 'd').toDate(),
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
