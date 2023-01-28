import React, {ReactNode, createContext, useContext, useState} from "react";

interface AppContextInterface {
  loggedIn: boolean;
  showTerms: boolean;
  setLoggedIn?: React.Dispatch<React.SetStateAction<boolean>>;
  setShowTerms?: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultState: AppContextInterface = {
    loggedIn: false,
    showTerms: false
};

export const AppContext = createContext<AppContextInterface>(defaultState);

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [loggedIn, setLoggedIn] = useState<boolean>(defaultState.loggedIn);
    const [showTerms, setShowTerms] = useState<boolean>(defaultState.showTerms);

    return (
        <AppContext.Provider value={{
            loggedIn,setLoggedIn,
            showTerms, setShowTerms
        }}>
            {children}
        </AppContext.Provider>
    );
};
