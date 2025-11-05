import { ComponentProps } from "react"
import { colors, colorsKeyOfType } from "../../styles/colors"
import { Fonts, fontsKeyOfType } from "../../styles/texts"

type Props = ComponentProps<"span"> & {
    font?: fontsKeyOfType
    color?: colorsKeyOfType
}

export const Text = ({
    font = "BodyMedium",
    color = "Black",
    style,
    children,
    ...props
}: Props) => {
    return (
        <span style={{ ...Fonts[font], color: colors[color], ...style }}>
            {children}
        </span>
    )
}
