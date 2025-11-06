export interface UserData extends RegionId {
    username: string
    password: string
    role: "ADMIN"
}

export interface UserResponse {
    message: string
    user: User
}

export interface User {
    user_id: number
    role: string
    region: Region
}

export interface Region extends RegionId {
    region_code: number
    region_name: string
}

export interface RegionId {
    region_id: number
}
