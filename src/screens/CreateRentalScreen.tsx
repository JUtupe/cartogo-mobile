import {RootStackParamList} from '../navigation/screens';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CommonStyles} from '../util/styles';
import {TextView} from '../components/atoms/TextView';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateRental'>;

export const CreateRentalScreen = ({}: Props) => {
  return (
    <SafeAreaView style={CommonStyles.container}>
      <TextView>Test</TextView>
    </SafeAreaView>
  );
};
