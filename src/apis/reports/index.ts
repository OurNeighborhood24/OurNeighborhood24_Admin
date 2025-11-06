import { AxiosError } from "axios"
import { instance } from ".."
import {
    Category,
    ReportResponse,
    ReportItem,
    State,
    CommentResponse,
} from "./type"
import { tempCookie } from "../../utils/tempCookie"

export default class ReportsService {
    static async getCategoreis(): Promise<Category[]> {
        try {
            const response = await instance.get<Category[]>(
                "/reports/categories"
            )
            return response.data
        } catch (error) {
            throw new Error("지역정보 가져오기 실패")
        }
    }

    static async getReport(): Promise<ReportResponse[]> {
        try {
            const response = await instance.get<ReportResponse[]>("/reports")
            return response.data
        } catch (error) {
            throw new Error("신고 내역 가져오기 실패")
        }
    }

    static async patchState(report_id: number, data: State): Promise<number> {
        try {
            const accessToken = tempCookie.getAccessToken()

            const response = await instance.patch<ReportItem>(
                `/reports/${report_id}/state`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            )
            return response.status
        } catch (error) {
            if (error instanceof AxiosError)
                return error.response?.status ?? 500
            return 500
        }
    }

    static async comment(report_id: number, data: Comment): Promise<number> {
        try {
            const accessToken = tempCookie.getAccessToken()

            const response = await instance.post<CommentResponse>(
                `/reports/${report_id}/answer`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            )
            return response.status
        } catch (error) {
            if (error instanceof AxiosError)
                return error.response?.status ?? 500
            return 500
        }
    }

    static async getCommentedReports(): Promise<CommentResponse[]> {
        try {
            const accessToken = tempCookie.getAccessToken()
            const response = await instance.get<CommentResponse[]>(
                "/reports/answers",
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            )
            return response.data
        } catch (error) {
            throw new Error("데이터 조회에 실패했습니다")
        }
    }
}
