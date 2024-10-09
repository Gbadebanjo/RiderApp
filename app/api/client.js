import { create } from 'apisauce';

const authClient = create({
    baseURL: 'https://api-auth.katabenterprises.com/api/auth/rider',
    headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Content-Type': 'application/json'
    }
});
const dashboardClient = create({
    baseURL: 'https://api-auth.katabenterprises.com/api/rider',
    headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Content-Type': 'application/json'
    }
});

// Function to set the authorization token
const setAuthToken = (token) => {
    dashboardClient.setHeader('Authorization', `Bearer ${token}`);
    authClient.setHeader('Authorization', `Bearer ${token}`);
};

export { authClient, dashboardClient, setAuthToken };