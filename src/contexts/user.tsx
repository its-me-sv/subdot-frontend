import React, {createContext, useContext, ReactNode, useState} from "react";

import {WalletAccount} from "../utils/types";

interface UserContextInterface {
  account: WalletAccount | null;
  setAccount?: React.Dispatch<React.SetStateAction<WalletAccount | null>>;
}

const defaultState: UserContextInterface = {
    account: null
};

export const UserContext = createContext<UserContextInterface>(defaultState);

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [account, setAccount] = useState<WalletAccount | null>(defaultState.account);

    return (
        <UserContext.Provider value={{
            account, setAccount
        }}>
            {children}
        </UserContext.Provider>
    );
};
