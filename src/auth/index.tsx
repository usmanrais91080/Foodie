import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

type TUser = {
  name: string;
  email: string;
  password: string;
};

type TLogin = {
  email: string;
  password: string;
};

export const registerWithEmailAndPassword = async ({
  email,
  password,
}: TUser) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    // await userCredential.user.updateProfile({
    //   displayName: name,
    // });
    await userCredential.user.reload(); // <-- refresh user info
    console.log('user', userCredential.user);
    const updatedUser = auth().currentUser;

    if (updatedUser) {
      await firestore().collection('users').doc(updatedUser.uid).set({
        uid: updatedUser.uid,
        email,
        password,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
    }
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

// login method
export const loginWithEmailAndPassword = async ({email, password}: TLogin) => {
  try {
    const userLoginCred = await auth().signInWithEmailAndPassword(
      email,
      password,
    );
    return userLoginCred.user;
  } catch (error) {
    throw error;
  }
};
