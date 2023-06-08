import {BaseToast, ErrorToast, ToastConfig} from 'react-native-toast-message';
import React from 'react';
import {TextStyles} from './styles';
import {Colors} from './colors';
import WarningIcon from '../assets/icons/warning.svg';
import StarsIcon from '../assets/icons/stars.svg';

export const toastConfig: ToastConfig = {
  success: props => (
    <BaseToast
      {...props}
      contentContainerStyle={{
        backgroundColor: Colors.Primary0,
        paddingHorizontal: 8,
      }}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.Primary0,
        borderLeftWidth: 0,
        padding: 8,
        height: undefined,
      }}
      text1Style={[TextStyles.bodyM, {fontWeight: 'bold'}]}
      text2Style={TextStyles.bodyM}
      renderLeadingIcon={() => <StarsIcon color={Colors.Text} />}
    />
  ),
  error: props => (
    <ErrorToast
      {...props}
      contentContainerStyle={{
        backgroundColor: Colors.Error0,
        paddingHorizontal: 8,
      }}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.Error0,
        borderLeftWidth: 0,
        padding: 8,
        height: undefined,
      }}
      text1Style={[TextStyles.bodyM, {color: Colors.White, fontWeight: 'bold'}]}
      text2Style={[TextStyles.bodyM, {color: Colors.White}]}
      text2NumberOfLines={2}
      renderLeadingIcon={() => <WarningIcon color={Colors.White} />}
    />
  ),
};
