import {
  Image,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Platform,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import themestyles from '../../assets/styles/themestyles';
import {Button, Header} from '../../component';
import images from '../../assets';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import ImagePicker from 'react-native-image-crop-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import useAsyncStorage from '../../hooks/useAsyncStorage';

type AuthStackParams = {
  Location: undefined;
};

type NavigationProps = StackNavigationProp<AuthStackParams>;

const ProfileImage = () => {
  const [saveProfileImage, setSaveProfileImage] = useState('');
  const [showImageSelectModal, setshowImageSelectModal] = useState(false);
  const navigation = useNavigation<NavigationProps>();
  const storeProfileImage = useAsyncStorage('profileImage');

  const openCamera = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        return;
      }
    }
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      const uri = image.path;
      setSaveProfileImage(uri);
      setshowImageSelectModal(false);
    });
  };

  const openGallery = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        return;
      }
    }
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      const uri = image.path;
      setSaveProfileImage(uri);
      setshowImageSelectModal(false);
    });
  };

  const editImage = async () => {
    if (!saveProfileImage) return;

    try {
      const editedImage = await ImagePicker.openCropper({
        path: saveProfileImage,
        width: 300,
        height: 400,
        cropping: true,
      });

      if (editedImage?.path) {
        setSaveProfileImage(editedImage.path);
      }
    } catch (error) {
      console.warn('Editing cancelled or failed', error);
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
                  setshowImageSelectModal(true);
                }}
              />
            </View>
          </>
        )}
      </View>
      {saveProfileImage.length ? (
        <View style={styles.replaceTextContainer}>
          <TouchableOpacity onPress={openGallery}>
            <Text style={styles.replaceText}>Replace </Text>
          </TouchableOpacity>
          <Text style={styles.replaceText}>or </Text>
          <TouchableOpacity onPress={editImage}>
            <Text style={styles.replaceText}>Edit image</Text>
          </TouchableOpacity>
        </View>
      ) : undefined}
      <View style={styles.buttonContainer}>
        <Button
          title="Next"
          onPress={() => {
            storeProfileImage(saveProfileImage);
            navigation.navigate('Location', {uri: saveProfileImage});
          }}
        />
      </View>

      {/* Modal */}
      <Modal
        visible={showImageSelectModal}
        transparent={true}
        animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <MaterialIcons
              name="close"
              size={24}
              style={styles.closeIcon}
              onPress={() => setshowImageSelectModal(false)}
            />
            <Button
              title="Open Camera"
              variant="outline"
              style={styles.button}
              onPress={openCamera}
            />
            <Button
              title="Select from Gallery"
              variant="outline"
              style={styles.button}
              onPress={openGallery}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default ProfileImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themestyles.COLOR_WHITE,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 200,
    height: 200,
    backgroundColor: themestyles.COLOR_WHITE,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
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
    top: themestyles.SCREEN_HEIGHT * 0.25,
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
  replaceTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  button: {
    width: '80%',
    alignSelf: 'center',
  },
  closeIcon: {position: 'absolute', top: 10, right: 10, marginBottom: 20},
});
