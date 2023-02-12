import React, {ReactNode, createContext, useContext, useState} from "react";

import {PostComment, WalletAccount} from "../utils/types";

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
  comments: Array<PostComment>;
  cmtOpen: boolean;
  transferId: string;
  postMenuOpen: boolean;
  txOpen: boolean;
  loading: boolean;
  newAccount: WalletAccount | null;
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
  setComments?: React.Dispatch<React.SetStateAction<Array<PostComment>>>;
  setTransferId?: React.Dispatch<React.SetStateAction<string>>;
  setPostMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setTxOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  setNewAccount?: React.Dispatch<React.SetStateAction<WalletAccount | null>>;
  setCmtOpen?: React.Dispatch<React.SetStateAction<boolean>>;
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
    peek: "",
    comments: [],
    transferId: "",
    postMenuOpen: false,
    txOpen: false,
    loading: true,
    newAccount: null,
    cmtOpen: false
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
    const [comments, setComments] = useState<Array<PostComment>>(defaultState.comments);
    const [transferId, setTransferId] = useState<string>(defaultState.transferId);
    const [postMenuOpen, setPostMenuOpen] = useState<boolean>(defaultState.postMenuOpen);
    const [txOpen, setTxOpen] = useState<boolean>(defaultState.txOpen);
    const [loading, setLoading] = useState<boolean>(defaultState.loading);
    const [newAccount, setNewAccount] = useState<WalletAccount | null>(defaultState.newAccount);
    const [cmtOpen, setCmtOpen] = useState<boolean>(defaultState.cmtOpen);

    const resetAppContext = () => {
        setShowTerms!(false);
        setMenuOpen!(false);
        setSettingsOpen!(false);
        setAdvertMenuOpen!(false);
        setExplore!("");
        setPeek!("");
        setComments!([]);
        setTransferId!("");
        setPostMenuOpen!(false);
        setTxOpen!(false);
        setCmtOpen(false);
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
            resetAppContext,
            comments, setComments,
            transferId, setTransferId,
            postMenuOpen, setPostMenuOpen,
            txOpen, setTxOpen,
            loading, setLoading,
            newAccount, setNewAccount,
            cmtOpen, setCmtOpen
        }}>
            {children}
        </AppContext.Provider>
    );
};
