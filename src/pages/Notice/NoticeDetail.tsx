import { useParams, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { Text } from "../../components/common/Text"
import { colors } from "../../styles/colors"
import { useEffect, useState } from "react"
import NotificationsService from "../../apis/notifications"
import { NoticeItem } from "../../apis/notifications/type"
import { MdEdit, MdDelete } from "react-icons/md" // react-icons 사용

export function NoticeDetail() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const [notice, setNotice] = useState<NoticeItem | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [editForm, setEditForm] = useState({ title: "", content: "" })

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
                    setEditForm({
                        title: found.title,
                        content: found.content.replace(/\\n/g, "\n"),
                    })
                }
            } catch (err: any) {
                setError("공지사항을 불러오는 데 실패했습니다.")
            } finally {
                setLoading(false)
            }
        }

        fetchNotice()
    }, [id])

    const handleEdit = async () => {
        if (!notice) return
        if (!editForm.title.trim() || !editForm.content.trim()) {
            alert("제목과 내용을 모두 입력해주세요.")
            return
        }

        try {
            const result = await NotificationsService.editNotice(
                notice.notification_id,
                {
                    title: editForm.title,
                    content: editForm.content.replace(/\n/g, "\\n"),
                }
            )
            if (result === 200) {
                setNotice({
                    ...notice,
                    title: editForm.title,
                    content: editForm.content,
                })
                setIsEditing(false)
            } else {
                alert("공지 수정에 실패했습니다.")
            }
        } catch (err) {
            console.error(err)
            alert("공지 수정 중 오류가 발생했습니다.")
        }
    }

    const handleDelete = async () => {
        if (!notice) return
        const confirmDelete = window.confirm("정말 이 공지를 삭제하시겠습니까?")
        if (!confirmDelete) return

        try {
            const result = await NotificationsService.deleteNotice(
                notice.notification_id
            )
            if (result === 204) {
                navigate("/notices")
            } else {
                alert("공지 삭제에 실패했습니다.")
            }
        } catch (err) {
            console.error(err)
            alert("공지 삭제 중 오류가 발생했습니다.")
        }
    }

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
            <Header>
                {isEditing ? (
                    <EditTitleInput
                        value={editForm.title}
                        onChange={(e) =>
                            setEditForm({ ...editForm, title: e.target.value })
                        }
                    />
                ) : (
                    <TitleText as={"div"} font="TitleMedium" color="Black">
                        {notice.title}
                    </TitleText>
                )}
                <IconBox>
                    <MdEdit
                        size={24}
                        color={colors.Gray600}
                        onClick={() => setIsEditing((prev) => !prev)}
                        style={{ cursor: "pointer" }}
                    />
                    <MdDelete
                        size={24}
                        color={colors.CriticalMain}
                        onClick={handleDelete}
                        style={{ cursor: "pointer" }}
                    />
                </IconBox>
            </Header>

            <DateText font="BodySmall" color="Gray600">
                {new Date(notice.created_at).toLocaleDateString("ko-KR")}
            </DateText>

            <Divider />

            {isEditing ? (
                <>
                    <EditTextArea
                        value={editForm.content}
                        onChange={(e) =>
                            setEditForm({
                                ...editForm,
                                content: e.target.value,
                            })
                        }
                    />
                    <EditButtonBox>
                        <Button onClick={handleEdit}>저장</Button>
                        <CancelButton onClick={() => setIsEditing(false)}>
                            취소
                        </CancelButton>
                    </EditButtonBox>
                </>
            ) : (
                <Content font="BodyMedium" color="Black">
                    {notice.content
                        .replace(/\\n/g, "\n")
                        .split("\n")
                        .map((line, idx, arr) => (
                            <span key={idx}>
                                {line}
                                {idx < arr.length - 1 && <br />}
                            </span>
                        ))}
                </Content>
            )}
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
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
`

const IconBox = styled.div`
    display: flex;
    gap: 12px;
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

const EditTextArea = styled.textarea`
    width: 100%;
    min-height: 300px;
    resize: vertical;
    font-size: 16px;
    line-height: 24px;
    padding: 16px;
    border: 1px solid ${colors.Gray200};
    border-radius: 12px;
    background-color: ${colors.Gray50};
    color: ${colors.Gray800};
    box-sizing: border-box;
`

const EditTitleInput = styled.input`
    width: 100%;
    font-size: 20px;
    font-weight: 600;
    padding: 8px 12px;
    border: 1px solid ${colors.Gray200};
    border-radius: 8px;
`

const EditButtonBox = styled.div`
    display: flex;
    gap: 12px;
    margin-top: 20px;
`

const Button = styled.button`
    background-color: ${colors.Blue500};
    color: white;
    border: none;
    border-radius: 6px;
    padding: 10px 16px;
    font-size: 14px;
    cursor: pointer;
`

const CancelButton = styled(Button)`
    background-color: ${colors.Gray300};
    color: ${colors.Gray800};
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
