import {Control, useController} from 'react-hook-form';
import {Input, InputProps} from './Input';
import React from 'react';
import {RegisterOptions} from 'react-hook-form/dist/types/validator';

export type ControlledInputProps = {
  name: string;
  control: Control<any>;
  rules?: Omit<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
} & Omit<InputProps, 'onChangeText' | 'value'>;

export const ControlledInput = ({
  name,
  control,
  rules,
  ...rest
}: ControlledInputProps) => {
  const {field, fieldState} = useController({control, name, rules});

  return (
    <Input
      {...rest}
      value={field.value}
      onChangeText={field.onChange}
      onBlur={field.onBlur}
      error={fieldState.error?.message}
    />
  );
};
