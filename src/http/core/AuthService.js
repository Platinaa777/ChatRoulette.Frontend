import api from "../api";

export class Auth {

    static async login(email, password) {
        return api.post('/auth/login', { email, password }, { withCredentials: true })
    }

    static async register(data) {
        return api.post('/auth/register', data, { withCredentials: true })
    }

    static async logout() {
        return api.delete('/auth/logout', {}, { withCredentials: true })
    }

    static async test() {
        return api.get('/auth/test', {}, { withCredentials: true })
    }

    static async getInfo() {
        return api.get('/auth/info', {}, { withCredentials: true })
    }
}