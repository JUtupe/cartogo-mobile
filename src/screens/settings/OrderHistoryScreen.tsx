import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/screens';
import {CommonStyles} from '../../util/styles';
import {FlatList, ScrollView, StatusBar} from 'react-native';
import {Colors} from '../../util/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import React from 'react';
import {useRental} from '../../context/Rental.hooks';
import {OrderResponse} from '../../api/responses';
import {EmptyState} from '../../components/molecules/EmptyState';
import NotAMember from '../../assets/icons/not-a-member.svg';
import {OrderItem} from '../../components/molecules/OrderItem';

type OrderHistoryScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'OrderHistory'
>;

export const OrderHistoryScreen = ({}: OrderHistoryScreenProps) => {
  const {orders} = useRental();
  const doneOrders = orders.filter(order => order.isDone);

  return (
    <SafeAreaView style={CommonStyles.cutoutContainer}>
      <StatusBar backgroundColor={Colors.Dark1} />
      <FlatList<OrderResponse>
        style={CommonStyles.cutoutStyle}
        contentContainerStyle={{gap: 16, display: 'flex', height: '100%'}}
        data={doneOrders}
        ListEmptyComponent={() => (
          <EmptyState
            icon={<NotAMember width={100} height={100} />}
            title={'Brak zakończonych zleceń'}
            description={'Tu pojawią się zakończone zlecenia'}
          />
        )}
        keyExtractor={item => item.id}
        renderItem={({item}) => <OrderItem order={item} hideActions />}
      />
    </SafeAreaView>
  );
};
