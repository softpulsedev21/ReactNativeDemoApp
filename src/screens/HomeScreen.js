import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Button from '../components/Button';
import { styles } from '../styles/typography'
import { logout } from '../reducers/authReducer';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const loginUser = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const logoutHandler=()=>{
    dispatch(logout());
    navigation.navigate('Login')
  }

  return (
    <SafeAreaView style={styles.container}>
      {loginUser !== null && <View>
        <Text style={styles.title}>Hi, {loginUser.username}</Text>
        <Text style={styles.title}>Welcome to our App</Text>
        <Button title="Logout" onPress={() => logoutHandler()} type='Button' />
      </View> }
    </SafeAreaView>
  )
}