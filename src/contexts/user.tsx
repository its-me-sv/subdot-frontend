import React, {createContext, useContext, ReactNode, useState} from "react";

import {User, WalletAccount} from "../utils/types";

interface UserContextInterface {
  account: WalletAccount | null;
  user: User | null;
  setAccount?: React.Dispatch<React.SetStateAction<WalletAccount | null>>;
  setUser?: React.Dispatch<React.SetStateAction<User | null>>;
}

const defaultState: UserContextInterface = {
    account: null,
    user: null
};

export const UserContext = createContext<UserContextInterface>(defaultState);

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [account, setAccount] = useState<WalletAccount | null>(defaultState.account);
    const [user, setUser] = useState<User | null>(defaultState.user);

    return (
        <UserContext.Provider value={{
            account, setAccount,
            user, setUser
        }}>
            {children}
        </UserContext.Provider>
    );
};
