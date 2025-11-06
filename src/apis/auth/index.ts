import { AxiosError } from "axios"
import { instance } from ".."
import { LoginData, LoginResponse } from "./type"
import { tempCookie } from "../../utils/tempCookie"

export default class AuthService {
    static async login(data: LoginData): Promise<number> {
        try {
            const response = await instance.post<LoginResponse>(
                "/auth/login",
                data
            )
            if (response.data.access_token) {
                tempCookie.setAccessToken(response.data.access_token)
            } else {
                console.error("토큰이 반환되지 않았습니다")
            }
            return response.status
        } catch (error) {
            if (error instanceof AxiosError)
                return error.response?.status ?? 500
            return 500
        }
    }

    static async logout(): Promise<number> {
        try {
            const response = await instance.delete("/auth/logout")
            tempCookie.clearTokens()
            return response.status
        } catch (error) {
            if (error instanceof AxiosError)
                return error.response?.status ?? 500
            return 500
        }
    }
}
