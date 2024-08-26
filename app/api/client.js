import {create} from 'apisauce';

const apiClient = create({
    baseURL: 'https://api-auth.katabenterprises.com/api/auth/rider',
    headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
})

export default apiClient;