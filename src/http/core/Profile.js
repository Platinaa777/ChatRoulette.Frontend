import api from "../api";

export class ProfileService {

    static async getProfile() {
        return api.get("/profile/get-user-info", {}, {withCredentials: true});
    }

    static async changeUsername(newUsername) {
        return api.put("/profile/change-username", { newUsername }, {withCredentials: true})
    }

    static async getTopUsers(number) {
        return api.get(`/profile/get-top-users/${number}`, {}, {withCredentials: true});
    }

    static async getRecentPeers() {
        return api.get("/profile/get-recent-users", {}, {withCredentials: true})
    }
}