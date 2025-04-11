import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Button, Header} from '../../component';
import themestyles from '../../assets/styles/themestyles';
import images from '../../assets';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {StackNavigationProp} from '@react-navigation/stack';

type AuthStackParamList = {
  ProfileIsReady: undefined;
};

type NavigationProps = StackNavigationProp<AuthStackParamList>;
const Location = () => {
  const route = useRoute();
  const {uri} = route.params;
  const navigation = useNavigation<NavigationProps>();
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Set your Location</Text>
      <Text style={styles.subHeader}>
        This data will be displayed in your account profile for security
      </Text>
      <Image source={images.locaionIcon} style={styles.locationIcon} />
      <View style={styles.locationButton}>
        <TouchableOpacity style={styles.plus}>
          <Icon name="add" size={20} color="white" />
        </TouchableOpacity>
        <Text style={styles.locationText}>Set your location</Text>
      </View>
      <View style={{width: '90%', alignSelf: 'center', marginBottom: 30}}>
        <Button
          title="Next"
          onPress={() => navigation.navigate('ProfileIsReady')}
        />
      </View>
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themestyles.COLOR_WHITE,
  },
  title: {
    fontSize: 25,
    fontWeight: '600',
    alignSelf: 'center',
    color: themestyles.PRIMARY,
    marginTop: 20,
  },
  subHeader: {
    marginTop: 30,
    marginBottom: 20,
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    width: '60%',
    alignSelf: 'center',
  },
  locationIcon: {
    height: 115,
    width: 90,
    alignSelf: 'center',
    marginTop: themestyles.SCREEN_HEIGHT * 0.13,
  },
  locationButton: {
    borderWidth: 2,
    borderColor: themestyles.PRIMARY,
    borderStyle: 'dotted',
    height: 50,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 5,
    paddingLeft: 10,
    width: '80%',
    marginTop: themestyles.SCREEN_HEIGHT * 0.15,
    gap: 20,
  },
  plus: {
    height: 30,
    width: 30,
    backgroundColor: themestyles.PRIMARY,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationText: {
    color: themestyles.PRIMARY,
  },
  dottedButtonText: {
    color: '#000', // or themestyles.PRIMARY
    fontWeight: '500',
  },
});
