import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView } from 'react-native';
import { Provider } from 'react-redux';
import store from './store/store';
import { Dashboard } from './pages/Dashboard';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from './pages/Login';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Dashboard} />
        </Stack.Navigator>
      </NavigationContainer>
      {/* <Dashboard/> */}
    </Provider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: '#fff',
//    alignItems: 'center',
//   justifyContent: 'center',
//     padding: 16,
// },
// });


// CREATE VIEW BillView AS
// SELECT
//   TableA.agrnumber,
//   TableA.farmername,
//   TableA.totalbags,
//   TableB.partyname,
//   TableB.rate,
//   TableB.quantity
// FROM
//   TableA
// JOIN
//   TableB ON TableA.agrnumber = TableB.agrnumber;