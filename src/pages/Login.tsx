import styled from "styled-components"
import { Input, Button, Text } from "../components/common"
import { useForm } from "../hooks/useForm"
import AuthService from "../apis/auth"
import { useNavigate } from "react-router-dom"

export function Login() {
    const navigate = useNavigate()
    const { form, setForm, handleChange } = useForm<{
        user_id: string
        password: string
    }>({
        user_id: "",
        password: "",
    })

    const handleLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if (form.user_id && form.password) {
            if (form.password.length >= 8 && form.password.length <= 30) {
                if (form.user_id && form.password) {
                    const result = await AuthService.login({
                        user_id: form.user_id,
                        password: form.password,
                    })

                    if (result === 200) {
                        navigate("/reports")
                    } else {
                        alert("로그인에 실패했습니다.")
                    }

                    setForm({ user_id: "", password: "" })
                }
            } else {
                alert("비밀번호는 8자 이상, 30자 이하로 작성해주세요")
            }
        } else {
            alert("아이디와 비밀번호 모두 입력해주세요.")
        }
    }

    return (
        <Main>
            <Form>
                <TitleBox>
                    <Text font="TitleLarge">로그인</Text>
                    <Text font="BodyMedium" color="Gray500">
                        로그인 하여 서비스를 이용해 보세요.
                    </Text>
                </TitleBox>
                <InputBox>
                    <Input
                        placeholder="아이디를 입력해 주세요"
                        label="아이디"
                        name="user_id"
                        required
                        value={form.user_id}
                        onChange={handleChange}
                    />
                    <Input
                        placeholder="비밀번호를 입력해 주세요 (8자 이상, 30자 이하)"
                        label="비밀번호"
                        name="password"
                        required
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                    />
                </InputBox>
                <ButtonBox>
                    <Button
                        size="large"
                        full
                        type="submit"
                        onClick={handleLogin}
                    >
                        로그인
                    </Button>
                    <QuestionBox>
                        <Text font="BodySmall" color="Gray500">
                            아직 회원이 아니신가요?
                        </Text>
                        <a href="/signup">
                            <Text font="LabelMedium" color="Blue500">
                                회원가입
                            </Text>
                        </a>
                    </QuestionBox>
                </ButtonBox>
            </Form>
        </Main>
    )
}

const Main = styled.main`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 80px;
    min-height: calc(100dvh - 60px);
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 48px;
    width: 100%;
    max-width: 480px;
    padding: 60px 32px;

    @media (max-width: 768px) {
        padding: 40px 20px;
        gap: 36px;
    }
`

const TitleBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`

const InputBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`

const ButtonBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-items: center;
`

const QuestionBox = styled.div`
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;
`
