import axios from "axios";
import {BASE_URL, REFRESH_TOKEN_URL} from "../static/Urls";

const api = axios.create({
    withCredentials: true, baseURL: BASE_URL
})

api.interceptors.request.use(cfg => {
    cfg.headers.Authorization = `Bearer ${localStorage.getItem('access-token')}`
    const refreshToken = getRefreshTokenFromCookie('refresh-token');
    console.log(refreshToken)
    cfg.headers['refresh-token'] = refreshToken;
    return cfg
})

api.interceptors.response.use((config) => {
    console.log('default request...')
    return config;
}, async (error) => {
    console.log('retry...')
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const headerData = {
                headers: { 'refresh-token' : getRefreshTokenFromCookie('refresh-token') }
            }

            const response = await axios.post(REFRESH_TOKEN_URL, headerData)
            console.log('refresh-token-response', response)
            localStorage.setItem('access-token', response.data.accessToken);
            return api.request(originalRequest);
        } catch (e) {
            console.log('not authorised', e)
        }
    }
    throw error;
})


const getRefreshTokenFromCookie = (cname) => {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

export default api;