import React from 'react';
import DropShadow from 'react-native-drop-shadow';
import {VehicleResponse} from '../../api/responses';
import {Colors} from '../../util/colors';
import {TextView} from '../atoms/TextView';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {CommonStyles} from '../../util/styles';
import {Button} from '../atoms/Button';
import MapIcon from '../../assets/icons/map.svg';
import {ConditionChip} from './ConditionChip';

interface VehicleItemProps {
  vehicle: VehicleResponse;
  onLongPress?: () => void;
}

export const VehicleItem: React.FC<VehicleItemProps> = ({
  vehicle,
  onLongPress,
}: VehicleItemProps) => {
  return (
    <TouchableOpacity onLongPress={onLongPress}>
      <DropShadow style={CommonStyles.cardShadow}>
        <View style={styles.vehicle}>
          <View style={{flexDirection: 'row', gap: 8}}>
            {vehicle.image !== null && (
              <Image source={{uri: vehicle.image}} style={styles.image} />
            )}

            <View style={{flex: 1, gap: 8}}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  gap: 8,
                }}>
                <TextView variant={'bodyL'}>{vehicle.name}</TextView>
                <TextView variant={'bodyL'} bold>
                  {vehicle.registrationNumber}
                </TextView>
              </View>
              <View style={{flex: 1, flexDirection: 'row-reverse'}}>
                <ConditionChip condition={vehicle.state.condition} />
              </View>
            </View>
          </View>

          <View
            style={{
              display: 'flex',
              gap: 8,
              flexDirection: 'row',
            }}>
            <Button
              title={'Wydaj'}
              onPress={() => {}}
              style={{flex: 1}}
              primary
            />
            <Button
              title={'Śledź'}
              onPress={() => {}}
              style={{flex: 1}}
              icon={<MapIcon color={Colors.Text} />}
            />
          </View>
        </View>
      </DropShadow>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  vehicle: {
    gap: 8,
    flexDirection: 'column',
    backgroundColor: Colors.Light0,
    padding: 4,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.Dark0,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 8,
  },
});
