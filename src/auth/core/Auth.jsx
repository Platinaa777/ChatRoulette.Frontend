import api from "../http/api";

export default class Auth {

    static async login(email, password) {
        return api.post('/auth/login', {email, password})
    }

    static async register(data) {
        return api.post('/auth/register', data)
    }
}