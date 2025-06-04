import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import themestyles from '../../assets/styles/themestyles';
import {Button} from '../../component';
import SuccessAnimation from '../../animation/success-animation';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {saveRegisterUserDataToFirestore} from '../../utils/saveRegisterUserDataToFirestore';
import {updateDoc, doc} from '@react-native-firebase/firestore';
import {getAuth} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

type MainStackNavigation = {
  Main: undefined;
};

type NavigationProps = StackNavigationProp<MainStackNavigation>;

const ProfileIsReady = () => {
  const navigation = useNavigation<NavigationProps>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const uploadData = async () => {
      setLoading(true);
      try {
        await saveRegisterUserDataToFirestore();
        setLoading(false);
      } catch (error) {
        setLoading(false);
        Alert.alert('Error', 'Failed to save profile data. Please try again.');
      }
    };
    uploadData();
  }, []); // ✅ runs only once

  const completeOnboarding = async () => {
    try {
      const user = getAuth().currentUser;
      if (user) {
        await updateDoc(doc(firestore(), 'users', user.uid), {
          onboardingComplete: true,
        });
        navigation.replace('Main'); // ✅ go to main screen
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to complete onboarding. Try again.');
    }
  };

  return (
    <View style={styles.container}>
      <SuccessAnimation />
      <Text style={styles.congratestext}>Congrats!</Text>
      <Text style={styles.subheader}>Your Profile Is Ready To Use</Text>
      <View style={styles.buttonContainer}>
        <Button
          title={loading ? 'Saving...' : 'Start Exploring'}
          isLoading={loading}
          onPress={completeOnboarding} // ✅ this was missing!
        />
      </View>
    </View>
  );
};

export default ProfileIsReady;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themestyles.COLOR_WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: 160,
    width: 170,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  congratestext: {
    fontSize: 30,
    color: themestyles.PRIMARY,
    fontWeight: '700',
    letterSpacing: 1,
  },
  subheader: {
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 0.5,
    marginTop: 10,
  },
  buttonContainer: {
    width: '90%',
    alignSelf: 'center',
    top: themestyles.SCREEN_HEIGHT * 0.3,
  },
});
