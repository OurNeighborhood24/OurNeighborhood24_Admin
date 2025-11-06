import { useEffect, useState } from "react"
import { HeaderLogined } from "./Header/headerLogined"
import { HeaderNotLogined } from "./Header/headerNotLogined"
import { tempCookie } from "../../utils/tempCookie"
import { useLocation } from "react-router-dom"

export function Header() {
    const [isLogin, setIsLogin] = useState<boolean>(false)
    const location = useLocation()

    useEffect(() => {
        const checkLogin = async () => {
            if (tempCookie.getAccessToken()) {
                setIsLogin(true)
            } else {
                setIsLogin(false)
                tempCookie.clearTokens()
            }
        }

        checkLogin()
    }, [location])

    return <>{isLogin ? <HeaderLogined /> : <HeaderNotLogined />}</>
}
