import api from "../api";

export class ReportService {
    static async addReport(fromEmail, report) {
        console.log({FromEmail: fromEmail, Content: report})
        return api.post("/feedback/add", {FromEmail: fromEmail, Content: report}, {withCredentials: true})
    }

    static async getReports(n) {
        return api.get(`/feedback/${n}`, {}, {withCredentials: true})
    }
}