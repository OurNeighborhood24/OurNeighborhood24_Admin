import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { NoticeItem, Notice } from "../../components/notice/NoticeItem"
import { Pagination } from "../../components/common/Pagination"
import { useNavigate } from "react-router-dom"
import NotificationsService from "../../apis/notifications"
import { NoticeItem as NoticeItemType } from "../../apis/notifications/type"

export function Notifications() {
    const [notices, setNotices] = useState<NoticeItemType[]>([])
    const [total, setTotal] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const itemsPerPage = 15

    const fetchNotices = async (page: number) => {
        setLoading(true)
        try {
            const offset = (page - 1) * itemsPerPage
            const response = await NotificationsService.getNotices({
                offset,
                size: itemsPerPage,
            })

            setNotices(response.items)
            setTotal(response.total)
        } catch (err) {
            console.error("공지사항 로드 실패:", err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchNotices(currentPage)
    }, [currentPage])

    const totalPages = Math.ceil(total / itemsPerPage)

    return (
        <Container>
            <Header>
                <Title>공지사항</Title>
                <WriteButton onClick={() => navigate("/notice/write")}>
                    공지 작성하기
                </WriteButton>
            </Header>

            <Divider />

            {loading ? (
                <LoadingText>불러오는 중...</LoadingText>
            ) : (
                <List>
                    {notices.map((n) => (
                        <NoticeItem
                            key={n.notification_id}
                            notice={{
                                id: n.notification_id,
                                title: n.title,
                                created_at: n.created_at.slice(0, 10),
                            }}
                            onClick={() =>
                                navigate(`/notice/${n.notification_id}`)
                            }
                        />
                    ))}
                </List>
            )}

            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
        </Container>
    )
}

const Container = styled.div`
    max-width: 1200px;
    width: 100%;
    margin: 100px auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0 16px;
    box-sizing: border-box;
    overflow-x: hidden;

    @media (max-width: 768px) {
        margin: 70px auto;
        padding: 0 12px;
        gap: 16px;
    }
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
`

const Title = styled.h2`
    font-size: 20px;
    font-weight: 700;
    color: #222;

    @media (max-width: 768px) {
        font-size: 18px;
    }
`

const WriteButton = styled.button`
    background-color: #2f54eb;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 8px 14px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: 0.2s ease;

    &:hover {
        opacity: 0.9;
    }

    @media (max-width: 768px) {
        width: 100%;
        padding: 10px 0;
    }
`

const Divider = styled.hr`
    border: none;
    border-top: 1px solid #eee;
`

const List = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const LoadingText = styled.p`
    text-align: center;
    color: #666;
    margin-top: 30px;
`
