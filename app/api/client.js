import { create } from 'apisauce';

const authClient = create({
    baseURL: 'https://api-auth.katabenterprises.com/api/auth/rider',
    headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0'
    }
});
const dashboardClient = create({
    baseURL: 'https://api-auth.katabenterprises.com/api/dashboard/rider',
    headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0'
    }
});

// Function to set the authorization token
const setAuthToken = (token) => {
    dashboardClient.setHeader('Authorization', `Bearer ${token}`);
    authClient.setHeader('Authorization', `Bearer ${token}`);
};

export { authClient, dashboardClient, setAuthToken };