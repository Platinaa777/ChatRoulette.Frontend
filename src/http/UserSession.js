import { makeAutoObservable } from "mobx"
import { Auth } from './core/AuthService'
import axios from "axios"
import { REFRESH_TOKEN_URL } from "../static/Urls";
import { ProfileService } from "./core/ProfileService";
import { AvatarService } from "./core/AvatarService";
import { FriendService } from "./core/FriendService";
import { AdminService } from "./core/AdminService";

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
            this.setAuth(false)
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
            console.log('changeUsername success', response.data)
            this.getProfile()
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
        }).catch(err => {
            console.log('getRecentUsers fail', err.response)
            result = err.response
        })
        return result
    }

    getFriendRequests = async () => {
        let result = []
        await FriendService.getInvitations().then(response => {
            result = [...response.data.value]
            console.log('getFriendRequests success', result)
        }).catch(err => {
            result = err.response
            console.log('getFriendRequests fail', err.response)
        })
        return result
    }

    addFriendRequest = async (receiverEmail) => {
        await FriendService.addFriendRequest(receiverEmail).then(
            response => console.log('addFriend success', response.data)
        ).catch(err => console.log('addFriend fail', err.response))
    }

    acceptFriendRequest = async (email) => {
        await FriendService.acceptInvitationToFriends(email).then(
            response => console.log('acceptFriendRequest success', response.data)
        ).catch(err => console.log('acceptFriendRequest fail', err.response))
    }

    rejectFriendRequest = async (email) => {
        await FriendService.rejectInvitationToFriends(email).then(
            response => console.log('rejectFriendRequest success', response.data)
        ).catch(err => console.log('acceptFriendRequest fail', err.response))
    }

    sendFeedback = async (content) => {
        let result = {}
        await AdminService.addFeedback(this.user.email, content).then(response => {
            console.log('sendFeedback success', response)
            result = response
        }).catch(err => {
            console.log('sendFeedback fail', err.response)
            result = err.response
        })
        return result
    }

    getFeedback = async () => {
        let result = []
        await AdminService.getFeedback(20).then(response => {
            result = [...response.data.value].reverse()
            console.log('getFeedback success', response)
        }).catch(err => console.log('getFeedback fail', err.response))
        return result
    }

    getComplaints = async () => {
        let result = []
        await AdminService.getComplaints(20).then(response => {
            result = [...response.data.value].reverse()
            console.log('getComplaints success', response)
        }).catch(err => console.log('getComplaints fail', err.response))
        return result
    }

    sendComplaint = async (targetEmail, complaintType, content) => {
        let result = {}
        await AdminService.addComplaint(this.user.email, targetEmail, complaintType, content).then(response => {
            console.log('sendFeedback success', response)
            result = response
        }).catch(err => {
            console.log('sendFeedback fail', err.response)
            result = err.response
        })
        return result
    }

    acceptComplaint = async (id) => {
        await AdminService.acceptComplaint(id).then(
            response => console.log('accedptComplaint success', response)
        ).catch(err => console.log('acceptComplaint fail', err.response))
    }

    rejectComplaint = async (id) => {
        await AdminService.rejectComplaint(id).then(
            response => console.log('rejectComplaint success', response)
        ).catch(err => console.log('rejectComplaint fail', err.response))
    }
}