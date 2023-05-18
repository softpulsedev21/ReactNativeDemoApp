import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();
const Navigation = () => {
  const loginUser = useSelector(state => state.user);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName= {loginUser !== null ? 'Home' : 'Login' } screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
