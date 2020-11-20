import { createContext, useContext } from 'react';
import { User } from "./User";

type ConextState = {
    user?: User,
    jwtToken?: string
    setUser: (_user?: User, _jwtToken?: string) => void,
}

const DEFAULT_USER_VALUE: ConextState = {
    user: undefined,
    jwtToken: undefined,
    setUser: (_?: User, _jwtToken?: string) => {
    },
};

export const UserContext = createContext(DEFAULT_USER_VALUE);

export const useUser = () => useContext(UserContext);
