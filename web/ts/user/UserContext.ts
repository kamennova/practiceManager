import { createContext, useContext } from 'react';
import { User } from "./User";

const DEFAULT_USER_VALUE = {
    user: undefined,
    jwtToken: undefined,
    setUser: (_: User | undefined, _jwtToken: string) => {
    },
};

export const UserContext = createContext(DEFAULT_USER_VALUE);

export const useUser = () => useContext(UserContext);
