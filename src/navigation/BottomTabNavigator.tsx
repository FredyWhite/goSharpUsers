import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateUserScreen from '../screens/CreateUserScreen';
import UserListScreen from '../screens/UserListScreen';
import Profile from '../screens/Profile';
import { RootStackParamList } from '../types'

const Tab = createBottomTabNavigator<RootStackParamList>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="UserList"
        component={UserListScreen}
        options={{ tabBarLabel: 'User List', headerShown: false }}
      />
      <Tab.Screen
        name="CreateUser"
        component={CreateUserScreen}
        options={{ tabBarLabel: 'Create User', headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ tabBarLabel: 'Profile', headerShown: false }}
      />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator;