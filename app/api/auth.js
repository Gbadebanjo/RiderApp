import { dashboardClient, authClient, setAuthToken } from './client';

const requestOtp = (email, password, confirm) => authClient.post('request-otp', { email, password, confirm });
const verifyOtp = (email, otp) => authClient.post('verify-otp', { email, otp });
const signUp = (email, firstName, middleName, lastName, otherLangSpoken, dateOfBirth, phone, displayName, deviceInfo, signupLocation, location, gender) => 
    authClient.post('register?type=Individual', { email, firstName, middleName, lastName, otherLangSpoken, dateOfBirth, phone, displayName, deviceInfo, signupLocation, location, gender});
const loginWithPassword = (email, password, deviceInfo, location) => authClient.post('login?loginType=password', { email, password, deviceInfo, location });
const loginWithPassPhrase = (email, passphrase, deviceInfo, location) => authClient.post('login?loginType=passphrase', { email, passphrase, deviceInfo });
const loginWithPincode = (email, pin, deviceInfo, location) => authClient.post('login?loginType=pin', { email, pin, deviceInfo, location });
const fingerprintLogin = (email, bioToken, deviceInfo, location) => authClient.post('login?loginType=fingerprint', { email, bioToken, deviceInfo, location });
const faceIDLogin = (email, bioToken, deviceInfo, location) => authClient.post('login?loginType=faceid', { email, bioToken, deviceInfo, location });


const additionalInfo = (accountDetails) => authClient.put('additional-info', accountDetails);
const createPassphrase = (email, passPhrase) => authClient.post('create/passphrase', {email, passPhrase});
const createPincode = (email, pinCode) => authClient.post('create/pincode', {email, pinCode});
const enableBiometrics = () => authClient.put('enable-biometric');

const fetchUserDetails = () => dashboardClient.get('');
const updateUser = (values) => dashboardClient.put('update', values);
const confirmPassword = (password) => dashboardClient.post('confirm', { password });
const updatePin = (values) => dashboardClient.post('update-security/pin', values);
const updatePassphrase = (value) => dashboardClient.post('update-security/passphrase', value);
const updateAuth = (authType, value) => {
    const endpoint = `update-security/${authType}`;
    return dashboardClient.post(endpoint, { value });
};

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
    fingerprintLogin,
    faceIDLogin,
    updateUser,
    confirmPassword,
    updatePin,
    updatePassphrase,
    updateAuth
}