import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { urlAccounts } from "../../Auxiliares/constants";
import { contexto } from "../../context/context";

import signOut from "../../img/signOut.png";
import plus from "../../img/plus.png";
import minus from "../../img/minus.png";
import StatementDetail from "./StatementList";

export default function Account(params) {
    const { userInfo } = useContext(contexto);
    const [statement, setStatement] = useState(null);
    const [name, setName] = useState("");
    const [balance, setBalance] = useState('...');
    const [color, setColor] = useState("black");
    const [addStatement, setAddStatement] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getStatement();
    }, [addStatement]);

    function attBalance(statementList) {
        let balanceAtt = 0;

        statementList.forEach((s) => {
            if (s.type === "debits") balanceAtt -= Number(s.value);
            else balanceAtt += Number(s.value);
        });

        if (balanceAtt < 0) setColor("#C70000");
        else if (balanceAtt === 0) setColor("black");
        else setColor("#03AC00");

        balanceAtt = balanceAtt.toFixed(2).replace("-", "").replace(".",",");
        setBalance(balanceAtt);
    }

    function getStatement() {
        if (JSON.stringify(userInfo) === "{}") {
            console.log("oi");
            navigate("/");
        }
        const statementList = axios.get(urlAccounts, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        statementList.then((response) => {
            setStatement(response.data.statement);
            setName(response.data.name);
            attBalance(response.data.statement);
        });
        statementList.catch((response) => console.error(response));
    }

    return (
        <AccountContainer>
            <div>
                <h1>Olá, {name}</h1>
                <img src={signOut} alt="" />
            </div>
            <StatementContainer>
                {statement ? (
                    statement.map((s) => {
                        return <StatementDetail statement={s} />;
                    })
                ) : (
                    <h2>
                        Não há registros de <br /> entrada ou saída
                    </h2>
                )}
                <SaldoContainer color={color}>
                    <h1>SALDO</h1>
                    <h2>{balance}</h2>
                </SaldoContainer>
            </StatementContainer>
            <NewContainer>
                <Link to="/new/income">
                    <img src={plus} alt="" />
                    <h2>
                        Nova
                        <br />
                        entrada
                    </h2>
                </Link>
                <Link to="/new/outcome">
                    <img src={minus} alt="" />
                    <h2>
                        Nova
                        <br />
                        saída
                    </h2>
                </Link>
            </NewContainer>
        </AccountContainer>
    );
}

const AccountContainer = styled.div`
    background-color: #8c11be;
    padding: 25px 25px;
    height: 100%;
    box-sizing: border-box;
    div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        box-sizing: border-box;

        h1 {
            font-family: "Raleway";
            font-style: normal;
            font-weight: 700;
            font-size: 26px;
            color: white;
        }

        img {
            height: 26px;
        }
    }
`;

const StatementContainer = styled.div`
    margin-top: 20px;
    background-color: white;
    border-radius: 5px;
    height: 70%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    overflow: scroll;
    padding: 20px 10px 0 10px;
    gap: 20px;
    position: relative;
    ::-webkit-scrollbar {
        display: none;
    }

    h2 {
        font-family: "Raleway";
        font-weight: 400;
        font-size: 20px;
        width: 100%;
        text-align: center;
        color: #868686;
    }
`;

const NewContainer = styled.div`
    margin-top: 25px;
    height: 18%;
    gap: 5%;

    a {
        width: 47.5%;
        height: 100%;
        background: #a328d6;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        padding: 10px;
        img {
            height: 21px;
        }
        h2 {
            font-family: "Raleway";
            font-style: normal;
            font-weight: 700;
            font-size: 17px;
            line-height: 20px;

            color: #ffffff;
        }
    }
`;

const SaldoContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between !important;
    align-items: center;
    position: sticky;
    bottom: 0%;
    background-color: white;
    padding: 5% 0;
    h1 {
        font-size: 17px !important;
        color: black !important;
        font-weight: bold;
    }
    h2 {
        color: ${(props) => props.color} !important;
        text-align: end;
    }
`;
