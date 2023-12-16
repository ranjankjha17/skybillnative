import React, { useEffect } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { PartyFormList } from '../components/PartyFormList';
import { PartyForm } from '../components/PartyForm';
import { Home } from './Home';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { resetBill } from '../reducers/bill';
import { resetStudents } from '../reducers/temp_order';

export const Dashboard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const username = useSelector(state => state.auth.username)
  useEffect(() => {
  }, [username])
  const handlelogout = async () => {
    try {
      await AsyncStorage.removeItem('auth');
      dispatch(logout())
      dispatch(resetBill())
      dispatch(resetStudents())
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error handling new bill:', error);
    }
  };
  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View style={DashboardStyles.buttonContainer}>
        <TouchableOpacity style={DashboardStyles.button} onPress={handlelogout}>
          <Text style={DashboardStyles.buttonText}>Logout</Text>
        </TouchableOpacity>
        {/* <Pressable style={DashboardStyles.button} onPress={handlelogout}>
          <Text style={DashboardStyles.buttonText}>Logout</Text>
        </Pressable> */}
      </View>
      <Home username={username} />
      <PartyForm username={username} />
      <PartyFormList />
    </ScrollView>
  )
}
const DashboardStyles = StyleSheet.create({
  buttonContainer: {
    paddingLeft: 10,
    flexDirection: "row",
    width: '30%',
  },
  button: {
    backgroundColor: '#BFC9CA',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: "500"
  },
});

