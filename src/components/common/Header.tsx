import { useState } from "react"
import { HeaderLogined } from "./Header/headerLogined"
import { HeaderNotLogined } from "./Header/headerNotLogined"

export function Header() {
    const [logine, setLogin] = useState<boolean>(false)

    return <>{logine ? <HeaderLogined /> : <HeaderNotLogined />}</>
}
