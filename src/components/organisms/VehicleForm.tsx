import {FormImage} from '../../util/FormImage';
import React from 'react';
import {TextView} from '../atoms/TextView';
import {ControlledInput} from '../atoms/ControlledInput';
import {Validations} from '../../util/validations';
import {Image, StyleSheet, View} from 'react-native';
import {Button} from '../atoms/Button';
import {ControlledSlider} from '../atoms/ControlledSlider';
import {ControlledRadioButton} from '../atoms/ControlledRadioButton';
import {useForm} from 'react-hook-form';
import {launchCamera} from 'react-native-image-picker';
import {DefaultValues} from 'react-hook-form/dist/types/form';

export interface VehicleFormData {
  registrationNumber: string;
  name: string;
  image?: FormImage;
  state: {
    mileage: string;
    fuelLevel: string;
    condition: 'CLEAN' | 'DIRTY' | 'SLIGHTLY_DIRTY';
  };
}

export interface VehicleFormProps {
  onSubmit: (data: VehicleFormData) => void;
  defaultValues?: DefaultValues<VehicleFormData>;
}

export const VehicleForm: React.FC<VehicleFormProps> = ({
  onSubmit,
  defaultValues,
}) => {
  const {control, watch, handleSubmit, setValue} = useForm<VehicleFormData>({
    defaultValues: defaultValues,
  });
  const [fuelLevel, image] = watch(['state.fuelLevel', 'image']);

  const onSetImageClick = async () => {
    const result = await launchCamera({mediaType: 'photo'});

    if (result.didCancel) {
      return;
    }

    if (result.assets) {
      const asset = result.assets[0];

      if (asset && asset.uri && asset.type && asset.fileName) {
        setValue('image', {
          uri: asset.uri,
          type: asset.type,
          name: asset.fileName,
        });
      }
    }
  };

  const onRemoveImageClick = () => {
    setValue('image', undefined);
  };

  return (
    <>
      <TextView variant={'bodyM'} bold>
        Dane podstawowe
      </TextView>

      <ControlledInput
        control={control}
        name={'registrationNumber'}
        label={'Numer rejestracyjny'}
        rules={{required: Validations.required}}
      />
      <ControlledInput control={control} name={'name'} label={'Nazwa'} />

      <TextView variant={'bodyM'} bold>
        Zdjęcie (opcjonalne)
      </TextView>
      <View
        style={{
          gap: 16,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        {image !== undefined && (
          <Image style={styles.image} source={{uri: image.uri}} />
        )}

        <View
          style={{
            flex: 1,
            gap: 16,
          }}>
          <Button
            title={image !== undefined ? 'Zamień' : 'Ustaw'}
            onPress={onSetImageClick}
          />
          {image !== undefined && (
            <Button
              title={'Usuń'}
              variant={'error'}
              onPress={onRemoveImageClick}
            />
          )}
        </View>
      </View>

      <TextView variant={'bodyM'} bold>
        Stan pojazdu
      </TextView>

      <ControlledInput
        control={control}
        name={'state.mileage'}
        label={'Przebieg'}
        keyboardType={'number-pad'}
      />

      <ControlledSlider
        control={control}
        name={'state.fuelLevel'}
        label={`Poziom paliwa (${fuelLevel}%)`}
        min={0}
        max={100}
      />

      <View style={{width: '100%', gap: 16, alignItems: 'flex-start'}}>
        <ControlledRadioButton
          control={control}
          name={'state.condition'}
          title={'Czysty'}
          value={'CLEAN'}
        />
        <ControlledRadioButton
          control={control}
          name={'state.condition'}
          title={'Lekko brudny'}
          value={'SLIGHTLY_DIRTY'}
        />
        <ControlledRadioButton
          control={control}
          name={'state.condition'}
          title={'Brudny'}
          value={'DIRTY'}
        />
      </View>

      <View style={{width: '100%', gap: 16, alignItems: 'flex-end'}}>
        <Button
          title={'Zapisz'}
          primary
          greedy={false}
          style={{alignSelf: 'flex-end'}}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 96,
    height: 96,
    borderRadius: 8,
  },
});
