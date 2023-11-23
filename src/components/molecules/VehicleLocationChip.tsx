import {VehicleResponse} from '../../api/responses';
import {StyleProp, View, ViewStyle} from 'react-native';
import {TextView} from '../atoms/TextView';
import React from 'react';
import {Colors} from '../../util/colors';

export interface VehicleLocationChipProps {
  location: VehicleResponse['state']['location'];
  style?: StyleProp<ViewStyle>;
}

export const VehicleLocationChip: React.FC<VehicleLocationChipProps> = ({
  location,
  style,
}) => {
  const color = () => {
    switch (location) {
      case 'RENTAL':
        return Colors.Primary1;
      case 'CUSTOMER':
      case 'IN_DELIVERY':
      case 'IN_RECEPTION':
        return Colors.Info;
      case 'SERVICE':
        return Colors.Error0;
    }
  };
  const textColor = () => {
    switch (location) {
      case 'RENTAL':
        return Colors.Text;
      case 'CUSTOMER':
      case 'IN_DELIVERY':
      case 'IN_RECEPTION':
        return Colors.White;
      case 'SERVICE':
        return Colors.White;
    }
  };

  const text = () => {
    switch (location) {
      case 'RENTAL':
        return 'na stanie';
      case 'CUSTOMER':
        return 'u klienta';
      case 'IN_DELIVERY':
        return 'w dostawie';
      case 'IN_RECEPTION':
        return 'w odbiorze';
      case 'SERVICE':
        return 'serwis';
    }
  };

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          gap: 4,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: color(),
          height: 22,
          paddingHorizontal: 8,
          borderRadius: 11,
        },
        style,
      ]}>
      <TextView variant={'bodyS'} style={{color: textColor()}}>
        {text()}
      </TextView>
    </View>
  );
};
