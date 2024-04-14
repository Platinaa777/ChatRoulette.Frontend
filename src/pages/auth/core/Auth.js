import api from "../../../http/api";

export class Auth {

    static async login(email, password) {
        return api.post('/api/auth/login', {email, password})
    }

    static async register(data) {
        return api.post('/api/auth/register', data)
    }

    static async logout() {
        return api.post('/api/auth/logout')
    }

    static async test() {
        return api.get('/api/auth/test')
    }
}