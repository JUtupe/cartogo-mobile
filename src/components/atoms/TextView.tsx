import React from 'react';
import {StyleProp, Text, TextStyle} from 'react-native';
import {TextStyles} from '../../util/styles';

interface TextProps {
  children: React.ReactNode;
  variant?: 'bodyS' | 'bodyM' | 'bodyL' | 'headingS' | 'headingM' | 'headingL';
  bold?: boolean;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
}

export const TextView: React.FC<TextProps> = ({
  children,
  variant = 'bodyM',
  bold = false,
  style,
  onPress,
}) => {
  return (
    <Text
      style={[TextStyles[variant], bold && {fontWeight: 'bold'}, style]}
      onPress={onPress}>
      {children}
    </Text>
  );
};
