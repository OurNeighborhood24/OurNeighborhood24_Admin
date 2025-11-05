import styled from "styled-components"
import { colors } from "../../styles/colors"

export type ReportStatus = "미확인" | "확인" | "처리중" | "처리완료"

export interface Report {
    id: number
    title: string
    date: string
    category: string
    status: ReportStatus
}

export const ReportItem: React.FC<{ report: Report }> = ({ report }) => (
    <Item>
        <MainInfo>
            <Title>{report.title}</Title>
            <Date>{report.date}</Date>
        </MainInfo>
        <SubInfo>
            <Category>{report.category}</Category>
            <Status status={report.status}>{report.status}</Status>
        </SubInfo>
    </Item>
)

const Item = styled.div`
    display: flex;
    flex-direction: column;
    padding: 12px 0;
    border-bottom: 1px solid #f2f2f2;
    width: 100%;
    overflow-x: hidden;

    @media (min-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
`

const MainInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    @media (min-width: 768px) {
        flex-direction: row;
        align-items: center;
        gap: 8px;
    }
`

const SubInfo = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 16px;

    @media (max-width: 768px) {
        justify-content: flex-start;
        margin-top: 4px;
    }
`

const Title = styled.p`
    font-size: 15px;
    color: #222;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    word-break: break-word;
`

const Date = styled.p`
    font-size: 13px;
    color: #666;
`

const Category = styled.p`
    font-size: 14px;
    color: #888;
`

const Status = styled.p<{ status: ReportStatus }>`
    font-size: 14px;
    font-weight: 600;
    color: ${({ status }) =>
        status === "미확인"
            ? colors.CriticalMain
            : status === "확인"
            ? colors.Black
            : status === "처리중"
            ? colors.Blue500
            : colors.Gray500};
`
