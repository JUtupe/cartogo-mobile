import {Control, useController} from 'react-hook-form';
import {Input, InputProps} from './Input';
import React from 'react';

export type ControlledInputProps = {
  name: string;
  control: Control<any>;
} & Omit<InputProps, 'onChangeText' | 'value'>;

export const ControlledInput = ({
  name,
  control,
  ...rest
}: ControlledInputProps) => {
  const {field} = useController({control, defaultValue: '', name});

  return <Input {...rest} value={field.value} onChangeText={field.onChange} />;
};
