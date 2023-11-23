import {StyleSheet, View} from 'react-native';
import React from 'react';
import {TextView} from '../atoms/TextView';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  children?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  children,
}) => {
  return (
    <View style={styles.container}>
      {icon}

      <View style={styles.texts}>
        <TextView variant={'headingL'} bold>
          {title}
        </TextView>

        <TextView>{description}</TextView>
      </View>

      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    marginTop: 32,
  },
  texts: {
    alignItems: 'center',
    gap: 8,
  },
});
