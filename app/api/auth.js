import client from './client';

const getOtp = (email) => client.get(`send-otp/${email}`);
const verifyOtp = (email, otp) => client.post('verify-otp', {email, otp });
const setPassword = (email, password) => client.post('signup', {email, password});
const loginWithPassword = (email, password, loginMethod) => client.post('login', {email, password, loginMethod});
const additionalInfo = (accountDetails) => client.put('additional-info', accountDetails);
const createPassphrase = (email, passPhrase) => client.post('create/passphrase', {email, passPhrase});
const createPincode = (email, pinCode) => client.post('create/pincode', {email, pinCode});

export default {
    getOtp,
    verifyOtp,
    setPassword,
    loginWithPassword,
    additionalInfo,
    createPassphrase,
    createPincode
}