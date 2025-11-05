import { useParams, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { Text } from "../../components/common/Text"
import { colors } from "../../styles/colors"

export function NoticeDetail() {
    const dummyNotices = Array.from({ length: 47 }, (_, i) => ({
        id: i + 1,
        title: "어짜피 텍스트 들어가면 되자나. 너 정말 으심되.",
        date: "2025-11-05",
        content: `이거 공지예용요용요용요요용ㅇ이거 공지예용요용요용요요용ㅇ이거 공지예용요용요용요요용ㅇ이거 공지예용요용요용요요용ㅇ
이거 공지예용요용요용요요용ㅇ이거 공지예용요용요용요요용ㅇ이거 공지예용요용요용요요용ㅇ`,
    }))

    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const notice = dummyNotices.find((n) => n.id === Number(id))

    if (!notice) {
        return (
            <Container>
                <Text font="TitleSmall" color="Black">
                    존재하지 않는 공지입니다.
                </Text>
            </Container>
        )
    }

    return (
        <Container>
            <Text font="TitleMedium" color="Black">
                {notice.title}
            </Text>

            <DateText font="BodySmall" color="Gray600">
                {notice.date}
            </DateText>

            <Divider />

            <Content font="BodyMedium" color="Black">
                {notice.content}
            </Content>
        </Container>
    )
}

const Container = styled.div`
    max-width: 900px;
    width: 100%;
    margin: 100px auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0 16px;
    box-sizing: border-box;

    @media (max-width: 768px) {
        margin: 70px auto;
        padding: 0 12px;
    }
`

const DateText = styled(Text)`
    margin-top: -10px;
`

const Divider = styled.hr`
    border: none;
    border-top: 1px solid ${colors.Gray200};
    margin: 8px 0 12px 0;
`

const Content = styled(Text)`
    white-space: pre-wrap;
    line-height: 1.8;
`

const BackButton = styled.button`
    margin-top: 40px;
    align-self: flex-end;
    background-color: ${colors.Gray100};
    color: ${colors.Gray800};
    border: none;
    border-radius: 6px;
    padding: 8px 12px;
    font-size: 14px;
    cursor: pointer;
    transition: 0.2s ease;

    &:hover {
        background-color: ${colors.Gray200};
    }
`
