import {ActivityIndicator, Alert, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker} from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
const GoogleMapScreen = () => {
  const [region, setRegion] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      },
      error => {
        Alert.alert('Error', 'Could not get location');
        console.log(error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  const handlePlaceSelect = (data, details) => {
    const lat = details.geometry.location.lat;
    const lng = details.geometry.location.lng;
  
    const addressComponents = details.address_components;
    let city = '';
    let country = '';
  
    addressComponents.forEach(component => {
      if (component.types.includes('locality')) {
        city = component.long_name;
      }
      if (component.types.includes('country')) {
        country = component.long_name;
      }
    });
  
    const formattedLocation = city && country ? `${city}, ${country}` : data.description;
  
    const newRegion = {
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  
    setRegion(newRegion);
  
    // ✅ Pass formatted city + country back
    navigation.navigate('Location', {
      selectedLocation: formattedLocation,
    });
  };
  

  if (!region) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={handlePlaceSelect}
        fetchDetails={true}
        query={{
          key: 'AIzaSyACrE-jZMcSKxxrrbxXTY7IwLncKM-dl7A',
          language: 'en',
        }}
        styles={{
          container: styles.autocompleteContainer,
          textInput: styles.textInput,
        }}
      />
      <MapView style={styles.map} region={region}>
        <Marker coordinate={region} title="Selected location" />
      </MapView>
    </View>
  );
};

export default GoogleMapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  autocompleteContainer: {
    position: 'absolute',
    top: 10,
    width: '90%',
    alignSelf: 'center',
    zIndex: 1,
  },
  textInput: {
    height: 44,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
  },
});