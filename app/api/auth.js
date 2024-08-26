import { dashboardClient, authClient, setAuthToken } from './client';

const getOtp = (email) => authClient.get(`send-otp/${email}`);
const verifyOtp = (email, otp) => authClient.post('verify-otp', { email, otp });
const setPassword = (email, password) => authClient.post('signup', { email, password });
const loginWithPassword = (email, password, loginMethod) => authClient.post('login', { email, password, loginMethod });
const fetchUserDetails = () => dashboardClient.get('dashboard/rider/details');

export default {
    getOtp,
    verifyOtp,
    setPassword,
    loginWithPassword,
    setAuthToken
}