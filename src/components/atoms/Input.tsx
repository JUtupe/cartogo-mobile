import React from 'react';
import {StyleProp, StyleSheet, TextInput, View, ViewStyle} from 'react-native';
import {TextView} from './TextView';
import {Colors} from '../../util/colors';
import {TextStyles} from '../../util/styles';
import DropShadow from 'react-native-drop-shadow';

export interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  style?: StyleProp<ViewStyle>;
  greedy?: boolean;
}

export const Input = ({
  label,
  placeholder,
  value,
  onChangeText,
  style,
  greedy = true,
}: InputProps) => {
  return (
    <View style={[styles.container, greedy && {alignSelf: 'stretch'}, style]}>
      {label && (
        <TextView
          variant={'bodyM'}
          style={styles.label}
          numberOfLines={1}
          ellipsizeMode={'tail'}>
          {label}
        </TextView>
      )}
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
          placeholder={placeholder}
          placeholderTextColor={Colors.Gray}
        />
      </DropShadow>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexShrink: 0,
    flexGrow: 1,
  },
  label: {},
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
