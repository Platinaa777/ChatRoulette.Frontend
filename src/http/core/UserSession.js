import {makeAutoObservable} from "mobx"
import {Auth} from './Auth'
import axios from "axios"
import {REFRESH_TOKEN_URL} from "../../static/Urls";
import { ProfileService } from "./Profile";

export default class UserSession {
    user = {}
    IsAuth = false
    profileImg = null

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
            localStorage.setItem('access-token', response.data.value.accessToken)
            localStorage.setItem('email', response.data.value.email)
            console.log(response.data)
            this.setAuth(true)
            this.setUser(response.data)
            return response.data
        } catch (e) {
            console.log(e.response)
            return e.response
        }
    }

    async register(data) {
        try {
            let response = await Auth.register(data)
            console.log(response)
            //localStorage.setItem('access-token', response.data.value.accessToken)
            //localStorage.setItem('email', response.data.value.email)
            return response
        } catch (e) {
            console.log(e)
            return e.response
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
            this.setProfileImg(null)
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
            const response = await axios.post(REFRESH_TOKEN_URL, {}, {withCredentials: true})
            localStorage.setItem('access-token', response.data.accessToken)
            localStorage.setItem('email', response.data.email)
            console.log(response.data)
            this.setAuth(true)
            this.setUser(response.data)
        } catch (e) {
            console.log(e.response)
        }
    }

    setProfileImg(state) {
        this.profileImg = state;
    }

    async getProfile(email) {
        try {
            let response = await ProfileService.getProfile(email);
            console.log(response)
            this.setUser(response.data.value)
        } catch (e) {
            console.error(e)
        }
    }

    async changeUsername(newUsername) {
        try {
            let response = await ProfileService.changeUsername(newUsername)
            console.log(response)
            this.getProfile(this.user.email)
        } catch (e) {
            console.error(e)
        }
    }

    async getTopUsers() {
        try {
            let response = await ProfileService.getTopUsers(5);
            console.log(response);
            return response.data.value;
        } catch (e) {
            console.error(e)
        }
    }
}