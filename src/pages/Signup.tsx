import styled from "styled-components"
import { Input, Button, Text, Dropdown } from "../components/common"
import { useForm } from "../hooks/useForm"
import UserService from "../apis/users"
import { useEffect, useState } from "react"
import { Region } from "../apis/users/type"
import { useNavigate } from "react-router-dom"

export function Signup() {
    const { form, setForm, handleChange } = useForm<{
        id: string
        password: string
        region_name: string
    }>({ id: "", password: "", region_name: "" })
    const navigate = useNavigate()

    const [regions, setRegions] = useState<Region[]>([])

    useEffect(() => {
        const fetchRegions = async () => {
            try {
                const data = await UserService.getRegions()
                setRegions(data)
                console.log(data)
            } catch (err) {
                console.error("지역 정보 불러오기 실패:", err)
            }
        }
        fetchRegions()
    }, [])

    const handleSignup = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()

        const selectedRegion = regions.find(
            (r) => r.region_name === form.region_name
        )

        if (!selectedRegion) {
            alert("지역을 선택해 주세요.")
            return
        }

        if (form.id && form.password) {
            const result = await UserService.register({
                id: form.id,
                password: form.password,
                role: "ADMIN",
                region_id: selectedRegion.region_id,
            })

            if (result === 201) {
                navigate("/login")
            } else {
                alert("회원가입에 실패했습니다.")
            }

            setForm({ id: "", password: "", region_name: "" })
        }
    }

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
                        options={regions.map((r) => r.region_name)}
                        value={form.region_name}
                        onChange={(value) =>
                            setForm({ ...form, region_name: value })
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
