import {createStackNavigator} from '@react-navigation/stack';
import BioScreen from '../screens/bio';
import {Location, PaymentScreen, ProfileImage} from '../screens';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="BioScreen" component={BioScreen} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen name="ProfileImage" component={ProfileImage} />
      <Stack.Screen name="Location" component={Location} />
    </Stack.Navigator>
  );
};
export default MainStack;
