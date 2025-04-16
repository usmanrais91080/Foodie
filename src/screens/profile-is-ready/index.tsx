import { StyleSheet, Text, View} from 'react-native';
import React from 'react';
import themestyles from '../../assets/styles/themestyles';
import {Button} from '../../component';
import SuccessAnimation from '../../animation/success-animation';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type MainStackNavigation={
  Main:undefined
}

type NavigationProps=StackNavigationProp<MainStackNavigation>
const ProfileIsReady = () => {
  const navigation=useNavigation<NavigationProps>()
  return (
    <View style={styles.container}>
      <SuccessAnimation /> 
      <Text style={styles.congratestext}>Congrats!</Text>
      <Text style={styles.subheader}>Your Profile Is Ready To Use</Text>
      <View style={styles.buttonContainer}>
        <Button title="Try Order" onPress={()=>navigation.navigate('Main')}/>
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
