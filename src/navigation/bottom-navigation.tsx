import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Cart, Chat, Home, Profile} from '../screens';
import CustomBottomTab from './custom-bottom-tab';

const Tab = createBottomTabNavigator();
export default function BottomNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <CustomBottomTab {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Chat" component={Chat} />
    </Tab.Navigator>
  );
}
