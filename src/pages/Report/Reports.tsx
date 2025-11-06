import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { ReportItem } from "../../components/report/ReportItem"
import { Pagination } from "../../components/common/Pagination"
import { Dropdown } from "../../components/common/Dropdown"
import { useNavigate } from "react-router-dom"
import ReportsService from "../../apis/reports"

export const Reports: React.FC = () => {
    const [categories, setCategories] = useState<string[]>(["전체"])
    const [selectedCategory, setSelectedCategory] = useState("전체")
    const [reports, setReports] = useState<any[]>([])
    const [total, setTotal] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const itemsPerPage = 15
    const navigate = useNavigate()

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await ReportsService.getCategoreis()
                const names = data.map((c) => c.category_name)
                setCategories(["전체", ...names])
            } catch (err) {
                console.error("카테고리 로드 실패:", err)
            }
        }
        fetchCategories()
    }, [])

    useEffect(() => {
        const fetchReports = async () => {
            setLoading(true)
            try {
                const offset = (currentPage - 1) * itemsPerPage
                const response = await ReportsService.getReport({
                    offset,
                    size: itemsPerPage,
                })

                setReports(response.items)
                setTotal(response.total)
            } catch (err) {
                console.error("신고 내역 로드 실패:", err)
            } finally {
                setLoading(false)
            }
        }
        fetchReports()
    }, [currentPage])

    const filteredReports =
        selectedCategory === "전체"
            ? reports
            : reports.filter(
                  (r) => r.category.category_name === selectedCategory
              )

    const totalPages = Math.ceil(total / itemsPerPage)

    return (
        <Container>
            <Header>
                <Title>총 {total.toLocaleString()}개의 신고 내용</Title>
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

            {loading ? (
                <LoadingText>불러오는 중...</LoadingText>
            ) : (
                <List>
                    {filteredReports.map((r) => (
                        <ReportItem
                            key={r.report_id}
                            report={{
                                id: r.report_id,
                                title: r.title,
                                date: r.created_at.slice(0, 10),
                                category: r.category.category_name,
                                status:
                                    r.state == "PENDING"
                                        ? "미확인"
                                        : r.state == "CHECKED"
                                        ? "확인"
                                        : r.state == "PROCCESSING"
                                        ? "처리중"
                                        : "처리완료",
                            }}
                            onClick={() => navigate(`/report/${r.report_id}`)}
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
    width: 100%;
    max-width: 1200px;
    margin: 100px auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0 16px;
    box-sizing: border-box;
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
`

const DropdownWrapper = styled.div`
    width: 240px;
`

const Divider = styled.hr`
    border: none;
    border-top: 1px solid #eeeeee;
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
