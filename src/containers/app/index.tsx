import React, {useEffect, lazy, Suspense} from "react";
import {HashRouter, Route, Routes, Navigate} from "react-router-dom";
import {toast, Toaster, ToastOptions} from "react-hot-toast";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../../utils/styles";

import '../../index.css';

// pages
const LoginPage = lazy(() => import("../../pages/login"));
const HomePage = lazy(() => import("../../pages/home"));
const ProfilePage = lazy(() => import("../../pages/profile"));
const ChatPage = lazy(() => import("../../pages/chat"));
const ReputationPage = lazy(() => import("../../pages/reputation"));
const ErrorPage = lazy(() => import("../../pages/error"));
const PostPage = lazy(() => import("../../pages/post"));
const AdvertisePage = lazy(() => import("../../pages/advertise"));

// components
import TermsPolicies from "../../components/terms-privacy";
import Settings from "../../components/settings";
import Results from "../../components/results";
import Peek from "../../components/peek";
import Transfer from "../../components/transfer";
import NewPost from "../../components/posts/new";
import Transactions from "../../components/transactions";
import Loader from "../../components/loader";
import NewAccount from "../../components/new-account";
import LowBalance from "../../components/low-balance";
import Comments from "../../components/comments";
import Overlap from "../../components/overlap";
import Header from "../../components/header";
import Menu from "../../components/menu";
import CreateAccPopUp from "../../components/create-acc-pop-up";

// providers
import {useAppContext} from "../../contexts/app";
import { useSocketContext } from "../../contexts/socket";
import { darkTheme, lightTheme } from "../../utils/themes";

interface AppProps {}

const toastOptions: ToastOptions = {
  style: {
    borderRadius: "0.36rem",
  },
  position: "top-center"
};

const App: React.FC<AppProps> = () => {
  const {
    loggedIn, showTerms, 
    settingsOpen, 
    explore, peek, 
    transferId,
    postMenuOpen, txOpen,
    loading, setLoading,
    newAccount, cmtOpen,
    lowBalance, dark,
    overlap, menuOpen,
    showCreate
  } = useAppContext();
  const {socket} = useSocketContext();

  useEffect(() => {
    setTimeout(() => setLoading!(false), 2400);
  }, []);

  useEffect(() => {
    if (!window.location.href.includes("subchat"))
    socket.on("newMessageNotification", msg => {
      toast(msg, { icon: "📨", id: msg });
    });
  }, [socket]);

  return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <div className={loggedIn ? "app-container" : ""}>
        <Toaster position="top-right" toastOptions={toastOptions} />
        {loading && <Loader />}
        {showTerms && <TermsPolicies />}
        {settingsOpen && <Settings />}
        {lowBalance && <LowBalance />}
        <HashRouter>
          {explore.length > 0 && <Results />}
          {showCreate && <CreateAccPopUp />}
          <Header />
          {loggedIn && (
            <>
              {menuOpen && <Menu />}
              {peek.length > 0 && <Peek id={peek} />}
              {cmtOpen !== null && <Comments dark={dark} postOpen={cmtOpen} />}
              {transferId.length > 0 && <Transfer accountId={transferId} />}
              {postMenuOpen && <NewPost />}
              {txOpen && <Transactions />}
            </>
          )}
          {newAccount !== null && <NewAccount account={newAccount} />}
          {overlap && <Overlap />}
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route
                path="/"
                element={!loggedIn ? <LoginPage /> : <Navigate to="/home" />}
              />
              <Route
                path="/home"
                element={loggedIn ? <HomePage /> : <Navigate to="/" />}
              />
              <Route
                path="/profile/:id"
                element={loggedIn ? <ProfilePage /> : <Navigate to="/" />}
              />
              <Route
                path="/subchat"
                element={loggedIn ? <ChatPage /> : <Navigate to="/" />}
              />
              <Route
                path="/rp"
                element={loggedIn ? <ReputationPage /> : <Navigate to="/" />}
              />
              <Route
                path="/advertise"
                element={loggedIn ? <AdvertisePage /> : <Navigate to="/" />}
              />
              <Route path="/post/:id" element={<PostPage />} />
              <Route path="/*" element={<ErrorPage />} />
            </Routes>
          </Suspense>
        </HashRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
