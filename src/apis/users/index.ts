import { AxiosError } from "axios"
import { instance } from ".."
import { UserResponse, UserData, Region, RegionId, User } from "./type"

export default class UserService {
    static async register(data: UserData): Promise<number> {
        try {
            const response = await instance.post<UserResponse>(
                "/users/users/register",
                data
            )
            if (response.status == 201) {
                console.log("회원가입에 성공하였습니다")
            } else {
                console.error("회원가입 요청에 실패하였습니다")
            }
            return response.status
        } catch (error) {
            if (error instanceof AxiosError)
                return error.response?.status ?? 500
            return 500
        }
    }

    static async getRegions(): Promise<Region[]> {
        try {
            const response = await instance.get<Region[]>(
                "/users/users/regions"
            )
            return response.data
        } catch (error) {
            throw new Error("지역정보 가져오기 실패")
        }
    }

    static async getUser(): Promise<UserResponse> {
        try {
            const response = await instance.get<UserResponse>("/users/users")
            return response.data
        } catch (error) {
            throw new Error("유저 가져오기 실패")
        }
    }

    static async patchRegion(data: RegionId): Promise<number> {
        try {
            const response = await instance.patch<User>(
                "/users/users/my/region",
                data
            )
            return response.status
        } catch (error) {
            if (error instanceof AxiosError)
                return error.response?.status ?? 500
            return 500
        }
    }
}
