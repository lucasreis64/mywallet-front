import { ThreeDots } from "react-loader-spinner";

export const carregamento = (
    <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="white"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
    />
);


export const urlLogin = 'http://localhost:5000/auth/sign-in'
export const urlSignUp = 'http://localhost:5000/auth/sign-up'
export const urlAccounts = 'http://localhost:5000/accounts'
export const urlPostStatement = 'http://localhost:5000/accounts'