import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/login';
import SignUp from '../screens/signup';
import {
  BioScreen,
  Carousel,
  Location,
  PaymentScreen,
  ProfileImage,
  ProfileIsReady,
} from '../screens';

const Stack = createStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Carousel" component={Carousel} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="BioScreen" component={BioScreen} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen name="ProfileImage" component={ProfileImage} />
      <Stack.Screen name="Location" component={Location} />
      <Stack.Screen name="ProfileIsReady" component={ProfileIsReady} />
    </Stack.Navigator>
  );
};
