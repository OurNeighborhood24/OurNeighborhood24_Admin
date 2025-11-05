import styled from "styled-components"
import { Input, Button, Text, Dropdown } from "../components/common"
import { useForm } from "../components/hooks/useForm"

export function Signup() {
    const { form, setForm, handleChange } = useForm<{
        id: string
        password: string
        region: string
    }>({ id: "", password: "", region: "" })

    const handleSignup = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        // 회원가입 로직
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
        <>
            <Main>
                <SignupSection>
                    <TitleBox>
                        <div style={{ marginTop: "16px" }}>
                            <Text font="TitleLarge">회원가입</Text>
                        </div>
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
                            onClick={() => handleSignup}
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
                </SignupSection>
            </Main>
        </>
    )
}

const QuestionBox = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
`
const ButtonBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
    align-items: center;
`
const InputBox = styled.div`
    display: flex;
    gap: 32px;
    flex-direction: column;
`
const TitleBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`
const SignupSection = styled.form`
    display: flex;
    max-width: 480px;
    width: 100%;
    flex-direction: column;
    gap: 64px;
    padding: 80px 40px;
    animation: up 0.3s forwards;
`
const Main = styled.main`
    display: flex;
    justify-content: center;
    padding-top: 72px;
    min-height: calc(100dvh - 72px);
`
