import {Control, useController} from 'react-hook-form';
import React from 'react';
import {Slider, SliderProps} from './Slider';

export type ControlledSliderProps = {
  name: string;
  control: Control<any>;
} & Omit<SliderProps, 'onValueChange' | 'value'>;

export const ControlledSlider = ({
  name,
  control,
  ...rest
}: ControlledSliderProps) => {
  const {field} = useController({control, name});

  return (
    <Slider {...rest} value={field.value} onValueChange={field.onChange} />
  );
};
