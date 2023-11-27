import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CommonStyles} from '../../util/styles';
import DropShadow from 'react-native-drop-shadow';
import {TouchableOpacity} from 'react-native';
import NextIcon from '../../assets/icons/next.svg';
import {TextView} from '../atoms/TextView';
import {Colors} from '../../util/colors';
import DoneIcon from '../../assets/icons/done.svg';

export interface FormSectionProps {
  state: 'done' | 'todo' | 'optional';
  title: string;
  onPress?: () => void;
}

export const FormSection: React.FC<FormSectionProps> = ({
  state,
  title,
  onPress,
}) => {
  const markColor =
    state === 'done'
      ? Colors.Primary0
      : state === 'todo'
      ? Colors.Error0
      : Colors.Gray;

  return (
    <TouchableOpacity style={{alignSelf: 'stretch'}} onPress={onPress}>
      <DropShadow style={CommonStyles.cardShadow}>
        <View style={styles.section}>
          <View style={[styles.mark, {backgroundColor: markColor}]}>
            {state === 'done' && (
              <DoneIcon width={48} height={48} color={Colors.White} />
            )}

            {state === 'todo' && (
              <TextView variant={'headingL'} bold style={{color: Colors.White}}>
                !
              </TextView>
            )}
          </View>

          <TextView variant={'bodyM'} bold>
            {title}
          </TextView>

          <NextIcon color={Colors.Text} style={styles.next} />
        </View>
      </DropShadow>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  section: {
    gap: 8,
    flexDirection: 'row',
    backgroundColor: Colors.Light0,
    padding: 4,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.Dark0,
    alignItems: 'center',
  },
  mark: {
    width: 48,
    height: 48,
    borderRadius: 4,
    backgroundColor: Colors.Gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  next: {
    marginLeft: 'auto',
  },
});
