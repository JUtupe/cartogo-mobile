import {RootStackParamList} from '../navigation/screens';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CommonStyles} from '../util/styles';
import {ScrollView, StatusBar} from 'react-native';
import React from 'react';
import {SubmitHandler} from 'react-hook-form';
import {Colors} from '../util/colors';
import Toast from 'react-native-toast-message';
import {useRental} from '../context/Rental.hooks';
import {useAuth} from '../context/Auth.hooks';
import {OrderRequest, RentalRequest} from '../api/requests';
import {RentalForm} from '../components/organisms/RentalForm';
import {OrderForm} from '../components/organisms/OrderForm';
import dayjs from 'dayjs';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateOrder'>;

export const CreateOrderScreen = ({}: Props) => {
  const onSubmit: SubmitHandler<OrderRequest> = data => {
    //todo
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
