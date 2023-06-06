import React from 'react';
import {StyleProp, StyleSheet, TextInput, View, ViewStyle} from 'react-native';
import {TextView} from './TextView';
import {Colors} from '../../util/colors';
import {TextStyles} from '../../util/styles';
import DropShadow from 'react-native-drop-shadow';

export interface InputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  style?: StyleProp<ViewStyle>;
}

export const Input = ({label, value, onChangeText, style}: InputProps) => {
  return (
    <View style={[styles.container, style]}>
      {label && <TextView variant={'bodyM'}>{label}</TextView>}
      <DropShadow
        style={{
          shadowColor: Colors.Dark1,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 1,
          shadowRadius: 0,
        }}>
        <TextInput
          style={[TextStyles.bodyL, styles.input]}
          value={value}
          onChangeText={onChangeText}
        />
      </DropShadow>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignSelf: 'stretch',
  },
  input: {
    flexDirection: 'row',
    height: 40,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: Colors.White,
    borderColor: Colors.Dark0,
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 1,
  },
});
