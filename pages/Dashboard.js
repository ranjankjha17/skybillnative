import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { PartyFormList } from '../components/PartyFormList';
import { PartyForm } from '../components/PartyForm';
import { Home } from './Home';
import { Login } from './Login';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { PrintForm } from '../components/PrintForm';

export const Dashboard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const username = useSelector(state => state.auth.username)
  console.log('auth', username)
  useEffect(() => {

  }, [username])
  const handlelogout = async () => {
    try {
      await AsyncStorage.removeItem('auth');
      dispatch(logout())
      // dispatch(resetBill())
      //ispatch(resetStudents())
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error handling new bill:', error);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handlelogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <Home username={username}/>
      <PartyForm username={username}/>
      <PartyFormList />
      {/* <Login/> */}
      {/* <PrintForm/> */}
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
      flexGrow: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      // padding: 16,
      paddingLeft:16,
      paddingRight:16,
      paddingTop:1,
      paddingBottom:1,       
  },
  heading: {
      fontSize: 18,
      //fontWeight: 'bold',
      marginBottom: 20,
      color: '#1C2833',
      fontWeight: '700',
  },

  input: {
      height: 40,
      borderColor: 'gray',
      backgroundColor: "#D5F5E3",
      borderWidth: 2,
      marginBottom: 10,
      paddingLeft: 10,
      width: '100%',
      fontWeight: "500"        
  },
  headingContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
  marginBottom:5,
  },
  buttonContainer: {
      // marginTop: 15,
     //justifyContent: 'flex-start',
     // alignItems: "flex-start",
     paddingLeft:10,
     flexDirection:"row",
      width: '30%',
  },
  button: {
      backgroundColor: '#BFC9CA',
     // color:"#17202A",
      padding: 10,
      borderRadius: 5,
      // marginTop: 10,
      flex: 1,
      marginRight: 5,
  },
  buttonText: {
      color: 'white',
      textAlign: 'center',
      fontWeight: "500"
  },

  photoContainer: {
      flexDirection: 'column',
      // justifyContent: 'space-between',
      width: '100%',
  },

  photoPreview: {
      width: 200,
      height: 200,
      marginTop: 10,
  },
  pickerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      marginBottom: 10,
  },
  label: {
      fontSize: 16,
      marginBottom: 8,
  },
  picker: {
      width: '55%',
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
  },
  codeContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%',
      marginBottom: 10,

  }

});

