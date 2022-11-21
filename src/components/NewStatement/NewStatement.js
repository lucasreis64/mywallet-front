import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { urlPostStatement } from "../../Auxiliares/constants";
import { contexto } from "../../context/context";

export default function NewStatement(params) {
    const { type } = useParams();
    const [typeCopy, setType] = useState("");
    const [value, setValue] = useState("");
    const [description, setDescription] = useState("");
    const { userInfo } = useContext(contexto);
    const [operation, setOperation] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (type === "outcome") {
            setType("saída");
            setOperation("debits");
        } else {
            setType("entrada");
            setOperation("credits");
        }
    }, []);

    function postStatement() {
        console.log(userInfo);
        if (JSON.stringify(userInfo) === "{}") {
            navigate("/");
        }
        axios
            .post(
                urlPostStatement,
                {
                    value: value,
                    description: description,
                    operation: operation,
                },
                { headers: { Authorization: `Bearer ${userInfo.token}` } }
            )
            .then((response) => {
                navigate("/account");
            })
            .catch((response) => {
                console.error(response);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Algo deu errado!",
                    footer: "Tente novamente!",
                });
            });
    }

    function handleSubmit(event) {
        event.preventDefault();
        postStatement();
    }

    return (
        <NewStatementContainer>
            <h1>Nova {typeCopy}</h1>
            <form action="" onSubmit={handleSubmit}>
                <input
                    name="value"
                    type="number"
                    placeholder="Valor ex.: 3500,50"
                    max={9999999999.9999999999}
                    min={0.0}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    required
                />
                <input
                    name="text"
                    type="text"
                    placeholder="Descrição ex.: Presente da mamãe"
                    value={description}
                    maxLength="30"
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <button>Salvar {typeCopy}</button>
            </form>
        </NewStatementContainer>
    );
}

const NewStatementContainer = styled.div`
    background-color: #8c11be;
    padding: 25px 25px;
    height: 100%;
    box-sizing: border-box;
    h1 {
        font-family: "Raleway";
        font-style: normal;
        font-weight: 700;
        font-size: 26px;
        color: white;
        margin-bottom: 40px;
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 15px;

        input {
            font-size: 20px;
            width: 100%;
            background: #ffffff;
            border-radius: 5px;
            height: 58px;
            border: none !important;
            padding: 10px;
            box-sizing: border-box;
            outline: none;
        }
        button {
            width: 100%;
            height: 46px;
            background: #a328d6;
            border-radius: 5px;
            border: none;
            color: white;
            font-family: "Raleway";
            font-style: normal;
            font-weight: 700;
            font-size: 20px;
        }
    }
`;
