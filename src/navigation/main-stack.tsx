import {createStackNavigator} from '@react-navigation/stack';
import BioScreen from '../screens/bio';
import {
  GoogleMapScreen,
  Location,
  PaymentScreen,
  ProfileImage,
  ProfileIsReady,
  Search,
} from '../screens';
import Main from '../screens/main-screen/indesx';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="BioScreen" component={BioScreen} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen name="ProfileImage" component={ProfileImage} />
      <Stack.Screen name="Location" component={Location} />
      <Stack.Screen name="ProfileIsReady" component={ProfileIsReady} />
      <Stack.Screen name="GoogleMapScreen" component={GoogleMapScreen} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Main" component={Main} />
    </Stack.Navigator>
  );
};
export default MainStack;
