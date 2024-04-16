import { makeAutoObservable } from "mobx";
import api from "../../../http/api";

export default class UserProfile {
    user = {}
    profileImg = null

    constructor() {
        makeAutoObservable(this)
    }

    setUser(state) {
        this.user = state;
    }

    setProfileImg(state) {
        this.profileImg = state;
    }

    async getProfile(email) {
        try {
            let response = await api.get("/profile/get-user-info", email);
            console.log(response)
            this.setUser(response.data.value)
        } catch (e) {
            console.log(e)
        }
    }

    async changeUsername(newUsername) {
        try {
            console.log(newUsername)
            let response = await api.put("/profile/change-user-nickname", { newUsername })
            console.log(response)
            this.getProfile(this.user.email)
        } catch (e) {
            console.log(e)
        }
    }
}