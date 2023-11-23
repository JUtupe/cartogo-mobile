import {CommonStyles} from '../../util/styles';
import React, {FlatList, StatusBar} from 'react-native';
import {Colors} from '../../util/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {EmptyState} from '../../components/molecules/EmptyState';
import NotAMember from '../../assets/icons/not-a-member.svg';
import {Button} from '../../components/atoms/Button';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../../navigation/screens';
import PlusIcon from '../../assets/icons/plus.svg';
import {OrderResponse} from '../../api/responses';
import {useRental} from '../../context/Rental.hooks';
import {OrderItem} from '../../components/molecules/OrderItem';

type Props = NativeStackScreenProps<HomeStackParamList, 'Orders'>;

export const OrdersScreen = ({navigation}: Props) => {
  const {orders} = useRental();

  return (
    <SafeAreaView style={CommonStyles.cutoutContainer}>
      <StatusBar backgroundColor={Colors.Dark1} />
      <FlatList<OrderResponse>
        style={CommonStyles.cutoutStyle}
        contentContainerStyle={{gap: 16, display: 'flex', height: '100%'}}
        data={orders}
        ListEmptyComponent={() => (
          <EmptyState
            icon={<NotAMember width={100} height={100} />}
            title={'Brak zleceń'}
            description={'Dodaj zlecenie aby to zmienić!'}>
            <Button
              title={'Dodaj zlecenie'}
              greedy={false}
              onPress={() => {
                navigation.navigate('CreateOrder');
              }}
              icon={<PlusIcon color={Colors.Text} />}
            />
          </EmptyState>
        )}
        ListFooterComponent={
          orders.length === 0
            ? undefined
            : () => (
                <Button
                  title={'Dodaj zlecenie'}
                  greedy={false}
                  onPress={() => {
                    navigation.navigate('CreateOrder');
                  }}
                  icon={<PlusIcon color={Colors.Text} />}
                />
              )
        }
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <OrderItem
            order={item}
            onLongPress={() => {
              navigation.navigate('EditOrder', {orderId: item.id});
            }}
          />
        )}
      />
    </SafeAreaView>
  );
};
