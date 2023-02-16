import axios from "axios";
import React, {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { REST_API } from "../utils/constants";

import {PostComment, WalletAccount, AdvertInfo} from "../utils/types";

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
  cmtOpen: string;
  transferId: string;
  postMenuOpen: boolean;
  txOpen: boolean;
  loading: boolean;
  newAccount: WalletAccount | null;
  lowBalance: boolean;
  overlap: boolean;
  advert: AdvertInfo | null;
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
  setCmtOpen?: React.Dispatch<React.SetStateAction<string>>;
  setLowBalance?: React.Dispatch<React.SetStateAction<boolean>>;
  setOverlap?: React.Dispatch<React.SetStateAction<boolean>>;
  setAdvert?: React.Dispatch<React.SetStateAction<AdvertInfo | null>>;
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
    cmtOpen: "",
    lowBalance: false,
    overlap: false,
    advert: null
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
    const [cmtOpen, setCmtOpen] = useState<string>(defaultState.cmtOpen);
    const [lowBalance, setLowBalance] = useState<boolean>(defaultState.lowBalance);
    const [overlap, setOverlap] = useState<boolean>(defaultState.overlap);
    const [advert, setAdvert] = useState<AdvertInfo | null>(null);

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
        setCmtOpen("");
        setLowBalance(false);
        setOverlap(false);
    };

    // fetching advertisement
    useEffect(() => {
        axios.get(`${REST_API}/advert/`).then(({ data }) => {
          setAdvert(data);
          const diff = new Date(data.expires).getTime() - new Date().getTime();
          if (diff < 1) setAdvert(null);
          else setTimeout(() => setAdvert(null), diff);
        });
    }, []);

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
            cmtOpen, setCmtOpen,
            lowBalance, setLowBalance,
            overlap, setOverlap,
            advert, setAdvert
        }}>
            {children}
        </AppContext.Provider>
    );
};
