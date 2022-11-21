import { useEffect, useState } from "react";
import styled from "styled-components";

export default function StatementDetail({ statement }) {
    const [color, setColor] = useState("");
    useEffect(() => {
        if (statement.type === "debits") setColor("#C70000");
        else setColor("#03AC00");
    }, []);
    return (
        <StatementDetailDiv color={color}>
            <div>
                <h3>{statement.date}</h3>
                <h4>{statement.description}</h4>
            </div>

            <h5>{statement.value.replace(".",",")}</h5>
        </StatementDetailDiv>
    );
}

const StatementDetailDiv = styled.div`
    width: 100%;
    font-family: "Raleway" !important;
    font-style: normal !important;
    font-weight: 400 !important;
    font-size: 16px !important;

    div{
        justify-content: initial !important;
    }

    h3 {
        color: #c6c6c6 !important;
    }
    h4 {
        color: #000000;
        margin-left: 10px;
    }
    h5 {
        color: ${(props) => props.color};
    }
`;
