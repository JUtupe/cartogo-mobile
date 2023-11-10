import {StyleSheet, View} from 'react-native';
import {Button} from '../atoms/Button';
import React, {useRef, useState} from 'react';
import {Colors} from '../../util/colors';
import {Portal} from '@gorhom/portal';
import SignatureCapture from 'react-native-signature-capture';
import {
  ImperativeConfirmDialog,
  ImperativeConfirmDialogRef,
} from '../molecules/ConfirmDialog';
import {TextView} from '../atoms/TextView';

interface SignatureDialogProps {
  onDismiss: () => void;
  onSignatureSaved: (result: {pathName: string}) => void;
}

export const SignatureDialog: React.FC<SignatureDialogProps> = ({
  onDismiss,
  onSignatureSaved,
}) => {
  const signatureRef = useRef<SignatureCapture>(null);
  const confirmDialogRef = useRef<ImperativeConfirmDialogRef>(null);
  const [viewMode, setViewMode] = useState<'portrait' | 'landscape'>(
    'landscape',
  );

  const onBackPress = () => {
    // promise to wait for animation to finish
    Promise.resolve()
      .then(() => {
        setViewMode('portrait');
      })
      .then(new Promise(resolve => setTimeout(resolve, 500)))
      .then(() => {
        onDismiss();
      });
  };

  const onClearPress = () => {
    signatureRef?.current?.resetImage();
  };

  const onDonePress = () => {
    // setViewMode('portrait');
    signatureRef?.current?.saveImage();
  };

  const onImageSaved = (result: {pathName: string}) => {
    console.log(result);
    // onSignatureSaved(result);

    confirmDialogRef.current?.open();
  };

  return (
    <Portal>
      <View style={styles.container}>
        <View style={styles.touchpadContainer}>
          <SignatureCapture
            ref={signatureRef}
            style={styles.touchpad}
            backgroundColor={Colors.Transparent}
            viewMode={viewMode}
            showNativeButtons={false}
            onSaveEvent={onImageSaved}
          />
        </View>

        <View style={styles.buttons}>
          <Button title={'Powrót'} variant={'error'} onPress={onBackPress} />
          <Button title={'Wyczyść'} onPress={onClearPress} />
          <Button title={'Gotowe'} primary onPress={onDonePress} />
        </View>
      </View>

      <ImperativeConfirmDialog
        ref={confirmDialogRef}
        onConfirm={() => {}}
        title={'Czy podpis się zgadza?'}
        content={<TextView variant={'bodyM'}>Test</TextView>} //todo replace with signature image
      />
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    gap: 16,
    padding: 16,
    backgroundColor: Colors.Dark0,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  touchpadContainer: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: Colors.Light0,
    borderColor: Colors.Dark1,
    borderWidth: 1,
  },
  touchpad: {
    flex: 1,
  },
  button: {
    flex: 1,
  },
  buttons: {
    gap: 16,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
});
