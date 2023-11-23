import {TouchableWithoutFeedback, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Input, InputProps} from './Input';
import React, {useState} from 'react';
import dayjs from 'dayjs';

export type DateInputProps = Omit<InputProps, 'onChangeText' | 'value'> & {
  value: Date | undefined;
  setDate: (date: Date) => void;
};

export const DateInput: React.FC<DateInputProps> = props => {
  const [open, setOpen] = useState(false);

  const onInputTouched = () => {
    setOpen(true);
  };

  return (
    <>
      <TouchableWithoutFeedback
        style={{flex: 1}}
        onPress={e => {
          onInputTouched();
        }}>
        <View style={{flex: 1}}>
          <View pointerEvents={'none'} style={{flex: 1}}>
            <Input
              {...props}
              value={dayjs(props.value).format('DD.MM.YYYY')}
              onChangeText={() => {}}
              onBlur={props.onBlur}
              error={props.error}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>

      {open && (
        <DatePicker
          modal
          open={open}
          mode={'date'}
          date={props.value ?? new Date()}
          locale={'pl'}
          confirmText={'Zatwierdź'}
          cancelText={'Anuluj'}
          onConfirm={date => {
            setOpen(false);

            props.setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      )}
    </>
  );
};
