import api from "../api";

export class AvatarService {
    static async changeAvatar(picture) {
        try {
            const formData = new FormData();
            console.log(picture)
            formData.append('req', picture);

            const response = await api.post("avatar/change-avatar", {formData}, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error uploading avatar:', error);
            throw error;
        }
    }
}