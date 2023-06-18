import {Slider as LibrarySlider} from '@miblanchard/react-native-slider';
import {View} from 'react-native';
import {TextView} from './TextView';
import React from 'react';
import {Colors} from '../../util/colors';

export interface SliderProps {
  label: string;
  min?: number;
  max?: number;
  value: number;
  onValueChange: (value: number) => void;
}

export const Slider: React.FC<SliderProps> = ({
  min = 0,
  max = 100,
  label,
  value,
  onValueChange,
}) => {
  return (
    <View style={{width: '100%'}}>
      <TextView variant={'bodyM'}>{label}</TextView>
      <LibrarySlider
        thumbTintColor={Colors.Primary0}
        minimumValue={min}
        maximumValue={max}
        step={1}
        minimumTrackTintColor={Colors.Primary1}
        maximumTrackTintColor={Colors.Primary2}
        value={value}
        onValueChange={value => onValueChange(value[0])}
      />
    </View>
  );
};
