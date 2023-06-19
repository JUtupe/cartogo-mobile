import React from 'react';
import {
  KeyboardType,
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {TextView} from './TextView';
import {Colors} from '../../util/colors';
import {TextStyles} from '../../util/styles';
import DropShadow from 'react-native-drop-shadow';

export interface InputProps {
  label?: string;
  placeholder?: string;
  error?: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  greedy?: boolean;
  keyboardType?: KeyboardType;
}

export const Input = ({
  label,
  placeholder,
  error,
  value,
  onChangeText,
  onBlur,
  style,
  labelStyle,
  greedy = true,
  keyboardType,
}: InputProps) => {
  return (
    <View
      style={[
        styles.container,
        greedy && {alignSelf: 'stretch', flex: 1},
        style,
      ]}>
      {label && (
        <TextView
          variant={'bodyM'}
          numberOfLines={1}
          ellipsizeMode={'tail'}
          style={labelStyle}>
          {label}
        </TextView>
      )}
      <DropShadow style={styles.shadow}>
        <TextInput
          style={[TextStyles.bodyL, styles.input]}
          value={value}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          onBlur={onBlur}
          placeholder={placeholder}
          placeholderTextColor={Colors.Gray}
        />
      </DropShadow>
      {error && (
        <TextView variant={'bodyS'} style={styles.error}>
          {error}
        </TextView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  shadow: {
    shadowColor: Colors.Dark1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  error: {
    color: Colors.Error0,
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
