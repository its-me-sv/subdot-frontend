import React, {ReactNode, createContext, useContext, useState} from "react";

interface AppContextInterface {
  loggedIn: boolean;
  showTerms: boolean;
  menuOpen: boolean;
  settingsOpen: boolean;
  language: number;
  dark: boolean;
  advertMenuOpen: boolean;
  explore: string;
  peek: string;
  resetAppContext?: () => void;
  setLoggedIn?: React.Dispatch<React.SetStateAction<boolean>>;
  setShowTerms?: React.Dispatch<React.SetStateAction<boolean>>;
  setMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setSettingsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setLanguage?: React.Dispatch<React.SetStateAction<number>>;
  setDark?: React.Dispatch<React.SetStateAction<boolean>>;
  setAdvertMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setExplore?: React.Dispatch<React.SetStateAction<string>>;
  setPeek?: React.Dispatch<React.SetStateAction<string>>;
}

const defaultState: AppContextInterface = {
    loggedIn: false,
    showTerms: false,
    menuOpen: false,
    settingsOpen: false,
    language: 0,
    dark: false,
    advertMenuOpen: false,
    explore: "",
    peek: ""
};

export const AppContext = createContext<AppContextInterface>(defaultState);

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [loggedIn, setLoggedIn] = useState<boolean>(defaultState.loggedIn);
    const [showTerms, setShowTerms] = useState<boolean>(defaultState.showTerms);
    const [menuOpen, setMenuOpen] = useState<boolean>(defaultState.menuOpen);
    const [settingsOpen, setSettingsOpen] = useState<boolean>(defaultState.settingsOpen);
    const [language, setLanguage] = useState<number>(defaultState.language);
    const [dark, setDark] = useState<boolean>(defaultState.dark);
    const [advertMenuOpen, setAdvertMenuOpen] = useState<boolean>(defaultState.advertMenuOpen);
    const [explore, setExplore] = useState<string>(defaultState.explore);
    const [peek, setPeek] = useState<string>(defaultState.peek);

    const resetAppContext = () => {
        setShowTerms!(false);
        setMenuOpen!(false);
        setSettingsOpen!(false);
        setAdvertMenuOpen!(false);
        setExplore!("");
        setPeek!("");
    };

    return (
        <AppContext.Provider value={{
            loggedIn,setLoggedIn,
            showTerms, setShowTerms,
            menuOpen, setMenuOpen,
            settingsOpen, setSettingsOpen,
            language, setLanguage,
            dark, setDark,
            advertMenuOpen, setAdvertMenuOpen,
            explore, setExplore,
            peek, setPeek,
            resetAppContext
        }}>
            {children}
        </AppContext.Provider>
    );
};
