import {Control, useController} from 'react-hook-form';
import React from 'react';
import {RadioButton, RadioButtonProps} from './RadioButton';

export type ControlledRadioButtonProps = {
  name: string;
  control: Control<any>;
} & Omit<RadioButtonProps, 'onPress' | 'selected'>;

export const ControlledRadioButton = ({
  name,
  control,
  ...rest
}: ControlledRadioButtonProps) => {
  const {field} = useController({control, name});

  return (
    <RadioButton
      {...rest}
      selected={field.value === rest.value}
      value={field.value}
      onPress={() => field.onChange(rest.value)}
    />
  );
};
