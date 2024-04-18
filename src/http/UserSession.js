import { makeAutoObservable } from "mobx"
import { Auth } from './core/Auth'
import axios from "axios"
import { REFRESH_TOKEN_URL } from "../static/Urls";
import { ProfileService } from "./core/Profile";
import { AvatarService } from "./core/Avatar";
import { FriendService } from "./core/Friend";

export class UserSession {
    user = {}
    profile = {}
    IsAuth = false
    IsAdmin = false

    constructor() {
        makeAutoObservable(this)
    }

    setUser(state) {
        this.user = state
    }

    setAuth(state) {
        this.IsAuth = state
    }

    setProfile(state) {
        this.profile = state
    }

    setAdmin(state) {
        this.IsAdmin = state
    }

    login = async (email, password) => {
        let result = {}
        await Auth.login(email, password).then(async (response) => {
            localStorage.setItem('access-token', response.data.value.accessToken)
            localStorage.setItem('email', response.data.value.email)
            this.setAuth(true)
            this.setUser(response.data.value)
            console.log('Login success', response.data)
            result = response.data
        }).catch(err => {
            console.log('Login failed', err.response)
            result = err.response
        })
        await this.getProfile()
        return result
    }

    register = async (formData) => {
        let result = {}
        await Auth.register(formData).then(response => {
            result = response.data
            //localStorage.setItem('access-token', response.data.value.accessToken)
            //localStorage.setItem('email', response.data.value.email)
            console.log('Register success', response.data)
        }).catch(err => {
            console.log('Register failed', err.response)
            result = err.response
        })
        return result
    }

    logout = async () => {
        await Auth.logout().then(response =>
            console.log('Logout success', response.data)
        ).catch(err =>
            console.log('Logout fail', err.data)
        ).finally(() => {
            localStorage.removeItem('access-token');
            localStorage.removeItem('email');
            this.setAuth(false)
            this.setUser({})
            this.setProfile({})
            console.log('Storage cleared')
        })
    }

    test = async () => {
        await Auth.test().then(response => console.log(response.data)).catch(err => console.log(err.data))
    }

    checkAuth = async () => {
        await axios.post(REFRESH_TOKEN_URL, {}, { withCredentials: true }).then(response => {
            localStorage.setItem('access-token', response.data.accessToken)
            localStorage.setItem('email', response.data.email)
            this.setAuth(true)
            this.setUser(response.data)
            console.log('checkAuth success', response.data)
        }).catch(err => console.log('checkAuth fail', err.data))
    }

    getProfile = async () => {
        await ProfileService.getProfile().then(response => {
            this.setProfile(response.data.value)
            console.log('getProfile success', response.data)
        }).catch(err => {
            console.log('getProfile fail', err)
            this.setProfile({})
        })
        await this.getAuthInfo()
    }

    getAuthInfo = async () => {
        await Auth.getInfo().then(response => {
            this.setAdmin(response.data === 'Admin')
            console.log('getAuthInfo success', response.data)
        }).catch(err => console.log('getAuthInfo fail', err.data))
    }

    changeUsername = async (newUsername) => {
        await ProfileService.changeUsername(newUsername).then(response => {
            this.setProfile({ ...this.profile, userName: newUsername })
            console.log('changeUsername success', response.data)
        }).catch(err => console.log('changeUsername fail', err.data))
    }

    changeAvatar = async (newAvatar) => {
        await AvatarService.changeAvatar(newAvatar).then(response => {
            this.setProfile({ ...this.profile, avatar: newAvatar })
            console.log(this.profile)
            console.log('changeAvatar success', response.data)
        }).catch(err => console.log('changeAvatar fail', err.data))
    }

    getTopUsers = async () => {
        let result = []
        await ProfileService.getTopUsers(5).then(response => {
            result = [...response.data.value]
            console.log('getTopUsers success', result)
        }).catch(err => console.log('getTopUsers fail', err.data))
        return result
    }

    getRecentUsers = async () => {
        let result = []
        await ProfileService.getRecentPeers().then(response => {
            result = [...response.data.value]
            console.log('getRecentUsers success', result)
        }).catch(err => console.log('getRecentUsers fail', err.response))
        return result
    }

}

/*
async getRecentUsers() {
    try {
        let response = await ProfileService.getRecentPeers(5);
        console.log(response.data.value);
        return response.data.value;
    } catch (err) {
        console.log(err)
    }
}*/