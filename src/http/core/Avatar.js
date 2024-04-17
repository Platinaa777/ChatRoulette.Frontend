import api from "../api";

export class AvatarService {
    static async changeAvatar(picture) {

        return api.put("avatar/change-avatar", { 'formFile': picture }, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true
        });
    }
}