import { ComponentProps, useState } from "react"
import styled from "styled-components"
import { Text } from "./Text"
import { colors } from "../../styles/colors"
import { HiEye, HiEyeOff } from "react-icons/hi"

type Props = ComponentProps<"input"> & {
    label?: string
}

export const Input = ({ label, type = "text", style, ...props }: Props) => {
    const [passShow, setPassShow] = useState<boolean>(false)

    return (
        <InputFrame style={style}>
            {label && (
                <Text font="LabelMedium" color="Gray800">
                    {label}
                </Text>
            )}
            <InputLabel>
                <InputContent
                    type={
                        type === "password"
                            ? !passShow
                                ? "password"
                                : "text"
                            : type
                    }
                    {...props}
                />
                {type === "password" &&
                    (passShow ? (
                        <div
                            style={{
                                color: colors.Gray600,
                                cursor: "pointer",
                                userSelect: "none",
                            }}
                            onClick={() => setPassShow(false)}
                        >
                            <HiEye
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                                size={20}
                            />
                        </div>
                    ) : (
                        <div
                            style={{
                                color: colors.Gray600,
                                cursor: "pointer",
                                userSelect: "none",
                            }}
                            onClick={() => setPassShow(true)}
                        >
                            <HiEyeOff
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                                size={20}
                            />
                        </div>
                    ))}
            </InputLabel>
        </InputFrame>
    )
}

const InputContent = styled.input`
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    color: black;
    width: 100%;
    border: none;
    background: none;

    &:focus {
        outline: none;
    }

    &::placeholder {
        color: ${colors.Gray500};
    }
`
const InputLabel = styled.label`
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 16px;
    background-color: ${colors.Gray50};
    border: 1px solid ${colors.Gray100};
    border-radius: 12px;

    &:focus-within {
        border: 1px solid ${colors.Blue500};
    }
`
const InputFrame = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`
