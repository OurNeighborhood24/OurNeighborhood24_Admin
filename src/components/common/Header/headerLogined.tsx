// ✅ HeaderLogined.tsx
import styled from "styled-components"
import Logo from "../../../assets/Img/Logo.png"
import { useNavigate } from "react-router-dom"

export function HeaderLogined() {
    const navigate = useNavigate()

    return (
        <Container>
            <Wrapper>
                <Left>
                    <NavButton onClick={() => navigate("/report")}>
                        신고 확인
                    </NavButton>
                    <NavButton onClick={() => navigate("/notification")}>
                        공지
                    </NavButton>
                </Left>
                <Right>
                    <LogoButton onClick={() => navigate("/")}>
                        <img src={Logo} alt="로고" />
                    </LogoButton>
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
    gap: 24px;
    flex-wrap: wrap;

    @media (max-width: 500px) {
        gap: 12px;
    }
`

const Right = styled.div`
    display: flex;
    align-items: center;
`

const NavButton = styled.button`
    cursor: pointer;
    background: none;
    border: none;
    font-size: 16px;
    color: #333;
    white-space: nowrap;

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

    img {
        width: 80px;
        height: auto;

        @media (max-width: 500px) {
            width: 60px;
        }
    }
`
