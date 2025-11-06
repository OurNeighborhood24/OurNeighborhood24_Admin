import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useParams, useNavigate } from "react-router-dom"
import ReportsService from "../../apis/reports"
import {
    Answer,
    ReportItem as ApiReportItem,
    CommentedReport,
    CommentResponse,
} from "../../apis/reports/type"

type StatusType = "PENDING" | "CHECK" | "PROCCESING" | "COMPLETE"

const statusOrder: StatusType[] = ["PENDING", "CHECK", "PROCCESING", "COMPLETE"]

export const ReportDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const reportId = Number(id)
    const navigate = useNavigate()

    const [report, setReport] = useState<ApiReportItem | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [status, setStatus] = useState<StatusType>("PENDING")
    const [comments, setComments] = useState<CommentResponse[]>([])
    const [commentText, setCommentText] = useState("")
    const [commentSubmitting, setCommentSubmitting] = useState(false)

    useEffect(() => {
        console.log("✅ useEffect 실행됨, reportId:", reportId)
        let cancelled = false

        if (!reportId) return
        fetchAnswers()
        return () => {
            cancelled = true
        }
    }, [reportId])

    useEffect(() => {
        if (!id || Number.isNaN(reportId)) {
            setError("잘못된 요청입니다.")
            return
        }

        let cancelled = false

        const fetchByPaging = async () => {
            setLoading(true)
            setError(null)

            try {
                const pageSize = 15
                const firstResp = await ReportsService.getReport({
                    offset: 0,
                    size: 1,
                })
                const total = firstResp.total

                for (let offset = 0; offset < total; offset += pageSize) {
                    if (cancelled) return
                    const resp = await ReportsService.getReport({
                        offset,
                        size: pageSize,
                    })
                    const found = resp.items.find(
                        (it) => it.report_id === reportId
                    )
                    if (found) {
                        if (cancelled) return
                        setReport(found)
                        const s = found.state as StatusType
                        setStatus(statusOrder.includes(s) ? s : "PENDING")
                        break
                    }
                }

                if (!report && !cancelled) {
                    if (total > 0) {
                        const allResp = await ReportsService.getReport({
                            offset: 0,
                            size: total,
                        })
                        const found = allResp.items.find(
                            (it) => it.report_id === reportId
                        )
                        if (found) {
                            if (cancelled) return
                            setReport(found)
                            setStatus(found.state as StatusType)
                        } else {
                            if (!cancelled)
                                setError("해당 신고를 찾을 수 없습니다.")
                        }
                    } else {
                        if (!cancelled) setError("신고 데이터가 비어있습니다.")
                    }
                }
            } catch (err) {
                console.error(err)
                if (!cancelled) setError("신고 상세 조회 실패")
            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        fetchByPaging()
        return () => {
            cancelled = true
        }
    }, [id])

    const fetchAnswers = async () => {
        try {
            console.log("📢 fetchAnswers 호출됨")
            const commentedReports: CommentedReport[] =
                await ReportsService.getCommentedReports()

            const found = commentedReports.find(
                (c) => c.report.report_id === reportId
            )

            if (!found || !found.answers) {
                setComments([])
                return
            }

            const ans = found.answers
            if (Array.isArray(ans)) {
                setComments(ans)
            } else {
                setComments([ans])
            }
        } catch (err) {
            console.error("댓글 조회 실패:", err)
        }
    }

    useEffect(() => {
        let cancelled = false

        if (!reportId) return
        fetchAnswers()
        return () => {
            cancelled = true
        }
    }, [reportId])

    const handleStatusChange = async () => {
        if (!report) return
        const currentIndex = statusOrder.indexOf(status)
        const nextStatus = statusOrder[currentIndex + 1] ?? "처리완료"

        try {
            const code = await ReportsService.patchState(report.report_id, {
                state: nextStatus,
            })
            if (code >= 200 && code < 300) {
                setStatus(nextStatus)
                setReport({ ...report, state: nextStatus })
            } else {
                alert("상태 변경 실패: 서버 응답 " + code)
            }
        } catch (err) {
            console.error(err)
            alert("상태 변경 중 오류가 발생했습니다.")
        }
    }

    const handleCommentSubmit = async () => {
        if (!commentText.trim() || !report) return
        setCommentSubmitting(true)
        try {
            const result = await ReportsService.comment(report.report_id, {
                answer: commentText.trim(),
            })
            console.log("🟣 등록 결과:", result)

            if (result) {
                setCommentText("")
                await fetchAnswers()
                alert("댓글이 등록되었습니다.")
            } else {
                alert("댓글 등록 실패 (401 또는 서버 오류)")
            }
        } catch (err) {
            console.error(err)
            alert("댓글 등록 중 오류가 발생했습니다.")
        } finally {
            setCommentSubmitting(false)
        }
    }

    if (loading) return <CenterWrapper>불러오는 중...</CenterWrapper>
    if (error)
        return (
            <Container>
                <ErrorText>{error}</ErrorText>
                <BackButton onClick={() => navigate(-1)}>뒤로가기</BackButton>
            </Container>
        )
    if (!report)
        return (
            <Container>
                <ErrorText>신고 정보를 찾을 수 없습니다.</ErrorText>
                <BackButton onClick={() => navigate(-1)}>뒤로가기</BackButton>
            </Container>
        )

    return (
        <PageWrapper>
            <Container>
                <TopRow>
                    <Title>{report.title}</Title>
                    <SmallMeta>
                        <Category>{report.category.category_name}</Category>
                        <DateText>{report.created_at?.slice(0, 10)}</DateText>
                    </SmallMeta>
                </TopRow>

                <MetaRow>
                    <Address>
                        위도: {report.latitude} / 경도: {report.longitude}
                    </Address>
                </MetaRow>

                <Divider />

                {report.image_url && (
                    <Image src={report.image_url} alt="신고 이미지" />
                )}

                <Content>{report.description}</Content>

                <ButtonWrapper>
                    <StatusButton
                        $status={status}
                        onClick={handleStatusChange}
                        disabled={status === "COMPLETE"}
                    >
                        {status === "PENDING"
                            ? "확인하기"
                            : status === "CHECK"
                            ? "처리 중"
                            : status === "PROCCESING"
                            ? "처리 완료"
                            : "처리 완료"}
                    </StatusButton>
                </ButtonWrapper>

                <Divider />

                <CommentSection>
                    <SectionTitle>관리자 코멘트</SectionTitle>
                    <CommentInputArea>
                        <CommentTextarea
                            placeholder="관리자 답변을 입력하세요..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                        <CommentActions>
                            <SmallNote>
                                현재 상태:{" "}
                                {status == "PENDING"
                                    ? "미확인"
                                    : status == "CHECK"
                                    ? "확인"
                                    : status == "PROCCESING"
                                    ? "처리중"
                                    : "처리완료"}
                            </SmallNote>
                            <CommentButton
                                onClick={handleCommentSubmit}
                                disabled={
                                    commentSubmitting || !commentText.trim()
                                }
                            >
                                {commentSubmitting ? "등록 중..." : "등록"}
                            </CommentButton>
                        </CommentActions>
                    </CommentInputArea>

                    {comments.length > 0 ? (
                        comments.map((c) => (
                            <CommentCard key={c.report_answer_id}>
                                <CommentMeta>
                                    <CommentDate>
                                        {c.created_at.slice(0, 10)}
                                    </CommentDate>
                                    <CommentState>{c.state}</CommentState>
                                </CommentMeta>
                                <CommentBody>{c.answer}</CommentBody>
                            </CommentCard>
                        ))
                    ) : (
                        <NoComments>등록된 코멘트가 없습니다.</NoComments>
                    )}
                </CommentSection>
            </Container>
        </PageWrapper>
    )
}

const PageWrapper = styled.div`
    width: 100%;
    overflow-x: hidden;
`

const Container = styled.div`
    max-width: 1200px;
    width: 100%;
    margin: 80px auto;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    box-sizing: border-box;
`

const CenterWrapper = styled.div`
    width: 100%;
    text-align: center;
    margin-top: 80px;
    color: #666;
`

const TopRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
    flex-wrap: wrap;
`

const Title = styled.h1`
    font-size: 22px;
    font-weight: 700;
    color: #111;
`

const SmallMeta = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    align-items: flex-end;
`

const Category = styled.p`
    font-size: 14px;
    color: #666;
`

const DateText = styled.p`
    font-size: 13px;
    color: #999;
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

const Divider = styled.hr`
    border: none;
    border-top: 1px solid #eaeaea;
`

const Image = styled.img`
    width: 100%;
    border-radius: 12px;
    object-fit: cover;
    max-height: 420px;
    overflow: hidden;
`

const Content = styled.p`
    font-size: 15px;
    color: #333;
    line-height: 1.6;
    white-space: pre-wrap;
`

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 8px;
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
    padding: 10px 22px;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`

const CommentSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`

const SectionTitle = styled.h3`
    margin: 0;
    font-size: 16px;
    color: #222;
`

const CommentInputArea = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`

const CommentTextarea = styled.textarea`
    min-height: 96px;
    resize: vertical;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #e6e6e6;
    font-size: 14px;
    line-height: 1.6;
    outline: none;
    resize: none;
`

const CommentActions = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
`

const CommentButton = styled.button`
    padding: 8px 16px;
    border-radius: 10px;
    background: #1860f0;
    color: white;
    border: none;
    cursor: pointer;
`

const SmallNote = styled.span`
    color: #666;
    font-size: 13px;
`

const NoComments = styled.p`
    color: #888;
    font-size: 14px;
`

const CommentCard = styled.div`
    border: 1px solid #f2f2f2;
    padding: 12px;
    border-radius: 8px;
    background: #fff;
`

const CommentMeta = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    gap: 8px;
`

const CommentDate = styled.span`
    color: #999;
    font-size: 13px;
`

const CommentState = styled.span`
    font-size: 13px;
    color: #666;
`

const CommentBody = styled.div`
    color: #333;
    font-size: 14px;
    white-space: pre-wrap;
`

const ErrorText = styled.p`
    color: #d9534f;
    font-weight: 600;
`

const BackButton = styled.button`
    padding: 8px 12px;
    border-radius: 8px;
    border: 1px solid #eee;
    background: white;
    cursor: pointer;
`
