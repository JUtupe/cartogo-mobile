import React from 'react';
import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import {TextView} from './TextView';
import {Colors} from '../../util/colors';
import DropShadow from 'react-native-drop-shadow';

export interface ButtonProps {
  primary?: boolean;
  variant?: 'success' | 'error';
  title: string;
  icon?: React.ReactNode;
  greedy?: boolean;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Button: React.FC<ButtonProps> = ({
  primary = false,
  variant = 'success',
  title,
  icon,
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
        greedy && {alignSelf: 'stretch'},
        {
          shadowColor: shadowColor,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 1,
          shadowRadius: 0,
        },
        style,
      ]}>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: primary ? color : Colors.Light0,
            borderColor: color,
          },
        ]}
        onPress={onPress}
        disabled={disabled}>
        {title && (
          <TextView
            variant={'bodyL'}
            bold
            style={{
              color: textColor,
            }}>
            {title}
          </TextView>
        )}

        {icon}
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
    padding: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderStyle: 'solid',
    marginBottom: 2,
  },
});
