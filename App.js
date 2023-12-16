import { Provider } from 'react-redux';
import store from './store/store';
import { Dashboard } from './pages/Dashboard';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from './pages/Login';
import {ErrorBoundary} from 'react-error-boundary'

const Stack = createStackNavigator();
function ErrorHandler() {
  return (
    <View role="alert">
      <Text>An error occurred:</Text>
      {/* <Text>{error.message}</Text> */}
     
    </View>
  )
}

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorHandler}>
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Dashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    </ErrorBoundary>

  );
}
