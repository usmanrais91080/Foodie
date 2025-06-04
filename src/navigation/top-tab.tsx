import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ProductDesc from '../screens/product-detail-screen/product-descriptio';
import ProdIngredients from '../screens/product-detail-screen/product-ingredients';

const Tab = createMaterialTopTabNavigator();

const TopTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="ProductDesc" component={ProductDesc} />
      <Tab.Screen name="ProdIngredients" component={ProdIngredients} />
    </Tab.Navigator>
  );
};

export default TopTab;
