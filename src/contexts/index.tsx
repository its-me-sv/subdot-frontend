import React, {ReactNode, createContext, useContext, useState} from "react";

interface AppContextInterface {
  loggedIn: boolean;
  setLoggedIn?: React.Dispatch<React.SetStateAction<boolean>>;
}

const default_state: AppContextInterface = {
    loggedIn: false,
};

export const AppContext = createContext<AppContextInterface>(default_state);

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [loggedIn, setLoggedIn] = useState<boolean>(default_state.loggedIn);
    
    return (
        <AppContext.Provider value={{
            loggedIn,
            setLoggedIn
        }}>
            {children}
        </AppContext.Provider>
    );
};
