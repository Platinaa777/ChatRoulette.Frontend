import api from "../api";

export class AvatarService {
    static async changeAvatar(picture) {

        // console.log('HELLOOOOOO')
        // console.log(picture)
        const formFile = new FormData();
        formFile.append('formFile', picture);

        console.log(formFile.file)

        return await api.post("avatar/change-avatar", {File: formFile}, {
            headers: {
                "Content-Type": "multipart/form-data",
            }});
    }
}