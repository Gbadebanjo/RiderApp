import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Landing from './app/screens/Welcome/Landing';
import LandingOffer from './app/screens/Welcome/LandingOffer';
import FirstScreen from './app/screens/Auth/Signup/FirstScreen';
import CreateAccount from './app/screens/Auth/Signup/CreateAccount';
import MenuLanding from './app/screens/Dashboard/MenuLanding';
import WelcomeGuest from './app/screens/Auth/Signup/WelcomeGuest';
import VerifySignup from './app/screens/Auth/Signup/VerifySignup';
import SetPassword from './app/screens/Auth/Signup/SetPassword';

import NavButtons from './app/components/NavButtons';

const Stack = createStackNavigator();

export default function App() {
  return (
   <NavigationContainer>
    <Stack.Navigator initialRouteName='Landing'>
      <Stack.Screen name='Landing' component={Landing} options={{ headerShown: false }}/>
      <Stack.Screen name='LandingOffer' component={LandingOffer} options={{ headerShown: false }}/>
      <Stack.Screen name='FirstScreen' component={FirstScreen} options={{ headerShown: false }}/>
      <Stack.Screen name='WelcomeGuest' component={WelcomeGuest} options={{ headerShown: false }}/>
      <Stack.Screen name='CreateAccount' component={CreateAccount} options={{ headerShown: false }}/>
      <Stack.Screen name='VerifySignup' component={VerifySignup} options={{ headerShown: false }}/>
      <Stack.Screen name='SetPassword' component={SetPassword} options={{ headerShown: false }}/>
      <Stack.Screen name='MenuLanding' component={NavButtons} options={{ headerShown: false }}/>
    </Stack.Navigator>
   </NavigationContainer>
  );
}