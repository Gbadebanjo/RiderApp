import { dashboardClient, authClient, setAuthToken } from './client';

const requestOtp = (email, password, confirm) => authClient.post('request-otp', { email, password, confirm });
const verifyOtp = (email, otp) => authClient.post('verify-otp', { email, otp });
const signUp = (email, firstName, lastName, phone, pin, passphrase, confirmPin, displayName, fingerprint, facialId, deviceInfo) => 
    authClient.post('register?type=Individual', { email, firstName, lastName, phone, pin, passphrase, confirmPin, displayName, fingerprint, facialId, deviceInfo });
const loginWithPassword = (email, password, deviceInfo) => authClient.post('login?loginType=password', { email, password, deviceInfo });
const loginWithPassPhrase = (email, passphrase, deviceId) => authClient.post('login?loginType=passphrase', { email, passphrase, deviceId });
const loginWithPincode = (email, pin, deviceInfo) => authClient.post('login?loginType=pin', { email, pin, deviceInfo });


const additionalInfo = (accountDetails) => authClient.put('additional-info', accountDetails);
const createPassphrase = (email, passPhrase) => authClient.post('create/passphrase', {email, passPhrase});
const createPincode = (email, pinCode) => authClient.post('create/pincode', {email, pinCode});
const enableBiometrics = () => authClient.put('enable-biometric');
const biometricsLogin = (biometricToken, loginMethod) => authClient.post('biometric-login', { biometricToken, loginMethod });

const fetchUserDetails = () => dashboardClient.get('');

export default {
    requestOtp,
    verifyOtp,
    signUp,
    loginWithPassword,
    loginWithPassPhrase,
    loginWithPincode,
    additionalInfo,
    createPassphrase,
    createPincode,
    fetchUserDetails,
    setAuthToken,
    enableBiometrics,
    biometricsLogin
}