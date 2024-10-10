import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';
import { toastConfig } from './toastConfig';
import { AppProvider } from './app/context/AppContext';

import Splash from './app/screens/Welcome/Splash';
import Onboarding from './app/screens/Welcome/Onboarding';
import FirstScreen from './app/screens/Auth/Signup/FirstScreen';
import CreateAccount from './app/screens/Auth/Signup/CreateAccount';
import Login from './app/screens/Auth/Login/Login';
import UseFingerprint from './app/screens/Auth/Login/UseFingerprint';
import UseFaceid from './app/screens/Auth/Login/UseFaceid';
import LoginOptions from './app/screens/Auth/Login/LoginOptions';
import UsePassword from './app/screens/Auth/Login/UsePassword';
import UsePassphrase from './app/screens/Auth/Login/UsePassphrase';
import UsePincode from './app/screens/Auth/Login/UsePincode';
import WelcomeGuest from './app/screens/Auth/Signup/WelcomeGuest';
import ConfirmSignup from './app/screens/Auth/Signup/ConfirmSignup';
import SetPassword from './app/screens/Auth/Signup/SetPassword';
import UserDetails from './app/screens/Auth/Signup/UserDetails';
import SecurityIntro from './app/screens/Auth/Signup/SecurityIntro';
import SetupSecurity from './app/screens/Auth/Signup/SetupSecurity';
import SetupAdditionalSecurity from './app/screens/Auth/Signup/SetupAdditionalSecurity';
import Security from './app/screens/Settings/Security';    // In use
import Biometric from './app/screens/Security/Biometric';
import FacialID from './app/screens/Security/FacialID';
import CreatePassphrase from './app/screens/Security/CreatePassphrase';
import GeneratePassphrase from './app/screens/Security/GeneratePassphrase';
import SettingToggle from './app/screens/Security/SettingToggle';
import Feedback from './app/screens/Feedback/Feedback';
import ThankYou from './app/screens/Feedback/ThankYou';
import Photo from './app/screens/Settings/Photo';  // In use
import ReviewPhoto from './app/screens/Settings/ReviewPhoto';  // In use
import RewardProgram from './app/screens/Settings/RewardProgram'; // In use
import CashbackReward from './app/screens/Settings/CashbackReward'; // In use
import MilesPoint from './app/screens/Settings/MilesPoint'; // In use
import WelcomeHome from './app/screens/HomeScreens/WelcomeHome';
import RecoveryEmail from './app/screens/Recovery/EnterEmail';
import InviteReferral from './app/screens/Settings/InviteReferral';  // In use
import HelpAndSupport from './app/screens/Settings/HelpAndSupport';   // In use
import BotLoading from './app/screens/Settings/BotLoading';  // In use
import ChatBot from './app/screens/Settings/ChatBot'; // In use
import CustomerServiceCenter from './app/screens/Settings/CustomerServiceCenter';   // In use
import LiveChat from './app/screens/Settings/LiveChat'; // In use
import TrackReferral from './app/screens/Dashboard/TrackReferral';  // In use
import FacialIdToggle from './app/screens/Settings/FacialIdToggle'; // In use
import PassphraseScreen from './app/screens/Settings/PassphraseScreen'; // In use
import BiometricToggle from './app/screens/Settings/BiometricToggle';
import SettingsPasswordScreen from './app/screens/Settings/SettingsPasswordScreen'; // In use
import PinSettings from './app/screens/Settings/PinSettings'; // In use
import PinPasswordScreen from './app/screens/Settings/PinPasswordScreen'; // In use
import CreatePinScreen from './app/screens/Settings/CreatePinScreen'; // In use
import ConfirmPinScreen from './app/screens/Settings/ConfirmPinScreen'; // In use


import NavButtons from './app/components/NavButtons';  // In use

const Stack = createStackNavigator();

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Splash'>
          <Stack.Screen name='Splash' component={Splash} options={{ headerShown: false }} />
          <Stack.Screen name='Onboarding' component={Onboarding} options={{ headerShown: false }} />
          <Stack.Screen name='FirstScreen' component={FirstScreen} options={{ headerShown: false }} />
          <Stack.Screen name='WelcomeGuest' component={WelcomeGuest} options={{ headerShown: false }} />
          <Stack.Screen name='WelcomeHome' component={NavButtons} options={{ headerShown: false }} />
          <Stack.Screen name='CreateAccount' component={CreateAccount} options={{ headerShown: false }} />
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
          <Stack.Screen name='UseFingerprint' component={UseFingerprint} options={{ headerShown: false }} />
          <Stack.Screen name='UseFaceid' component={UseFaceid} options={{ headerShown: false }} />
          <Stack.Screen name='LoginOptions' component={LoginOptions} options={{ headerShown: false }} />
          <Stack.Screen name='UsePassword' component={UsePassword} options={{ headerShown: false }} />
          <Stack.Screen name='UsePassphrase' component={UsePassphrase} options={{ headerShown: false }} />
          <Stack.Screen name='UsePincode' component={UsePincode} options={{ headerShown: false }} />
          <Stack.Screen name='ConfirmSignup' component={ConfirmSignup} options={{ headerShown: false }} />
          <Stack.Screen name='SetPassword' component={SetPassword} options={{ headerShown: false }} />
          <Stack.Screen name='MenuLanding' component={NavButtons} options={{ headerShown: false }} />
          <Stack.Screen name='UserDetails' component={UserDetails} options={{ headerShown: false }} />
          <Stack.Screen name='SecurityIntro' component={SecurityIntro} options={{ headerShown: false }} />
          <Stack.Screen name='SetupSecurity' component={SetupSecurity} options={{ headerShown: false }} />
          <Stack.Screen name='SetupAdditionalSecurity' component={SetupAdditionalSecurity} options={{ headerShown: false }} />
          <Stack.Screen name='Security' component={Security} options={{ headerShown: false }} />
          <Stack.Screen name='SettingToggle' component={SettingToggle} options={{ headerShown: false }} />
          <Stack.Screen name='Biometric' component={Biometric} options={{ headerShown: false }} />
          <Stack.Screen name='FacialID' component={FacialID} options={{ headerShown: false }} />
          <Stack.Screen name='SettingsPasswordScreen' component={SettingsPasswordScreen} options={{ headerShown: false }} />
          <Stack.Screen name='PassphraseScreen' component={PassphraseScreen} options={{ headerShown: false }} />
          <Stack.Screen name='CreatePassphrase' component={CreatePassphrase} options={{ headerShown: false }} />
          <Stack.Screen name='GeneratePassphrase' component={GeneratePassphrase} options={{ headerShown: false }} />
          <Stack.Screen name='RecoveryEmail' component={RecoveryEmail} options={{ headerShown: false }} />
          <Stack.Screen name='Feedback' component={Feedback} options={{ headerShown: false }} />
          <Stack.Screen name='ThankYou' component={ThankYou} options={{ headerShown: false }} />
          <Stack.Screen name='Photo' component={Photo} options={{ headerShown: false }} />
          <Stack.Screen name='ReviewPhoto' component={ReviewPhoto} options={{ headerShown: false }} />
          <Stack.Screen name='RewardProgram' component={RewardProgram} options={{ headerShown: false }} />
          <Stack.Screen name='CashbackReward' component={CashbackReward} options={{ headerShown: false }} />
          <Stack.Screen name='MilesPoint' component={MilesPoint} options={{ headerShown: false }} />
          <Stack.Screen name='InviteReferral' component={InviteReferral} options={{ headerShown: false }} />
          <Stack.Screen name='TrackReferral' component={TrackReferral} options={{ headerShown: false }} />
          <Stack.Screen name='EnterEmail' component={RecoveryEmail} options={{ headerShown: false }} />
          <Stack.Screen name='BotLoading' component={BotLoading} options={{ headerShown: false }} />
          <Stack.Screen name='ChatBot' component={ChatBot} options={{ headerShown: false }} />
          <Stack.Screen name='LiveChat' component={LiveChat} options={{ headerShown: false }} />
          <Stack.Screen name='FacialIdToggle' component={FacialIdToggle} options={{ headerShown: false }} />
          <Stack.Screen name='BiometricToggle' component={BiometricToggle} options={{ headerShown: false }} />
          <Stack.Screen name='CustomerServiceCenter' component={CustomerServiceCenter} options={{ headerShown: false }} />
          <Stack.Screen name='HelpAndSupport' component={HelpAndSupport} options={{ headerShown: false }} />
          <Stack.Screen name='PinSettings' component={PinSettings} options={{ headerShown: false }} />
          <Stack.Screen name='PinPasswordScreen' component={PinPasswordScreen} options={{ headerShown: false }} />
          <Stack.Screen name='CreatePinScreen' component={CreatePinScreen} options={{ headerShown: false }} />
          <Stack.Screen name='ConfirmPinScreen' component={ConfirmPinScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
        <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
      </NavigationContainer>
    </AppProvider>
  );
}