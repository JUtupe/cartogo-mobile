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
  mapValue?: (value: any) => any;
} & Omit<InputProps, 'onChangeText' | 'value'>;

export const ControlledInput = ({
  name,
  control,
  rules,
  mapValue,
  ...rest
}: ControlledInputProps) => {
  const {field, fieldState} = useController({control, name, rules});

  return (
    <Input
      {...rest}
      value={mapValue ? mapValue(field.value) : field.value}
      onChangeText={field.onChange}
      onBlur={field.onBlur}
      error={fieldState.error?.message}
    />
  );
};
