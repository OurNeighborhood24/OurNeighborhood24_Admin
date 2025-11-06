import { useState } from "react"
import styled from "styled-components"
import { NoticeItem, Notice } from "../../components/notice/NoticeItem"
import { Pagination } from "../../components/common/Pagination"
import { useNavigate } from "react-router-dom"

export function Notifications() {
    const [currentPage, setCurrentPage] = useState(1)
    const navigate = useNavigate()
    const itemsPerPage = 15

    // 더미 데이터
    const dummy: Notice[] = Array.from({ length: 47 }, (_, i) => ({
        id: i + 1,
        title: "어짜피 텍스트 들어가면 되자나. 너 정말 으심되.",
        date: "2025-11-05",
    }))

    const totalPages = Math.ceil(dummy.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginated = dummy.slice(startIndex, startIndex + itemsPerPage)

    return (
        <Container>
            <Header>
                <Title>공지사항</Title>
                <WriteButton onClick={() => navigate("/notice/write")}>
                    공지 작성하기
                </WriteButton>
            </Header>

            <Divider />

            <List>
                {paginated.map((n) => (
                    <NoticeItem
                        key={n.id}
                        notice={n}
                        onClick={() => navigate(`/notice/${n.id}`)}
                    />
                ))}
            </List>

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
