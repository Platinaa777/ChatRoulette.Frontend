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
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {

            const response = await axios.post(REFRESH_TOKEN_URL, {}, {
                headers: {
                    'refresh-token' : getRefreshTokenFromCookie('refresh-token'),
                }
            })

            console.log('refresh-token-response SUCCESS', response)
            setCookie('refresh-token', response.data.value.refreshToken, 180)
            localStorage.setItem('access-token', response.data.accessToken);
            return api.request(originalRequest);
        } catch (e) {
            console.log('NOT AUTHORIZED', e)
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

const setCookie = async (name, value, hoursToExpire) => {
    var expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + (hoursToExpire * 60 * 60 * 1000));
    var expires = "expires=" + expirationDate.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

export default api;