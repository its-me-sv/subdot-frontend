import React, {ReactNode, createContext, useContext, useState} from "react";

interface AppContextInterface {
  loggedIn: boolean;
  showTerms: boolean;
  menuOpen: boolean;
  settingsOpen: boolean;
  setLoggedIn?: React.Dispatch<React.SetStateAction<boolean>>;
  setShowTerms?: React.Dispatch<React.SetStateAction<boolean>>;
  setMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setSettingsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultState: AppContextInterface = {
    loggedIn: false,
    showTerms: false,
    menuOpen: false,
    settingsOpen: false
};

export const AppContext = createContext<AppContextInterface>(defaultState);

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [loggedIn, setLoggedIn] = useState<boolean>(defaultState.loggedIn);
    const [showTerms, setShowTerms] = useState<boolean>(defaultState.showTerms);
    const [menuOpen, setMenuOpen] = useState<boolean>(defaultState.menuOpen);
    const [settingsOpen, setSettingsOpen] = useState<boolean>(defaultState.settingsOpen);

    return (
        <AppContext.Provider value={{
            loggedIn,setLoggedIn,
            showTerms, setShowTerms,
            menuOpen, setMenuOpen,
            settingsOpen, setSettingsOpen
        }}>
            {children}
        </AppContext.Provider>
    );
};
