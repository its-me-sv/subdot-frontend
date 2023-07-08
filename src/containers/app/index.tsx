import React, {useEffect, lazy, Suspense} from "react";
import {HashRouter, Route, Routes, Navigate} from "react-router-dom";
import {Toaster, ToastOptions} from "react-hot-toast";

import '../../index.css';

// pages
const LoginPage = lazy(() => import("../../pages/login"));
const HomePage = lazy(() => import("../../pages/home"));
const ProfilePage = lazy(() => import("../../pages/profile"));
const ChatPage = lazy(() => import("../../pages/chat"));
const ReputationPage = lazy(() => import("../../pages/reputation"));
const ErrorPage = lazy(() => import("../../pages/error"));

// components
import TermsPolicies from "../../components/terms-privacy";
import Settings from "../../components/settings";
import Advertise from "../../components/advertise";
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

// providers
import {useAppContext} from "../../contexts/app";
import Menu from "../../components/menu";

interface AppProps {}

const toastOptions: ToastOptions = {
  style: {
    borderRadius: "1.4rem",
  },
};

const App: React.FC<AppProps> = () => {
  const {
    loggedIn, showTerms, 
    settingsOpen, advertMenuOpen, 
    explore, peek, 
    transferId,
    postMenuOpen, txOpen,
    loading, setLoading,
    newAccount, cmtOpen,
    lowBalance, dark,
    overlap, menuOpen
  } = useAppContext();

  useEffect(() => {
    setTimeout(() => setLoading!(false), 2400);
  }, []);

  return (
    <div className={loggedIn ? "app-container" : ""}>
      <Toaster position="top-right" toastOptions={toastOptions} />
      {loading && <Loader />}
      {showTerms && <TermsPolicies />}
      {settingsOpen && <Settings />}
      {lowBalance && <LowBalance />}
      <HashRouter>
        {loggedIn && (
          <>
            <Header />
            {menuOpen && <Menu />}
            {advertMenuOpen && <Advertise />}
            {explore.length > 0 && <Results />}
            {peek.length > 0 && <Peek id={peek} />}
            {cmtOpen.length > 0 && <Comments dark={dark} postId={cmtOpen} />}
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
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </HashRouter>
    </div>
  );
}

export default App;
