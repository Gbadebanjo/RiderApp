import client from './client';

const getOtp = (email) => client.get(`send-otp/${email}`);
const verifyOtp = (email, otp) => client.post('verify-otp', {email, otp });
const setPassword = (email, password) => client.post('signup', {email, password});
const loginWithPassword = (email, password, loginMethod) => client.post('login', {email, password, loginMethod});

export default {
    getOtp,
    verifyOtp,
    setPassword,
    loginWithPassword
}