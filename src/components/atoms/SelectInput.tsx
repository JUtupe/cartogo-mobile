import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Input, InputProps} from './Input';
import React, {useState} from 'react';
import dayjs from 'dayjs';
import {Dialog} from '../molecules/Dialog';
import {TextView} from './TextView';
import {Colors} from '../../util/colors';
import {CommonStyles} from '../../util/styles';
import DropShadow from 'react-native-drop-shadow';

export type SelectItem = {
  id: string;
  label: string;
};

export type SelectInputProps = Omit<InputProps, 'onChangeText' | 'value'> & {
  value: SelectItem | undefined;
  setItem: (date: SelectItem) => void;
  items: SelectItem[];
  pickerLabel?: string;
  emptyLabel?: string;
};

export const SelectInput: React.FC<SelectInputProps> = props => {
  const [open, setOpen] = useState(false);

  const onInputTouched = () => {
    setOpen(true);
  };

  return (
    <>
      <TouchableWithoutFeedback
        style={{flex: 1, width: '100%'}}
        onPress={e => {
          onInputTouched();
        }}>
        <View style={{flex: 1, width: '100%'}}>
          <View pointerEvents={'none'} style={{flex: 1}}>
            <Input
              {...props}
              value={props.value?.label ?? ''}
              onChangeText={() => {}}
              onBlur={props.onBlur}
              error={props.error}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>

      {open && (
        <Dialog isOpen={open} onDismiss={() => setOpen(false)}>
          {props.pickerLabel !== undefined && (
            <TextView
              variant={'headingS'}
              bold
              style={{
                color: Colors.White,
                textAlign: 'center',
                marginBottom: 8,
              }}>
              {props.pickerLabel}
            </TextView>
          )}
          <ScrollView>
            {props.items.map(item => (
              <DropShadow style={CommonStyles.cardShadow} key={item.id}>
                <TouchableOpacity
                  style={[styles.selectItem, CommonStyles.cardShadow]}
                  onPress={() => {
                    setOpen(false);
                    props.setItem(item);
                  }}>
                  <TextView>{item.label}</TextView>
                </TouchableOpacity>
              </DropShadow>
            ))}

            {props.items.length === 0 && (
              <TextView
                variant={'bodyM'}
                style={{textAlign: 'center', color: Colors.White}}>
                {props.emptyLabel ?? 'Brak elementów'}
              </TextView>
            )}
          </ScrollView>
        </Dialog>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  selectItem: {
    backgroundColor: Colors.Light0,
    padding: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.Primary0,
  },
});
