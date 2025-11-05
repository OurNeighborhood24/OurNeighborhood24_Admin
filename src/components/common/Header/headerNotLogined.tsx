import styled from "styled-components"
import Logo from "../../../assets/Img/Logo.png"
import { useNavigate } from "react-router-dom"

export function HeaderNotLogined() {
    const navigate = useNavigate()

    return (
        <Container>
            <Wrapper>
                <Left>
                    <LogoButton onClick={() => navigate("/")}>
                        <img src={Logo} width={100} alt="로고" />
                    </LogoButton>
                </Left>
                <Right>
                    <NavButton onClick={() => navigate("/signup")}>
                        회원가입
                    </NavButton>
                    <LoginButton onClick={() => navigate("/login")}>
                        로그인
                    </LoginButton>
                </Right>
            </Wrapper>
        </Container>
    )
}

const Container = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background: white;
    border-bottom: 1px solid #eeeeee;
    z-index: 1000;
`

const Wrapper = styled.div`
    max-width: 1200px;
    width: 100%;
    height: 60px;
    margin: 0 auto;
    padding: 0 20px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 768px) {
        padding: 0 12px;
    }
`

const Left = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;

    @media (max-width: 500px) {
        gap: 12px;
    }
`

const Right = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;

    @media (max-width: 500px) {
        gap: 12px;
    }
`

const NavButton = styled.button`
    cursor: pointer;
    background: none;
    border: none;
    font-size: 16px;
    color: #333;

    &:hover {
        color: #1860f0;
    }

    @media (max-width: 500px) {
        font-size: 14px;
    }
`

const LogoButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;

    img {
        width: 80px;

        @media (max-width: 500px) {
            width: 60px;
        }
    }
`

const LoginButton = styled.button`
    background: #1860f0;
    color: white;
    border: none;
    padding: 7px 12px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 15px;

    &:hover {
        opacity: 0.9;
    }

    @media (max-width: 500px) {
        font-size: 14px;
        padding: 6px 10px;
    }
`
