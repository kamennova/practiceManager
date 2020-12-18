import { store } from "common/store/appReducers";
import { AppProps } from "next/dist/pages/_app";
import * as React from "react";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { Menu } from "../components/Menu";
import { getUserIdByToken } from "../ts/api";
import { getCookie } from "../ts/helpers";
import { User, UserContext } from "../ts/user";
import "./style.less";

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
    const [user, setUserState] = useState<User | undefined>(undefined);
    const [jwtToken, setJwtToken] = useState<string | undefined>(undefined);
    const setUser = (u: User | undefined, token: string | undefined) => {
        setUserState(u);
        setJwtToken(token);
    };

    useEffect(() => {
        console.log('app reload!');
        const jwt = getCookie('authToken');

        if (jwt !== undefined) {
            const userId = getUserIdByToken(jwt);

            if (userId !== undefined) {
                fetch('/api/users/' + userId, { method: 'GET', headers: { authorization: jwt } })
                    .then(resp => resp.json())
                    .then(res => {
                        if (res.error !== undefined) {
                            console.log(res.error);
                        } else {
                            setUser(res.user, jwt);
                        }
                    });
            }
        }
    }, []);

    return (
        <Provider store={store}>
            <UserContext.Provider value={{ user, jwtToken, setUser }}>
                {user !== undefined ? <Menu/> : undefined}
                <main>
                    <Component {...pageProps} />
                </main>
            </UserContext.Provider>
        </Provider>
    );
};

export default MyApp;
