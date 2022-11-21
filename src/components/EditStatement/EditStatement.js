import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { contexto } from "../../context/context";

export default function EditStatement(params) {
    const { type, id } = useParams();
    const [typeCopy, setType] = useState("");
    const [value, setValue] = useState("");
    const [description, setDescription] = useState("");
    const { userInfo } = useContext(contexto);
    const navigate = useNavigate();

    useEffect(() => {
        if (type === "debits") {
            setType("saída");
        } else {
            setType("entrada");
        }
    }, []);

    function putStatement() {
        if (JSON.stringify(userInfo) === "{}") {
            navigate("/");
        }

        axios
            .put(
                `http://localhost:5000/accounts/${id}`,
                {
                    value: value,
                    description: description,
                    operation: type,
                },
                { headers: { Authorization: `Bearer ${userInfo.token}` } }
            )
            .then((response) => {
                Swal.fire("Editado!", "Seu evento foi editado.", "success");
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
        putStatement();
    }

    return (
        <EditStatementContainer>
            <h1>Editar {typeCopy}</h1>
            <form action="" onSubmit={handleSubmit}>
                <input
                    name="value"
                    type="number"
                    placeholder="Ex: 3500,50"
                    max={9999999999.9999999999}
                    min={0}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    required
                />
                <input
                    name="text"
                    type="text"
                    placeholder="Ex: Presente da mamãe"
                    value={description}
                    maxLength="30"
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <button>Atualizar {typeCopy}</button>
            </form>
        </EditStatementContainer>
    );
}

const EditStatementContainer = styled.div`
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
