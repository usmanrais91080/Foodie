import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';

import {z} from 'zod';
import {set, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {Button, Header, Input} from '../../component';
import Icon from 'react-native-vector-icons/MaterialIcons';
import themestyles from '../../assets/styles/themestyles';
import CountryPicker from '../../component/country-picker';
import useAsyncStorage from '../../hooks/useAsyncStorage';

type AuthStackParamList = {
  PaymentScreen: undefined;
};

type NavigationProps = StackNavigationProp<AuthStackParamList>;
const BioScreen = () => {
  const bioSchema = z.object({
    fullName: z.string().min(1, {message: 'Full name is required'}),
    country: z.string().min(1, {message: 'Country is required'}),
    phoneNumber: z.coerce
      .number()
      .min(1000000000, 'Please enter phone number')
      .max(9999999999, 'Please enter valid phone number')
      .refine(val => val.toString().length === 10, {
        message: 'Phone number must be 10 digits',
      }),
  });
  type FormValues = z.infer<typeof bioSchema>;

  const {handleSubmit, control, setValue} = useForm<FormValues>({
    defaultValues: {
      fullName: '',
      country: '',
      phoneNumber: 0,
    },
    resolver: zodResolver(bioSchema),
  });

  const navigation = useNavigation<NavigationProps>();
  const storeBioLocalData = useAsyncStorage('bio');

  // yhna hum form ka data mmkv me store kr rh hn
  const handleOnSubmit = useCallback(
    (formData: FormValues) => {
      storeBioLocalData(formData);
      navigation.navigate('PaymentScreen');
    },
    [navigation, storeBioLocalData],
  );

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.header}>Fill in your bio to get started</Text>
      <Text style={styles.subHeader}>
        This data will be displayed in your account profile for security
      </Text>
      <View style={{width: '90%', alignSelf: 'center'}}>
        <Input
          control={control}
          name="fullName"
          placeholder="Full Name"
          leftIcon={<Icon name={'person'} size={20} />}
        />
        <CountryPicker
          name="country"
          control={control}
          // label="Country"
          placeholder="Select Country"
          setValue={setValue}
        />
        <Input
          control={control}
          name="phoneNumber"
          placeholder="Mobile Number"
          leftIcon={<Icon name="call" size={20} />}
        />
      </View>
      <View style={{flex: 0.9}} />
      <View style={{width: '90%', alignSelf: 'center'}}>
        <Button title="Next" onPress={handleSubmit(handleOnSubmit)} />
      </View>
    </View>
  );
};

export default BioScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themestyles.COLOR_WHITE,
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '60%',
    alignSelf: 'center',
  },
  subHeader: {
    marginTop: 5,
    marginBottom: 20,
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    width: '60%',
    alignSelf: 'center',
  },
});
