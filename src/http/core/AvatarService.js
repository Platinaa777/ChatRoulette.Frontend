import api from "../api";

export class AvatarService {
    static async changeAvatar(picture) {
        return await api.post("avatar/change-avatar", {Picture: picture}, {withCredentials: true});
    }
}