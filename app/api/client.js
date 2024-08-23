import {create} from 'apisauce';

const apiClient = create({
    baseURL: 'https://api-auth.katabenterprises.com/api/auth/rider'
})

export default apiClient;