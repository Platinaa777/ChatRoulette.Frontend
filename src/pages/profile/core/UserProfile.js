import {makeAutoObservable} from "mobx";
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
            let response = await api.post("/profile/get-user-info", email);
            console.log(response);
        } catch (e) {
            console.log(e)
        }
    }
}