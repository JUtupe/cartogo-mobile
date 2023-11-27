import {SafeAreaView} from 'react-native-safe-area-context';
import {CommonStyles} from '../../../util/styles';
import {ScrollView, StatusBar} from 'react-native';
import {Colors} from '../../../util/colors';
import React, {useState} from 'react';
import {FormSection} from '../../../components/molecules/FormSection';
import {useDelivery} from '../../../context/Delivery.hooks';
import {FormNavigator} from '../../../components/molecules/FormNavigator';
import {DeliveryStackParamList} from '../../../navigation/screens';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SignatureDialog} from '../../../components/organisms/SignatureDialog';
import Toast from 'react-native-toast-message';

type Props = NativeStackScreenProps<DeliveryStackParamList, 'DeliveryHub'>;

export const DeliveryScreen = ({navigation}: Props) => {
  const {hasDeliveryForm, hasCustomerSignature, setCustomerSignature, deliver} =
    useDelivery();
  const [isSignatureDialogOpen, setIsSignatureDialogOpen] = useState(false);

  const onDeliverPress = () => {
    deliver()
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Zlecenie zostało wydane',
        });

        navigation.navigate('Orders');
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'Nie udało się wydać zlecenia',
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
            state={hasDeliveryForm ? 'done' : 'todo'}
            title={'Protokół wydania'}
            onPress={() => navigation.navigate('DeliveryForm')}
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
          confirmEnabled={hasDeliveryForm && hasCustomerSignature}
          confirmText={'Wydaj'}
          onConfirm={onDeliverPress}
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
