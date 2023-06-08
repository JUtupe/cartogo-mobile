import React from 'react';
import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import {TextView} from './TextView';
import {Colors} from '../../util/colors';
import DropShadow from 'react-native-drop-shadow';

export interface ButtonProps {
  primary?: boolean;
  variant?: 'success' | 'error';
  title: string;
  greedy?: boolean;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Button: React.FC<ButtonProps> = ({
  primary = false,
  variant = 'success',
  title,
  greedy = true,
  onPress,
  disabled,
  style,
}) => {
  const color = variant === 'success' ? Colors.Primary0 : Colors.Error0;
  const shadowColor = variant === 'success' ? Colors.Primary1 : Colors.Error1;
  const textColor = variant === 'error' && primary ? Colors.White : Colors.Text;

  return (
    <DropShadow
      style={[
        greedy ? {flexGrow: 1} : {},
        {
          shadowColor: shadowColor,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 1,
          shadowRadius: 0,
        },
      ]}>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: primary ? color : Colors.Light0,
            borderColor: color,
          },
          style,
        ]}
        onPress={onPress}
        disabled={disabled}>
        <TextView
          variant={'bodyL'}
          bold
          style={{
            color: textColor,
          }}>
          {title}
        </TextView>
      </TouchableOpacity>
    </DropShadow>
  );
};

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderStyle: 'solid',
    marginBottom: 2,
  },
});
