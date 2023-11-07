import {VehicleResponse} from '../../api/responses';
import {StyleProp, View, ViewStyle} from 'react-native';
import {TextView} from '../atoms/TextView';
import React from 'react';
import DirtyIcon from '../../assets/icons/warning.svg';
import SlightlyDirtyIcon from '../../assets/icons/dirty.svg';
import CleanIcon from '../../assets/icons/stars.svg';
import {Colors} from '../../util/colors';

export interface ConditionChipProps {
  condition: VehicleResponse['state']['condition'];
  style?: StyleProp<ViewStyle>;
}

export const ConditionChip: React.FC<ConditionChipProps> = ({
  condition,
  style,
}) => {
  const icon = () => {
    switch (condition) {
      case 'CLEAN':
        return <CleanIcon color={Colors.Text} width={14} height={14} />;
      case 'SLIGHTLY_DIRTY':
        return (
          <SlightlyDirtyIcon color={Colors.White} width={14} height={14} />
        );
      case 'DIRTY':
        return <DirtyIcon color={Colors.White} width={14} height={14} />;
    }
  };

  const color = () => {
    switch (condition) {
      case 'CLEAN':
        return Colors.Primary1;
      case 'SLIGHTLY_DIRTY':
        return Colors.Info;
      case 'DIRTY':
        return Colors.Error0;
    }
  };
  const textColor = () => {
    switch (condition) {
      case 'CLEAN':
        return Colors.Text;
      case 'SLIGHTLY_DIRTY':
        return Colors.White;
      case 'DIRTY':
        return Colors.White;
    }
  };

  const text = () => {
    switch (condition) {
      case 'CLEAN':
        return 'Czysty';
      case 'SLIGHTLY_DIRTY':
        return 'Lekko zabrudzony';
      case 'DIRTY':
        return 'Brudny';
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

      {icon()}
    </View>
  );
};
