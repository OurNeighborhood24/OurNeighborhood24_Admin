import { AxiosError } from "axios"
import { instance } from ".."
import {
    Category,
    ReportResponse,
    ReportItem,
    State,
    CommentResponse,
    GetReports,
    CommentPayload,
    CommentedReport,
} from "./type"
import { tempCookie } from "../../utils/tempCookie"

export default class ReportsService {
    static async getCategoreis(): Promise<Category[]> {
        try {
            const response = await instance.get<Category[]>(
                "/reports/categories"
            )
            return response.data
        } catch {
            throw new Error("지역정보 가져오기 실패")
        }
    }

    static async getReport({
        offset,
        size,
    }: GetReports): Promise<ReportResponse> {
        try {
            const response = await instance.get<ReportResponse>("/reports", {
                params: { offset, size },
            })
            return response.data
        } catch {
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

    static async comment(
        report_id: number,
        data: CommentPayload
    ): Promise<CommentResponse> {
        try {
            const accessToken = tempCookie.getAccessToken()
            const response = await instance.post<CommentResponse>(
                `/reports/${report_id}/answer`,
                data,
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            )
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error(
                    "❌ 댓글 등록 실패:",
                    error.response?.status,
                    error.response?.data
                )
                throw new Error(
                    "댓글 등록 실패 (" + (error.response?.status ?? 500) + ")"
                )
            }
            throw new Error("댓글 등록 중 알 수 없는 오류 발생")
        }
    }

    static async getCommentedReports(): Promise<CommentedReport[]> {
        try {
            const accessToken = tempCookie.getAccessToken()
            if (!accessToken) throw new Error("액세스 토큰이 없습니다.")

            const response = await instance.get<CommentedReport[]>(
                "/reports/answers",
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            )

            console.log("✅ /reports/answers 응답:", response.data)

            if (!Array.isArray(response.data)) {
                throw new Error("응답 형식이 예상과 다릅니다.")
            }

            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error(
                    "❌ 답변 조회 실패:",
                    error.response?.status,
                    error.response?.data
                )
                if (error.response?.status === 401) {
                    throw new Error("인증 실패: 로그인 상태를 확인하세요.")
                }
                if (error.response?.status === 422) {
                    throw new Error("요청 파라미터 오류입니다.")
                }
            }
            throw new Error("데이터 조회에 실패했습니다")
        }
    }
}
