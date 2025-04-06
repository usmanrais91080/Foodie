import { createStackNavigator } from "@react-navigation/stack";
import BioScreen from "../screens/bio";
import { PaymentScreen } from "../screens";

const Stack=createStackNavigator();

const MainStack=()=>{
    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="BioScreen" component={BioScreen} />
            <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        </Stack.Navigator>
    )
}
export default MainStack;