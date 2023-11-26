import {RootStackParamList} from '../../navigation/screens';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CommonStyles} from '../../util/styles';
import {ScrollView, StatusBar} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {SubmitHandler} from 'react-hook-form';
import {Colors} from '../../util/colors';
import {OrderForm, OrderFormData} from '../../components/organisms/OrderForm';
import dayjs from 'dayjs';
import {useRental} from '../../context/Rental.hooks';
import {OrderRequest} from '../../api/requests';
import Toast from 'react-native-toast-message';
import DeleteIcon from '../../assets/icons/delete.svg';
import {
  ImperativeConfirmDialog,
  ImperativeConfirmDialogRef,
} from '../../components/molecules/ConfirmDialog';

type Props = NativeStackScreenProps<RootStackParamList, 'EditOrder'>;

export const EditOrderScreen = ({route, navigation}: Props) => {
  const {orderId} = route.params;
  const {orders, editOrder, deleteOrder} = useRental();
  const order = orders.find(o => o.id === orderId);
  const dialogRef = useRef<ImperativeConfirmDialogRef>(null);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <DeleteIcon
          color={Colors.White}
          onPress={() => {
            dialogRef.current?.open();
          }}
        />
      ),
    });
  }, [navigation]);

  if (!order) {
    navigation.goBack();
    return null;
  }

  const onDeleteOrderPress = () => {
    deleteOrder(orderId)
      .then(() => {
        // navigation.goBack();

        Toast.show({
          type: 'success',
          text1: 'Zlecenie zostało usunięte',
        });
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'Nie udało się usunąć zlecenia',
        });
      });
  };

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

    editOrder(orderId, request)
      .then(() => {
        navigation.goBack();

        Toast.show({
          type: 'success',
          text1: 'Zlecenie zostało zaktualizowane',
        });
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'Nie udało się zaktualizować zlecenia',
        });
      });
  };

  return (
    <SafeAreaView style={CommonStyles.cutoutContainer}>
      <ImperativeConfirmDialog
        ref={dialogRef}
        title={'Usuń zlecenie'}
        description={'Czy na pewno chcesz usunąć zlecenie?'}
        confirmText={'Usuń'}
        onConfirm={onDeleteOrderPress}
      />
      <StatusBar backgroundColor={Colors.Dark1} />
      <ScrollView
        overScrollMode={'never'}
        style={CommonStyles.cutoutStyle}
        contentContainerStyle={CommonStyles.cutoutContentContainer}>
        <OrderForm
          onSubmit={onSubmit}
          defaultValues={{
            number: order.number,
            amount: order.amount,
            paymentMethod: order.paymentMethod,
            vehicleId: {
              id: order.vehicle.id,
              label:
                order.vehicle.name + ' ' + order.vehicle.registrationNumber,
            },
            deliveryDate: dayjs(order.deliveryDate).toDate(),
            receptionDate: dayjs(order.receptionDate).toDate(),
            customer: {
              firstName: order.customer.firstName,
              lastName: order.customer.lastName,
              email: order.customer.email,
              phoneNumber: order.customer.phoneNumber,
            },
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
