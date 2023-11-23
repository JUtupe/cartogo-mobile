import React from 'react';
import {OrderResponse} from '../../api/responses';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../util/colors';
import {CommonStyles} from '../../util/styles';
import DropShadow from 'react-native-drop-shadow';
import {TextView} from '../atoms/TextView';
import dayjs from 'dayjs';
import {VehicleLocationChip} from './VehicleLocationChip';
import {Button} from '../atoms/Button';
import CallIcon from '../../assets/icons/call.svg';
import {callAction} from '../../util/actions';

export interface OrderItemProps {
  order: OrderResponse;
  onLongPress?: () => void;
}

export const OrderItem: React.FC<OrderItemProps> = ({order, onLongPress}) => {
  return (
    <TouchableOpacity onLongPress={onLongPress}>
      <DropShadow style={CommonStyles.cardShadow}>
        <View style={styles.order}>
          <View style={styles.row}>
            <TextView
              style={[styles.badge, {flexShrink: 1}]}
              ellipsizeMode={'tail'}
              numberOfLines={1}>
              {order.customer.firstName} {order.customer.lastName}
              asdasdasd
            </TextView>
            <TextView style={styles.badge} bold>
              {order.number}
            </TextView>
          </View>

          <View style={styles.row}>
            <TextView>
              Wydanie {dayjs(order.deliveryDate).format('DD.MM.YYYY')}
            </TextView>

            <VehicleLocationChip
              location={order.vehicle.state.location ?? 'SERVICE'}
            />
          </View>

          <View style={styles.buttons}>
            <Button
              style={{flex: 1}}
              title={'Zadzwoń'}
              onPress={() => {
                callAction(order.customer.phoneNumber);
              }}
              primary
              icon={<CallIcon color={Colors.Text} />}
            />
            {/*<Button*/}
            {/*  style={{flex: 1}}*/}
            {/*  title={'Wydaj'}*/}
            {/*  onPress={() => {}}*/}
            {/*  icon={<NavigateIcon color={Colors.Text} />}*/}
            {/*/>*/}
          </View>
        </View>
      </DropShadow>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  order: {
    gap: 8,
    flexDirection: 'column',
    backgroundColor: Colors.Light0,
    padding: 4,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.Dark0,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 4,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 4,
    borderRadius: 8,
    backgroundColor: Colors.Light1,
  },
});
