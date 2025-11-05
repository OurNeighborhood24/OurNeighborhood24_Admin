// ✅ Reports.tsx
import React, { useState } from "react"
import styled from "styled-components"
import { ReportItem, Report } from "../components/report/ReportItem"
import { Pagination } from "../components/common/Pagination"
import { Dropdown } from "../components/common/Dropdown"

export const Reports: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState("전체")
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    const categories = [
        "전체",
        "교통-불법주차",
        "환경-소음",
        "안전-시설물",
        "기타",
    ]

    const dummy: Report[] = Array.from({ length: 77 }, (_, i) => ({
        id: i + 1,
        title: "불법 주차가 너무 많아요 .............",
        date: "2025-11-05",
        category: "교통-불법주차",
        status:
            i % 4 === 0
                ? "확인"
                : i % 3 === 0
                ? "처리완료"
                : i % 2 === 0
                ? "처리중"
                : "미확인",
    }))

    const filteredReports =
        selectedCategory === "전체"
            ? dummy
            : dummy.filter((r) => r.category === selectedCategory)

    const totalPages = Math.ceil(filteredReports.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedReports = filteredReports.slice(
        startIndex,
        startIndex + itemsPerPage
    )

    return (
        <Container>
            <Header>
                <Title>
                    총 {filteredReports.length.toLocaleString()}개의 신고 내용
                </Title>
                <DropdownWrapper>
                    <Dropdown
                        options={categories}
                        value={selectedCategory}
                        onChange={(v) => {
                            setSelectedCategory(v)
                            setCurrentPage(1)
                        }}
                        placeholder="카테고리 선택"
                    />
                </DropdownWrapper>
            </Header>

            <Divider />

            <List>
                {paginatedReports.map((r) => (
                    <ReportItem key={r.id} report={r} />
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
    width: 100%;
    max-width: 900px;
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
    }
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
`

const Title = styled.p`
    font-size: 16px;
    color: #333;
    font-weight: 500;

    @media (max-width: 768px) {
        font-size: 14px;
    }
`

const DropdownWrapper = styled.div`
    width: 200px;

    @media (max-width: 480px) {
        width: 100%;
    }
`

const Divider = styled.hr`
    border: none;
    border-top: 1px solid #eeeeee;
`

const List = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-x: hidden;
`
