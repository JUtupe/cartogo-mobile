import {SafeAreaView} from 'react-native-safe-area-context';
import {CommonStyles} from '../../../util/styles';
import {ScrollView, StatusBar} from 'react-native';
import {Colors} from '../../../util/colors';
import React, {useState} from 'react';
import {FormSection} from '../../../components/molecules/FormSection';
import {FormNavigator} from '../../../components/molecules/FormNavigator';
import {ReceptionStackParamList} from '../../../navigation/screens';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SignatureDialog} from '../../../components/organisms/SignatureDialog';
import Toast from 'react-native-toast-message';
import {useReception} from '../../../context/Reception.hooks';

type Props = NativeStackScreenProps<ReceptionStackParamList, 'ReceptionHub'>;

export const ReceptionScreen = ({navigation}: Props) => {
  const {
    hasReceptionForm,
    hasCustomerSignature,
    setCustomerSignature,
    receive,
  } = useReception();
  const [isSignatureDialogOpen, setIsSignatureDialogOpen] = useState(false);

  const onReceivePress = () => {
    receive()
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Zlecenie zostało odebrane',
        });

        navigation.navigate('Orders');
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'Nie udało się odebrać zlecenia',
          text2: 'Sprawdź poprawność formularza lub spróbuj ponownie później.',
        });
      });
  };

  return (
    <>
      <SafeAreaView style={CommonStyles.cutoutContainer}>
        <StatusBar backgroundColor={Colors.Dark1} />
        <ScrollView
          overScrollMode={'never'}
          style={CommonStyles.cutoutStyle}
          contentContainerStyle={CommonStyles.cutoutContentContainer}>
          <FormSection
            state={hasReceptionForm ? 'done' : 'todo'}
            title={'Protokół odbioru'}
            onPress={() => navigation.navigate('ReceptionForm')}
          />
          <FormSection
            state={hasCustomerSignature ? 'done' : 'todo'}
            title={'Podpis klienta'}
            onPress={() => {
              setIsSignatureDialogOpen(true);
            }}
          />
        </ScrollView>

        <FormNavigator
          left={''}
          confirmEnabled={hasReceptionForm && hasCustomerSignature}
          confirmText={'Odbierz'}
          onConfirm={onReceivePress}
        />
      </SafeAreaView>

      {isSignatureDialogOpen && (
        <SignatureDialog
          onDismiss={() => {
            setIsSignatureDialogOpen(false);
          }}
          onSignatureSaved={signature => {
            setCustomerSignature(signature.pathName);

            setIsSignatureDialogOpen(false);
          }}
        />
      )}
    </>
  );
};
