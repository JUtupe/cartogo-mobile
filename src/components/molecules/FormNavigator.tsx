import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {TextView} from '../atoms/TextView';
import {Colors} from '../../util/colors';
import React from 'react';

export interface FormSectionProps {
  left: string;
  confirmEnabled?: boolean;
  confirmText: string;
  onConfirm?: () => void;
}

export const FormNavigator: React.FC<FormSectionProps> = ({
  left,
  confirmEnabled,
  confirmText,
  onConfirm,
}) => {
  return (
    <View style={styles.navigatorContainer}>
      <View style={styles.navigator}>
        <TextView style={{color: Colors.White}}>{left}</TextView>
        <TouchableOpacity onPress={onConfirm} disabled={!confirmEnabled}>
          <TextView
            style={{color: confirmEnabled ? Colors.White : Colors.Gray}}>
            {confirmText}
          </TextView>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navigatorContainer: {
    width: '100%',
    backgroundColor: Colors.Light0,
  },
  navigator: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    margin: 8,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.Dark1,
  },
});
