import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Button from '../components/Button';
import { styles } from '../styles/typography'
import { logout } from '../reducers/authReducer';
import { useNavigation } from '@react-navigation/native';
import { GET_ALL_USERS } from '../graphql/queries';
import { useQuery } from '@apollo/client';

export default function HomeScreen() {
  const loginUser = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { error, data } = useQuery(GET_ALL_USERS);

  if (error) {
    return <Text style={{ marginTop: 100 }}>Error: {error.message}</Text>;
  }

  const logoutHandler = () => {
    dispatch(logout());
    navigation.navigate('Login')
  }

  return (
    <SafeAreaView style={styles.container}>
      {loginUser !== null && <View>
        <Text style={styles.title}>Hi, {loginUser.username}</Text>
        <Text style={styles.title}>Welcome to our App</Text>
        <Button title="Logout" onPress={() => logoutHandler()} type='Button' />
      </View>}

      <View style={styles.tableContainer}>
        <Text style={styles.tableCaption}>All Registered Users</Text>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>No.</Text>
          <Text style={[styles.tableHeader, { flex: 1 }]}>Name</Text>
          <Text style={[styles.tableHeader, { flex: 1 }]}>Email</Text>
        </View>
        {data?.getAllUsers.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{index + 1}</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>{item.username}</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>{item.email}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  )
}