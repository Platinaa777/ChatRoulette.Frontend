import axios from "axios";

export const URL = "http://localhost:8001"

const api = axios.create({
    withCredentials: true,
    baseURL: URL
})

api.interceptors.request.use(cfg => {
    cfg.headers.Authorization = `Bearer ${localStorage.getItem('access-token')}`
    return cfg
})

api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    console.log('retry...')
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.post(`${URL}/auth/refresh-token`, {} , {withCredentials: true})
            localStorage.setItem('access-token', response.data.accessToken);
            return api.request(originalRequest);
        } catch (e) {
            console.log('НЕ АВТОРИЗОВАН')
        }
    }
    throw error;
})

export default api;