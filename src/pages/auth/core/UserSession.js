import {makeAutoObservable} from "mobx"
import {Auth} from './Auth'
import axios from "axios"
import {URL} from "../http/api"


export default class UserSession {
    user = {}
    IsAuth = false

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(state) {
        this.IsAuth = state
    }

    setUser(state) {
        this.user = state
    }

    async login(email, password) {
        try {
            let response = await Auth.login(email, password);
            localStorage.setItem('access-token', response.data.accessToken)
            localStorage.setItem('email', response.data.email)
            console.log(response.data)
            this.setAuth(true)
            this.setUser(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    async register(data) {
        try {
            let response = await Auth.register(data)
            console.log(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    async logout() {
        try {
            await Auth.logout()
        } catch (e) {
            console.log(e.response)
        } finally {
            localStorage.removeItem('access-token');
            localStorage.removeItem('email');
            this.setAuth(false)
            this.setUser({})
        }
    }

    async test() {
        try {
            const response = await Auth.test()
            console.log(response.data)
        } catch (e) {
            console.log(e.response)
        }
    }

    async checkAuth() {
        try {
            const response = await axios.post(URL + "/auth/refresh-token", {}, {withCredentials: true})
            localStorage.setItem('access-token', response.data.accessToken)
            localStorage.setItem('email', response.data.email)
            console.log(response.data)
            this.setAuth(true)
            this.setUser(response.data)
        } catch (e) {
            console.log(e.response)
        }
    }
}