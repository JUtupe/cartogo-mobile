import React from 'react';
import {Dialog} from './Dialog';
import {TextView} from '../atoms/TextView';
import {StyleSheet, View} from 'react-native';
import {Button} from '../atoms/Button';
import {Colors} from '../../util/colors';

interface ConfirmDialogProps {
  isOpen: boolean;
  onDismiss: () => void;
  onConfirm: () => void;
  confirmText?: string;
  title: string;
  description?: string;
  content?: React.ReactNode;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onDismiss,
  onConfirm,
  confirmText = 'Potwierdź',
  title,
  description,
  content,
}) => {
  return (
    <Dialog isOpen={isOpen} onDismiss={onDismiss}>
      <TextView variant={'headingS'} bold style={styles.text}>
        {title}
      </TextView>

      {description !== undefined && (
        <TextView style={styles.text}>{description}</TextView>
      )}
      {content !== undefined && content}

      <View style={styles.buttons}>
        <Button onPress={onDismiss} title={'Anuluj'} style={{flex: 1}} />
        <Button
          onPress={onConfirm}
          title={confirmText}
          style={{flex: 1}}
          primary
          variant={'error'}
        />
      </View>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  text: {
    color: Colors.White,
  },
  buttons: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 16,
  },
});

export interface ImperativeConfirmDialogRef {
  open: () => void;
}

export const ImperativeConfirmDialog = React.forwardRef<
  ImperativeConfirmDialogRef,
  Omit<ConfirmDialogProps, 'isOpen' | 'onDismiss'>
>((props, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useImperativeHandle(
    ref,
    () => ({
      open: () => setIsOpen(true),
    }),
    [],
  );

  return (
    <ConfirmDialog
      {...props}
      isOpen={isOpen}
      onDismiss={() => setIsOpen(false)}
    />
  );
});
