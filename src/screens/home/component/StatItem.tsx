import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TextView} from '../../../components/atoms/TextView';
import {Colors} from '../../../util/colors';

export const StatItem: React.FC<{title: string; value: string}> = ({
  title,
  value,
}) => {
  return (
    <View style={styles.statItem}>
      <TextView variant={'bodyL'}>{title}</TextView>
      <TextView variant={'headingL'} bold>
        {value}
      </TextView>
    </View>
  );
};

const styles = StyleSheet.create({
  statItem: {
    flexGrow: 1,
    flexBasis: 0,
    display: 'flex',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,

    backgroundColor: Colors.Primary2,
    borderRadius: 8,
  },
});
