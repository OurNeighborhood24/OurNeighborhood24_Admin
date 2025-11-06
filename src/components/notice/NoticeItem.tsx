import React from "react"
import styled from "styled-components"

export interface Notice {
    id: number
    title: string
    created_at: string
}

interface Props {
    notice: Notice
    onClick?: () => void
}

export const NoticeItem: React.FC<Props> = ({ notice, onClick }) => (
    <Item onClick={onClick}>
        <Title>{notice.title}</Title>
        <Date>{notice.created_at}</Date>
    </Item>
)

const Item = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 0;
    border-bottom: 1px solid #f2f2f2;
    cursor: pointer;
    transition: background 0.15s ease;
    width: 100%;

    &:hover {
        background-color: #fafafa;
    }

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
    }
`

const Title = styled.p`
    font-size: 15px;
    color: #222;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
    max-width: calc(100% - 100px);

    @media (max-width: 768px) {
        white-space: normal;
        font-size: 14px;
        max-width: 100%;
    }
`

const Date = styled.p`
    font-size: 13px;
    color: #888;
    flex-shrink: 0;

    @media (max-width: 768px) {
        font-size: 12px;
    }
`
