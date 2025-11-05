import styled from "styled-components"
import { Input, Button, Text, Dropdown } from "../components/common"
import { useForm } from "../hooks/useForm"

export function Signup() {
    const { form, setForm, handleChange } = useForm<{
        id: string
        password: string
        region: string
    }>({ id: "", password: "", region: "" })

    const handleSignup = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setForm({ id: "", password: "", region: "" })
    }

    const regions = [
        "서울특별시",
        "부산광역시",
        "대구광역시",
        "인천광역시",
        "광주광역시",
        "대전광역시",
        "울산광역시",
        "세종특별자치시",
        "경기도",
        "강원특별자치도",
        "충청북도",
        "충청남도",
        "전북특별자치도",
        "전라남도",
        "경상북도",
        "경상남도",
        "제주특별자치도",
    ]

    return (
        <Main>
            <Form>
                <TitleBox>
                    <Text font="TitleLarge">회원가입</Text>
                    <Text font="BodyMedium" color="Gray500">
                        회원가입 하여 서비스를 이용해 보세요.
                    </Text>
                </TitleBox>
                <InputBox>
                    <Dropdown
                        label="지역정보"
                        options={regions}
                        value={form.region}
                        onChange={(value) =>
                            setForm({ ...form, region: value })
                        }
                    />
                    <Input
                        placeholder="아이디를 입력해 주세요"
                        label="아이디"
                        name="id"
                        required
                        value={form.id}
                        onChange={handleChange}
                    />
                    <Input
                        placeholder="비밀번호를 입력해 주세요"
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
                        onClick={handleSignup}
                    >
                        회원가입
                    </Button>
                    <QuestionBox>
                        <Text font="BodySmall" color="Gray500">
                            이미 회원이신가요?
                        </Text>
                        <a href="/login">
                            <Text font="LabelMedium" color="Blue500">
                                로그인
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
