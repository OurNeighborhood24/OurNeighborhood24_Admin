import { useState } from "react"
import { HeaderLogined } from "./Header/headerLogined"
import { HeaderNotLogined } from "./Header/headerNotLogined"

export function Header() {
    const [logine, setLogin] = useState<boolean>(true)

    return <>{logine ? <HeaderLogined /> : <HeaderNotLogined />}</>
}
