import api from "../api";

export class FriendService {
    static async addFriendRequest(receiverEmail) {
        return api.post("/friend/add-friend", {NewFriendEmail: receiverEmail}, {withCredentials: true})
    }

    static async acceptInvitationToFriends(receiverEmail) {
        return api.put("friend/accept-invitation-to-friends", {AcceptNewFriendEmail: receiverEmail}, {withCredentials: true})
    }

    static async rejectInvitationToFriends(receiverEmail) {
        return api.put("friend/reject-invitation-to-friends", {RejectPersonEmail: receiverEmail}, {withCredentials: true})
    }

    static async getInvitations() {
        return api.get("friend/get-invitations", {withCredentials: true})
    }
}