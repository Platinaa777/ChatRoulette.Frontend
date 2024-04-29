import api from "../api";

export class AvatarService {
    static async changeAvatar(picture) {
        try {
            const response = await api.post("avatar/change-avatar", {picture: picture}, {withCredentials: true});
            return response.data;
        } catch (error) {
            console.error('Error uploading avatar:', error);
            throw error;
        }
    }
}