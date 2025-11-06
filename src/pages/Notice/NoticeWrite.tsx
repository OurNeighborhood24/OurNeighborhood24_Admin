import { useState } from "react"
import styled from "styled-components"
import { Input } from "../../components/common/Input"
import { Button } from "../../components/common/Button"
import { colors } from "../../styles/colors"
import { Text } from "../../components/common/Text"

export function NoticeWrite() {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const handleSubmit = () => {
        if (!title.trim() || !content.trim()) {
            alert("공지 제목과 내용을 입력해주세요.")
            return
        }

        console.log("공지 등록:", { title, content })
        alert("공지사항이 등록되었습니다.")
    }

    return (
        <Wrapper>
            <FormContainer>
                <Field>
                    <Input
                        label="공지 제목"
                        placeholder="공지 제목을 입력해 주세요"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Field>

                <Field>
                    <Text font="LabelMedium" color="Gray800">
                        세부 내용
                    </Text>
                    <TextArea
                        placeholder="공지 세부 내용을 입력해주세요"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </Field>

                <Button
                    kind="blue"
                    size="large"
                    full
                    style={{ marginTop: "40px" }}
                    onClick={handleSubmit}
                >
                    공지 게시하기
                </Button>
            </FormContainer>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 80px 16px;
    box-sizing: border-box;
`

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
    width: 100%;
    max-width: 800px;
    box-sizing: border-box;

    @media (max-width: 768px) {
        gap: 24px;
    }
`

const Field = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
`

const TextArea = styled.textarea`
    width: 100%;
    min-height: 300px;
    resize: vertical;
    font-size: 16px;
    line-height: 24px;
    padding: 16px;
    border: 1px solid ${colors.Gray100};
    border-radius: 12px;
    background-color: ${colors.Gray50};
    color: ${colors.Gray800};
    box-sizing: border-box;
    resize: none;

    &::placeholder {
        color: ${colors.Gray500};
    }

    &:focus {
        outline: none;
        border-color: ${colors.Blue500};
    }

    @media (max-width: 768px) {
        min-height: 200px;
        font-size: 14px;
        padding: 12px;
    }
`
