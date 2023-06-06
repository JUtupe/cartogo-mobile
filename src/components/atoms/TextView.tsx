import React from 'react';
import {StyleProp, Text, TextStyle} from 'react-native';
import {TextStyles} from '../../util/styles';

export interface TextProps {
  children: React.ReactNode;
  variant?: 'bodyS' | 'bodyM' | 'bodyL' | 'headingS' | 'headingM' | 'headingL';
  bold?: boolean;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
}

export const TextView: React.FC<TextProps> = ({
  children,
  variant = 'bodyM',
  bold = false,
  style,
  onPress,
  numberOfLines,
  ellipsizeMode,
}) => {
  return (
    <Text
      style={[TextStyles[variant], bold && {fontWeight: 'bold'}, style]}
      onPress={onPress}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}>
      {children}
    </Text>
  );
};
