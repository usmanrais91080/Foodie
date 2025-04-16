import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home } from '../screens'


const Tab=createBottomTabNavigator()
export default function BottomNavigation() {
  return (
    <Tab.Navigator screenOptions={{headerShown:false}}>
        <Tab.Screen name='Home' component={Home}/>
    </Tab.Navigator>
  )
}