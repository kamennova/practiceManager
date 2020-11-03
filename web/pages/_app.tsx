import { store } from "common/store/appReducers";
import { AppProps } from "next/dist/pages/_app";
import * as React from "react";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { Main } from "../components/Main";
import { User, UserContext } from "../ts/user";
import "./style.css";

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
    const [user, setUserState] = useState<User | undefined>(undefined);
    const [jwtToken, setJwtToken] = useState<string | undefined>(undefined);
    const setUser = (u: User | undefined, token: string | undefined) => {
        setUserState(u);
        setJwtToken(token);
    };

    useEffect(() => {
        console.log('app reload!');
    }, []);

    return (
        <Provider store={store}>
            <UserContext.Provider value={{ user, jwtToken, setUser }}>
                <Main>
                    <Component {...pageProps} />
                </Main>
            </UserContext.Provider>
        </Provider>
    );
};

export default MyApp;
