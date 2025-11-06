import { AxiosError } from "axios"
import { instance } from ".."
import { Notice, NoticeList, NoticeResponse } from "./type"
import { tempCookie } from "../../utils/tempCookie"

export default class NotificationsService {
    static async postNotice(data: Notice): Promise<number> {
        try {
            const accessToken = tempCookie.getAccessToken()

            const response = await instance.post<NoticeResponse>(
                "/notifications",
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

    static async getNotices(): Promise<NoticeList[]> {
        try {
            const response = await instance.get<NoticeList[]>("/notifications")
            return response.data
        } catch (error) {
            throw new Error("데이터 조회에 실패했습니다")
        }
    }

    static async editNotice(
        notification_id: number,
        data: Notice
    ): Promise<number> {
        try {
            const accessToken = tempCookie.getAccessToken()

            const response = await instance.post<NoticeResponse>(
                `/notifications/${notification_id}`,
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

    static async deleteNotice(notification_id: number): Promise<number> {
        try {
            const accessToken = tempCookie.getAccessToken()

            const response = await instance.delete(
                `/notifications/${notification_id}`,
                { headers: { Authorization: `Bearer ${accessToken}` } }
            )
            return response.status
        } catch (error) {
            if (error instanceof AxiosError)
                return error.response?.status ?? 500
            return 500
        }
    }
}
