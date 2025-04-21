import {
  Image,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Platform,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import themestyles from '../../assets/styles/themestyles';
import {Button, Header} from '../../component';
import images from '../../assets';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import {StackNavigationProp} from '@react-navigation/stack';

type AuthStackParams = {
  Location: undefined;
};

type NavigationProps = StackNavigationProp<AuthStackParams>;

const ProfileImage = () => {
  const [saveProfileImage, setSaveProfileImage] = useState('');
  const navigation = useNavigation<NavigationProps>();

  const openCamera = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        return;
      }
    }

    const result = await launchImageLibrary({
      mediaType: 'photo',
    });

    if (result?.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setSaveProfileImage(uri);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Header />
      <Text style={styles.subHeader}>Upload your photo profile </Text>
      {saveProfileImage.length > 0 ? (
        <Text style={styles.subHeader2}>
          This data will be displayed in your account profile for security
        </Text>
      ) : undefined}
      <Image source={images.galleryIcon} style={styles.galleryIcon} />
      <View style={styles.imageContainer}>
        {saveProfileImage ? (
          <Image source={{uri: saveProfileImage}} style={styles.image} />
        ) : (
          <>
            <Text style={styles.title}>Organize your file easily</Text>
            <Text style={styles.subTitle}>
              This data will be displayed in your account profile for security
            </Text>
            <View style={styles.outlineButton}>
              <Button
                title="Select Photo"
                variant="outline"
                onPress={() => {
                  openCamera();
                }}
              />
            </View>
          </>
        )}
      </View>
      {saveProfileImage.length ? (
        <Text style={styles.replaceText}>Replace or edit image</Text>
      ) : undefined}
      <View style={styles.buttonContainer}>
        <Button
          title="Next"
          onPress={() =>
            navigation.navigate('Location', {uri: saveProfileImage})
          }
        />
      </View>
    </ScrollView>
  );
};

export default ProfileImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themestyles.COLOR_WHITE,
  },
  subHeader: {
    marginTop: 20,
    marginBottom: 30,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '65%',
    alignSelf: 'center',
  },
  subHeader2: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    width: '60%',
    alignSelf: 'center',
  },
  galleryIcon: {
    height: 130,
    width: 130,
    resizeMode: 'contain',
    position: 'absolute',
    right: 20,
    top: themestyles.SCREEN_HEIGHT * 0.29,
  },
  imageContainer: {
    height: 275,
    width: '85%',
    borderWidth: 0.5,
    borderColor: themestyles.COLOR_GREY,
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: themestyles.COLOR_WHITE,
    marginTop: themestyles.SCREEN_HEIGHT * 0.11,
  },
  image: {
    height: 275,
    width: '100%',
    borderWidth: 0.7,
    borderColor: themestyles.COLOR_GREY,
    alignSelf: 'center',
    borderRadius: 20,
  },
  buttonContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: themestyles.SCREEN_HEIGHT * 0.12,
  },
  title: {
    fontSize: 33,
    fontWeight: '500',
    alignSelf: 'center',
    marginTop: 20,
    textAlign: 'center',
    width: '73%',
  },
  subTitle: {
    marginTop: 20,
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    width: '80%',
    alignSelf: 'center',
  },
  replaceText: {
    alignSelf: 'center',
    fontSize: 15,
    color: themestyles.PRIMARY,
    marginTop: 5,
  },
  outlineButton: {width: '80%', alignSelf: 'center', marginTop: 20},
});
