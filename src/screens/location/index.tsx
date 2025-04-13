import {
  Alert,
  Image,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Button, Header} from '../../component';
import {StackNavigationProp} from '@react-navigation/stack';
import themestyles from '../../assets/styles/themestyles';
import images from '../../assets';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Geolocation from 'react-native-geolocation-service';

type AuthStackParamList = {
  ProfileIsReady: undefined;
  GoogleMapScreen: undefined;
};
type MainStackParamList = {
  Location: {selectedLocation?: string};
  GoogleMapScreen: undefined;
};
type NavigationProps = StackNavigationProp<AuthStackParamList>;
const Location = () => {
  const navigation = useNavigation<NavigationProps>();
  const [userLocation, setUserLocation] = useState<string | null>(null);

  const route = useRoute<RouteProp<MainStackParamList, 'Location'>>();

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permission Denied', 'Location permission is required');
        return false;
      }
    } else {
      // this is for ios permission
      const auth = await Geolocation.requestAuthorization('whenInUse');
      if (auth !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required');
        return false;
      }
    }
    return true;
  };

  const getLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return;

    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        const locationString = `Lat:${latitude}, Long:${longitude}`;
        setUserLocation(locationString);
        navigation.navigate('GoogleMapScreen');
      },
      error => {
        console.log('Error', error.code, error.message);
        Alert.alert('Error', 'Could not get location');
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };
  useEffect(() => {
    if (route.params?.selectedLocation) {
      setUserLocation(route.params.selectedLocation);
    }
  }, [route.params?.selectedLocation]);

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Set your Location</Text>
      <Text style={styles.subHeader}>
        This data will be displayed in your account profile for security
      </Text>
      <Image source={images.locaionIcon} style={styles.locationIcon} />
      <View style={styles.locationButton}>
        <TouchableOpacity style={styles.plus} onPress={getLocation}>
          <Icon name="add" size={20} color="white" />
        </TouchableOpacity>
        <Text style={styles.locationText}>
          {userLocation ?? 'Set your location'}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Next" onPress={()=>navigation.navigate('ProfileIsReady')}/>
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
  buttonContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: themestyles.SCREEN_HEIGHT * 0.12,
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
