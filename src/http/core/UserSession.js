import {makeAutoObservable} from "mobx"
import {Auth} from './Auth'
import axios from "axios"
import {REFRESH_TOKEN_URL} from "../../static/Urls";
import { ProfileService } from "./Profile";
import { AvatarService } from "./Avatar";

export default class UserSession {
    user = {}
    profile = {}
    IsAuth = false
    IsAdmin = false

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(state) {
        this.IsAuth = state
    }

    setAdmin(state) {
        this.IsAdmin = state
    }

    setUser(state) {
        this.user = state
    }

    setProfile(state) {
        this.profile = state
    }

    async login(email, password) {
        try {
            let response = await Auth.login(email, password);
            localStorage.setItem('access-token', response.data.value.accessToken)
            localStorage.setItem('email', response.data.value.email)
            this.setAuth(true)
            this.setUser(response.data)
            this.getProfile();
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
            this.setAdmin(false)
            this.setUser({})
            this.setProfile({})
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

    async getInfo() {
        Auth.getInfo().then(response => this.setAdmin(response.data === 'Admin')).catch(err => console.log(err))
    }

    async getProfile() {
        ProfileService.getProfile().then(response => {
            this.setProfile(response.data.value)
        }).catch(err => console.log(err))
    }

    async changeUsername(newUsername) {
        try {
            let response = await ProfileService.changeUsername(newUsername)
            console.log(response)
            await this.getProfile()
        } catch (e) {
            console.log(e)
        }
    }

    async changeAvatar(picture) {
        try {
            let response = await AvatarService.changeAvatar(picture)
            console.log("success", response.data)
        } catch(e) {
            console.log(e)
        }
    }

    async getTopUsers() {
        try {
            let response = await ProfileService.getTopUsers(5);
            console.log(response);
            return response.data.value;
        } catch (e) {
            console.log(e)
        }
    }

    async getRecentUsers() {
        try {
            let response = await ProfileService.getRecentPeers(5);
            console.log(response.data.value);
            return response.data.value;
        } catch (err) {
            console.log(err)
        }
    }
}