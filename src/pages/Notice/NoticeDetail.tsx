import { useParams, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { Text } from "../../components/common/Text"
import { colors } from "../../styles/colors"
import { useEffect, useState } from "react"
import NotificationsService from "../../apis/notifications"
import { NoticeItem } from "../../apis/notifications/type"

export function NoticeDetail() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const [notice, setNotice] = useState<NoticeItem | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchNotice = async () => {
            if (!id) return
            try {
                const data = await NotificationsService.getNotices({
                    offset: 0,
                    size: 1000,
                })

                const found = data.items.find(
                    (n) => n.notification_id === Number(id)
                )

                if (!found) {
                    setError("해당 공지를 찾을 수 없습니다.")
                } else {
                    setNotice(found)
                }
            } catch (err: any) {
                setError("공지사항을 불러오는 데 실패했습니다.")
            } finally {
                setLoading(false)
            }
        }

        fetchNotice()
    }, [id])

    const formatted = notice?.content.replace(/\\n/g, "\n").replace(/\r/g, "")

    if (loading) {
        return (
            <Container>
                <Text font="BodyMedium" color="Gray600">
                    불러오는 중...
                </Text>
            </Container>
        )
    }

    if (error) {
        return (
            <Container>
                <Text font="TitleSmall" color="Black">
                    {error}
                </Text>
                <BackButton onClick={() => navigate(-1)}>뒤로가기</BackButton>
            </Container>
        )
    }

    if (!notice) {
        return (
            <Container>
                <Text font="TitleSmall" color="Black">
                    존재하지 않는 공지입니다.
                </Text>
                <BackButton onClick={() => navigate(-1)}>뒤로가기</BackButton>
            </Container>
        )
    }

    return (
        <Container>
            <TitleText as={"div"} font="TitleMedium" color="Black">
                {notice.title}
            </TitleText>

            <DateText font="BodySmall" color="Gray600">
                {new Date(notice.created_at).toLocaleDateString("ko-KR")}
            </DateText>

            <Divider />

            <Content font="BodyMedium" color="Black">
                {formatted?.split("\n").map((line, idx, arr) => (
                    <span key={idx}>
                        {line}
                        {idx < arr.length - 1 && <br />}
                    </span>
                ))}
            </Content>
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

const TitleText = styled(Text)`
    && {
        display: block;
        overflow-wrap: break-word;
        word-break: break-all;
        white-space: normal;
        line-height: 1.4;
        font-size: 24px;
        font-weight: 600;
    }
`
