import axios from "axios";
import React, {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import toast from "react-hot-toast";

import { REST_API } from "../utils/constants";
import {PostComment, WalletAccount, AdvertInfo, PostOpen} from "../utils/types";
import {sdConnect} from "../translations/toast";

interface AppContextInterface {
  loggedIn: boolean;
  showTerms: boolean;
  menuOpen: boolean;
  settingsOpen: boolean;
  language: number;
  dark: boolean;
  explore: string;
  peek: string;
  comments: Array<PostComment>;
  cmtOpen: PostOpen | null;
  transferId: string;
  postMenuOpen: boolean;
  txOpen: boolean;
  loading: boolean;
  newAccount: WalletAccount | null;
  lowBalance: boolean;
  overlap: boolean;
  adverts: Array<AdvertInfo>;
  showCreate: boolean;
  resetAppContext?: () => void;
  setLoggedIn?: React.Dispatch<React.SetStateAction<boolean>>;
  setShowTerms?: React.Dispatch<React.SetStateAction<boolean>>;
  setMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setSettingsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setLanguage?: React.Dispatch<React.SetStateAction<number>>;
  setDark?: React.Dispatch<React.SetStateAction<boolean>>;
  setExplore?: React.Dispatch<React.SetStateAction<string>>;
  setPeek?: React.Dispatch<React.SetStateAction<string>>;
  setComments?: React.Dispatch<React.SetStateAction<Array<PostComment>>>;
  setTransferId?: React.Dispatch<React.SetStateAction<string>>;
  setPostMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setTxOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  setNewAccount?: React.Dispatch<React.SetStateAction<WalletAccount | null>>;
  setCmtOpen?: React.Dispatch<React.SetStateAction<PostOpen | null>>;
  setLowBalance?: React.Dispatch<React.SetStateAction<boolean>>;
  setOverlap?: React.Dispatch<React.SetStateAction<boolean>>;
  setAdverts?: React.Dispatch<React.SetStateAction<Array<AdvertInfo>>>;
  setShowCreate?: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultState: AppContextInterface = {
    loggedIn: false,
    showTerms: false,
    menuOpen: false,
    settingsOpen: false,
    language: 0,
    dark: false,
    explore: "",
    peek: "",
    comments: [],
    transferId: "",
    postMenuOpen: false,
    txOpen: false,
    loading: true,
    newAccount: null,
    cmtOpen: null,
    lowBalance: false,
    overlap: false,
    adverts: [],
    showCreate: false
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
    const [explore, setExplore] = useState<string>(defaultState.explore);
    const [peek, setPeek] = useState<string>(defaultState.peek);
    const [comments, setComments] = useState<Array<PostComment>>(defaultState.comments);
    const [transferId, setTransferId] = useState<string>(defaultState.transferId);
    const [postMenuOpen, setPostMenuOpen] = useState<boolean>(defaultState.postMenuOpen);
    const [txOpen, setTxOpen] = useState<boolean>(defaultState.txOpen);
    const [loading, setLoading] = useState<boolean>(defaultState.loading);
    const [newAccount, setNewAccount] = useState<WalletAccount | null>(defaultState.newAccount);
    const [cmtOpen, setCmtOpen] = useState<PostOpen | null>(null);
    const [lowBalance, setLowBalance] = useState<boolean>(defaultState.lowBalance);
    const [overlap, setOverlap] = useState<boolean>(defaultState.overlap);
    const [adverts, setAdverts] = useState<Array<AdvertInfo>>(defaultState.adverts);
    const [showCreate, setShowCreate] = useState<boolean>(defaultState.showCreate);

    const resetAppContext = () => {
        setShowTerms!(false);
        setMenuOpen!(false);
        setSettingsOpen!(false);
        setExplore!("");
        setPeek!("");
        setComments!([]);
        setTransferId!("");
        setPostMenuOpen!(false);
        setTxOpen!(false);
        setCmtOpen(null);
        setLowBalance(false);
        setOverlap(false);
        setShowCreate(false);
    };

    // fetching advertisement
    useEffect(() => {
        axios.get(`${REST_API}/advert/`).then(({ data }) => {
          setAdverts(data.adverts || []);
        });
        const connectionReq = axios.get(`${REST_API.slice(0, -3)}`);
        toast.promise(connectionReq, {
            loading: sdConnect.loading[language],
            success: sdConnect.success[language],
            error: sdConnect.error[language]
        }, {
            id: "subdot-server-connect"
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
            explore, setExplore,
            peek, setPeek,
            comments, setComments,
            transferId, setTransferId,
            postMenuOpen, setPostMenuOpen,
            txOpen, setTxOpen,
            loading, setLoading,
            newAccount, setNewAccount,
            cmtOpen, setCmtOpen,
            lowBalance, setLowBalance,
            overlap, setOverlap,
            adverts, setAdverts,
            showCreate, setShowCreate,
            resetAppContext
        }}>
            {children}
        </AppContext.Provider>
    );
};
