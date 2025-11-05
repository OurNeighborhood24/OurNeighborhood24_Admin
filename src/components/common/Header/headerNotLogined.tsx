import styled from "styled-components"
import Logo from "../../../assets/Img/Logo.png"
import { useNavigate } from "react-router-dom"

export function HeaderNotLogined() {
    const navigate = useNavigate()

    return (
        <Container>
            <Wrapper>
                <Left>
                    <LogoButton>
                        <img src={Logo} alt="로고" />
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
    background: white;
    border-bottom: 1px solid #eeeeee;
    z-index: 1000;
    overflow-x: hidden;
`

const Wrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    height: 60px;
    width: 100%;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;

    @media (max-width: 768px) {
        flex-wrap: wrap;
        height: auto;
        padding: 8px 12px;
        gap: 8px;
    }
`

const Left = styled.div`
    display: flex;
    align-items: center;
`

const Right = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;

    @media (max-width: 500px) {
        gap: 8px;
    }
`

const NavButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    color: #333;

    &:hover {
        color: #1860f0;
    }

    @media (max-width: 500px) {
        font-size: 14px;
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

const LogoButton = styled.button`
    background: none;
    border: none;
    padding: 0;

    img {
        width: 80px;
        height: auto;

        @media (max-width: 500px) {
            width: 60px;
        }
    }
`
