import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from "./Auxiliares/GlobalStyles";
import Account from "./components/Account/Account";
import EditStatement from "./components/EditStatement/EditStatement";
import NewStatement from "./components/NewStatement/NewStatement";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";

function App() {
    return (
        <Screen>
            <GlobalStyle />
            <SmartPhoneContainer>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<SignIn />} />
                        <Route path="/sign-up" element={<SignUp />} />
                        <Route path="/account" element={<Account />} />
                        <Route path="/new/:type" element={<NewStatement />} />
                        <Route path="/edit/:type/:id" element={<EditStatement />} />
                    </Routes>
                </BrowserRouter>
            </SmartPhoneContainer>
        </Screen>
    );
}

const Screen = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(to right, violet , blue);
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
`

const SmartPhoneContainer = styled.div`
    width: 400px;
    height: 85vh;
    background-color: ${props=> props.noturno?'#1C1C1C':'#e5e5e5'};
    box-sizing: border-box;
    overflow: scroll;
    position: relative;
    border-radius: 30px;
    /* Hide scrollbar for Chrome, Safari and Opera */
    &::-webkit-scrollbar {
    display: none;
    }
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */

    @media (max-width: 600px) {
        width: 100%;
        height: 100vh;
        border-radius: 0px;
    }
`


export default App;
