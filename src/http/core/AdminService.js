import api from '../api'

export class AdminService {
    static async addFeedback(fromEmail, report) {
        return api.post("/feedback/add", {FromEmail: fromEmail, Content: report}, {withCredentials: true})
    }

    static async getFeedback(n) {
        return api.get(`/feedback/${n}`, {}, {withCredentials: true})
    }

    static async markFeedbackAsHandled(id) {
        return api.post(`/feedback/${id}`, {}, {withCredentials: true})
    }

    static async addComplaint(senderEmail, violatorEmail, complaintType, content) {
        let formData = {
            senderEmail: senderEmail,
            possibleViolatorEmail: violatorEmail,
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
        return api.put('/complaint/accept', {id: id, DurationMinutes: 5}, {withCredentials: true})
    }

    static async rejectComplaint(id) {
        return api.put('/complaint/reject', {ComplaintId: id}, {withCredentials: true})
    }
}