import api from '../api'

export class AdminService {
    static async addFeedback(fromEmail, report) {
        console.log({FromEmail: fromEmail, Content: report})
        return api.post("/feedback/add", {FromEmail: fromEmail, Content: report}, {withCredentials: true})
    }

    static async getFeedback(n) {
        return api.get(`/feedback/${n}`, {}, {withCredentials: true})
    }

    static async addComplaint(senderEmail, violatorEmail, complaintType, content) {
        let formData = {
            senderEmail: senderEmail,
            violatorEmail: violatorEmail,
            complaintType: complaintType,
            content: content
        }
        console.log(formData)
        return api.post('/complaint/add-complaint', formData, {withCredentials: true})
    }

    static async getComplaints(n) {
        return api.get(`/complaint/${n}`, {}, {withCredentials: true})
    }

    static async acceptComplaint(id) {
        return api.put('/complaint/accept', {id: id}, {withCredentials: true})
    }

    static async rejectComplaint(id) {
        return api.put('/complaint/reject', {id: id}, {withCredentials: true})
    }
}