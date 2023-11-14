import React from 'react';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import {Colors} from '../../util/colors';
import {Portal} from '@gorhom/portal';

type DialogProps = {
  isOpen: boolean;
  onDismiss?: () => void;
  children: React.ReactNode;
  contentStyle?: ViewStyle;
};

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onDismiss,
  children,
  contentStyle,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <TouchableOpacity
        style={styles.backdrop}
        onPress={onDismiss}
        activeOpacity={1}>
        <TouchableOpacity
          style={[styles.content, contentStyle]}
          onPress={e => e.preventDefault()}
          activeOpacity={1}>
          {children}
        </TouchableOpacity>
      </TouchableOpacity>
    </Portal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    padding: 32,
    backgroundColor: 'rgba(0,0,0,0.65)',
  },
  content: {
    display: 'flex',
    gap: 8,
    alignItems: 'stretch',
    width: '100%',
    backgroundColor: Colors.Dark1,
    borderRadius: 8,
    padding: 24,
    margin: 32,
  },
});
