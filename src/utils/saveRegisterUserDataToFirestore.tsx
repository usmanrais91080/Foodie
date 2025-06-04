import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import {getLocalData} from '../hooks/useGetLocalData';

export const saveRegisterUserDataToFirestore = async () => {
  try {
    const user = auth().currentUser;
    if (!user) throw new Error('No user is logged in');

    const getBio = getLocalData('bio');
    const getProfileImage = getLocalData('profileImage');
    const getPaymentMethod = getLocalData('paymentMethod');
    // const getLocation = useGetLocalData('location');

    const bio = getBio();
    const profileImage = getProfileImage();
    const paymentMethod = getPaymentMethod();

    const payload = {
      uid: user?.uid,
      email: user?.email,
      fullName: bio?.fullName || '',
      country: bio?.country || '',
      phoneNumber: bio?.phoneNumber || '',
      profileImage: profileImage || '',
      paymentMethod: paymentMethod || '',
      createdAt: firestore.FieldValue.serverTimestamp(),
    };

    await firestore().collection('users').doc(user.uid).set(payload);
    console.log('User onboarding data saved to Firestore.');
  } catch (error) {
    console.error('Failed to save onboarding data', error);
    Alert.alert('Error', 'Something went wrong while saving your data.');
  }
};
