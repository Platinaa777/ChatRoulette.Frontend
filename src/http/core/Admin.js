import api from '../api'

export class AdminService {
    static async addFeedback(fromEmail, report) {
        console.log({FromEmail: fromEmail, Content: report})
        return api.post("/feedback/add", {FromEmail: fromEmail, Content: report}, {withCredentials: true})
    }

    static async getFeedback(n) {
        return api.get(`/feedback/${n}`, {}, {withCredentials: true})
    }

    static async add
}