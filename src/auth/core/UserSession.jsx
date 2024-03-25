import { makeAutoObservable } from "mobx"
import {Auth} from './Auth'
import axios from "axios"
import { URL } from "../http/api"


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
            var response = await Auth.login(email, password)
            localStorage.setItem('access-token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    async registrate(data) {
        try {
            var response = await Auth.register(data)
            console.log(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    async logout() {
        try {
            const response = await Auth.logout()
            localStorage.removeItem('access-token');
            this.setAuth(false)
            this.setUser({})
        } catch (e) {
            console.log(e.response)
        } finally {
            localStorage.removeItem('access-token');
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
            this.setAuth(true)
            this.setUser(response.data)
        } catch (e) {
            console.log(e.response)            
        }
    }
}