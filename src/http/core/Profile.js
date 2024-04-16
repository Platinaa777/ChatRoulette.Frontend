import api from "../api";

export class ProfileService {

    static async getProfile(email) {
        return api.get("/profile/get-user-info", email);
    }

    static async changeUsername(newUsername) {
        return api.put("/profile/change-user-nickname", { newUsername })
    }

    static async getTopUsers(number) {
        return api.get(`/profile/get-top-users/${number}`);
    }
}