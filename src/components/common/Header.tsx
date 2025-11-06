import { useEffect, useState } from "react"
import { HeaderLogined } from "./Header/headerLogined"
import { HeaderNotLogined } from "./Header/headerNotLogined"
import { tempCookie } from "../../utils/tempCookie"

export function Header() {
    const [isLogin, setIsLogin] = useState<boolean>(false)

    useEffect(() => {
        const checkLogin = async () => {
            if (tempCookie.getAccessToken()) {
                setIsLogin(true)
            } else {
                setIsLogin(false)
                tempCookie.clearTokens()
            }
        }
    }, [])

    return <>{isLogin ? <HeaderLogined /> : <HeaderNotLogined />}</>
}
