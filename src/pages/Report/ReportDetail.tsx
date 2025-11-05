import React, { useState } from "react"
import styled from "styled-components"
import { useParams } from "react-router-dom"

export const ReportDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const [status, setStatus] = useState<
        "미확인" | "확인" | "처리중" | "처리완료"
    >("미확인")

    const dummy = {
        id,
        title: "불법 주차가 너무 많아요 ..................",
        address: "경북 경주시 보문로 338",
        date: "2025-11-05",
        image: "https://cdn.pixabay.com/photo/2017/01/06/19/15/traffic-1957037_1280.jpg",
        content:
            "여기 불법 주차가 너무 많아서 힘들어요 ㅠㅠㅠㅠ 여기 불법 주차가 너무 많아서 힘들어요 ㅠㅠㅠㅠ 여기 불법 주차가 너무 많아서 힘들어요 ㅠㅠㅠㅠ",
    }

    const statusOrder = ["미확인", "확인", "처리중", "처리완료"] as const

    const handleStatusChange = async () => {
        const currentIndex = statusOrder.indexOf(status)
        const nextStatus = statusOrder[currentIndex + 1] || "처리완료"

        // 신고 상태 전환 로직
        try {
            setStatus(nextStatus)
        } catch (error) {
            console.error("상태 변경 실패:", error)
        }
    }

    return (
        <PageWrapper>
            <Container>
                <Title>{dummy.title}</Title>

                <MetaRow>
                    <Address>{dummy.address}</Address>
                    <Date>{dummy.date}</Date>
                </MetaRow>

                <Divider />

                {dummy.image && <Image src={dummy.image} alt="신고 이미지" />}

                <Content>{dummy.content}</Content>

                <ButtonWrapper>
                    <StatusButton
                        $status={status}
                        onClick={handleStatusChange}
                        disabled={status === "처리완료"}
                    >
                        {status === "미확인"
                            ? "확인하기"
                            : status === "확인"
                            ? "처리 시작"
                            : status === "처리중"
                            ? "처리 완료"
                            : "처리 완료됨"}
                    </StatusButton>
                </ButtonWrapper>
            </Container>
        </PageWrapper>
    )
}

const PageWrapper = styled.div`
    width: 100%;
    overflow-x: hidden; /* ✅ 가로 스크롤 방지 */
`

const Container = styled.div`
    max-width: 800px;
    width: 100%;
    margin: 100px auto;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    box-sizing: border-box;

    @media (max-width: 768px) {
        margin: 70px auto;
        padding: 0 14px;
        gap: 12px;
    }
`

const Title = styled.h1`
    font-size: 22px;
    font-weight: 700;
    color: #111;
    line-height: 1.4;
    word-break: keep-all;
    overflow-wrap: break-word;

    @media (max-width: 768px) {
        font-size: 18px;
    }
`

const MetaRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
`

const Address = styled.p`
    font-size: 14px;
    color: #666;
`

const Date = styled.p`
    font-size: 14px;
    color: #999;
`

const Divider = styled.hr`
    border: none;
    border-top: 1px solid #eaeaea;
`

const Image = styled.img`
    width: 100%;
    border-radius: 12px;
    object-fit: cover;
    max-height: 400px;
    overflow: hidden;

    @media (max-width: 768px) {
        border-radius: 10px;
        max-height: 260px;
    }
`

const Content = styled.p`
    font-size: 15px;
    color: #333;
    line-height: 1.6;
    white-space: pre-wrap;
    overflow-wrap: break-word;

    @media (max-width: 768px) {
        font-size: 14px;
        line-height: 1.5;
    }
`

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 24px;

    @media (max-width: 768px) {
        justify-content: center;
        margin-top: 18px;
    }
`

const StatusButton = styled.button<{ $status: string }>`
    background-color: ${({ $status }) =>
        $status === "미확인"
            ? "#1860f0"
            : $status === "확인"
            ? "#f0a318"
            : $status === "처리중"
            ? "#28a745"
            : "#999"};
    color: white;
    border: none;
    border-radius: 22px;
    padding: 10px 28px;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        opacity: 0.9;
    }

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    @media (max-width: 768px) {
        font-size: 14px;
        padding: 8px 20px;
    }
`
