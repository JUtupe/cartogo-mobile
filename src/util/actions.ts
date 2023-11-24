import {Linking} from 'react-native';

export const callAction = async (phoneNumber: string) => {
  await Linking.openURL(`tel:${phoneNumber}`);
};

export const emailAction = async (email: string, subject: string) => {
  await Linking.openURL(`mailto:${email}?subject=${subject}`);
};

export const navigateAction = async (address: string) => {
  await Linking.openURL(
    `https://www.google.com/maps/search/?api=1&query=${address}`,
  );
};
