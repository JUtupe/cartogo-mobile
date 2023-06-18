import React from 'react';
import {TouchableOpacity} from 'react-native';
import {TextView} from './TextView';
import {RadioButton as PaperRadioButton} from 'react-native-paper';
import {Colors} from '../../util/colors';

export interface RadioButtonProps {
  title: string;
  value: string;
  selected: boolean;
  onPress: (value: string) => void;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  title,
  value,
  selected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={() => onPress(value)}>
      <PaperRadioButton
        value={value}
        status={selected ? 'checked' : 'unchecked'}
        onPress={() => onPress(value)}
        color={Colors.Primary0}
        uncheckedColor={Colors.Primary0}
      />

      <TextView variant={'bodyM'}>{title}</TextView>
    </TouchableOpacity>
  );
};
