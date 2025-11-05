import { useState } from "react"
import styled from "styled-components"
import { Text } from "./Text"
import { colors } from "../../styles/colors"
import { HiChevronDown, HiChevronUp } from "react-icons/hi"

type Props = {
    label?: string
    options: string[]
    value?: string
    onChange?: (value: string) => void
    placeholder?: string
}

export function Dropdown({
    label,
    options,
    value,
    onChange,
    placeholder = "선택해주세요",
}: Props) {
    const [open, setOpen] = useState(false)

    const handleSelect = (option: string) => {
        onChange?.(option)
        setOpen(false)
    }

    return (
        <SelectFrame>
            {label && (
                <Text font="LabelMedium" color="Gray800">
                    {label}
                </Text>
            )}

            <DropdownContainer onClick={() => setOpen(!open)} $open={open}>
                <SelectedText $placeholder={!value}>
                    {value || placeholder}
                </SelectedText>
                {open ? (
                    <HiChevronUp size={20} color={colors.Gray600} />
                ) : (
                    <HiChevronDown size={20} color={colors.Gray600} />
                )}
            </DropdownContainer>

            {open && (
                <DropdownList>
                    {options.map((option) => (
                        <DropdownItem
                            key={option}
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </DropdownItem>
                    ))}
                </DropdownList>
            )}
        </SelectFrame>
    )
}

const SelectFrame = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    position: relative;
`

const DropdownContainer = styled.div<{ $open: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background-color: ${colors.Gray50};
    border: 1px solid
        ${({ $open }) => ($open ? colors.Blue500 : colors.Gray100)};
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background-color: ${colors.Gray100};
    }
`

const SelectedText = styled.span<{ $placeholder: boolean }>`
    font-size: 16px;
    color: ${({ $placeholder }) =>
        $placeholder ? colors.Gray500 : colors.Gray800};
`

const DropdownList = styled.ul`
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    width: 100%;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    max-height: 220px;
    overflow-y: auto;
    list-style: none;
    padding: 8px 0;
    margin: 0;
    z-index: 10;

    /* 스크롤바 숨기기 */
    &::-webkit-scrollbar {
        display: none;
    }
`

const DropdownItem = styled.li`
    padding: 14px 16px;
    font-size: 16px;
    color: ${colors.Gray800};
    cursor: pointer;
    transition: background 0.15s ease;

    &:hover {
        background-color: ${colors.Gray50};
    }

    &:active {
        background-color: ${colors.Gray100};
    }
`
