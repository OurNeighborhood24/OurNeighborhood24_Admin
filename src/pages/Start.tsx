import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { tempCookie } from "../utils/tempCookie"

export function Start() {
    const navigate = useNavigate()

    useEffect(() => {
        const accessToken = tempCookie.getAccessToken()

        if (accessToken) {
            navigate("/reports")
        } else {
            navigate("/login")
        }
    })

    return <></>
}
