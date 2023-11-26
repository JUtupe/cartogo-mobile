import React from 'react';
import {OrderResponse} from '../../api/responses';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../util/colors';
import {CommonStyles} from '../../util/styles';
import DropShadow from 'react-native-drop-shadow';
import {TextView} from '../atoms/TextView';
import dayjs from 'dayjs';
import {Button} from '../atoms/Button';
import CallIcon from '../../assets/icons/call.svg';
import MailIcon from '../../assets/icons/mail.svg';
import {callAction, emailAction} from '../../util/actions';
import {useRental} from '../../context/Rental.hooks';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from '../../navigation/screens';

export interface OrderItemProps {
  order: OrderResponse;
  onLongPress?: () => void;
  hideActions?: boolean;
}

export const OrderItem: React.FC<OrderItemProps> = ({
  order,
  hideActions = false,
  onLongPress,
}) => {
  const {rental} = useRental();
  const {navigate} = useNavigation<StackNavigation>();
  const canBeDelivered = !order.delivery && !order.isDone;
  const canBeReceived = !!order.delivery && !order.isDone;

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

            <View style={styles.chip}>
              <TextView>
                {canBeDelivered
                  ? 'W wydaniu'
                  : canBeReceived
                  ? 'W odbiorze'
                  : 'Zakończone'}
              </TextView>
            </View>
          </View>

          {!hideActions && (
            <View style={styles.buttons}>
              {canBeDelivered && (
                <Button
                  style={{flex: 1}}
                  title={'Wydaj'}
                  onPress={() => {
                    navigate('Delivery', {
                      orderId: order.id,
                    });
                  }}
                  primary
                />
              )}
              {canBeReceived && (
                <Button
                  style={{flex: 1}}
                  title={'Odbierz'}
                  onPress={() => {
                    navigate('ReceptionForm', {
                      orderId: order.id,
                    });
                  }}
                  primary
                />
              )}
              <Button
                style={{flex: 1}}
                title={'Zadzwoń'}
                onPress={() => {
                  callAction(order.customer.phoneNumber);
                }}
                primary
                icon={<CallIcon color={Colors.Text} />}
              />
              <Button
                style={{flex: 1}}
                title={'Mail'}
                onPress={() => {
                  emailAction(
                    order.customer.email,
                    `${rental?.name} - Zlecenie ${order.number}`,
                  );
                }}
                icon={<MailIcon color={Colors.Text} />}
              />
            </View>
          )}
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
  chip: {
    flexDirection: 'row',
    gap: 4,
    backgroundColor: Colors.Info,
    justifyContent: 'center',
    alignItems: 'center',
    height: 22,
    paddingHorizontal: 8,
    borderRadius: 11,
  },
});
