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

export default api