import api from "../api";

export class Auth {

    static async login(email, password) {
        return api.post('/auth/login', {email, password})
    }

    static async register(data) {
        return api.post('/auth/register', data)
    }

    static async logout() {
        return api.delete('/auth/logout')
    }

    static async test() {
        return api.get('/auth/test')
    }

    static async getInfo() {
        return api.get('/auth/info')
    }
}