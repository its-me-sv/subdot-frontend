import React from "react";
import {HashRouter, Route, Routes, Navigate} from "react-router-dom";

import '../index.css';

// pages
import LoginPage from "../pages/login";
import HomePage from "../pages/home";
import ProfilePage from "../pages/profile";
import ChatPage from "../pages/chat";
import ReputationPage from "../pages/reputation";
import ErrorPage from "../pages/error";

// components
import TermsPolicies from "../components/terms-privacy";
import Settings from "../components/settings";
import Advertise from "../components/advertise";
import Results from "../components/results";
import Peek from "../components/peek";
import Transfer from "../components/transfer";
import NewPost from "../components/posts/new";
import Transactions from "../components/transactions";
import Header from "../components/header/header";

// providers
import {useAppContext} from "../contexts/app";
import Comments from "../components/comments";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const {
    loggedIn, showTerms, 
    settingsOpen, advertMenuOpen, 
    explore, peek, 
    commentId, transferId,
    postMenuOpen, txOpen
  } = useAppContext();
  
  return (
    <div className={loggedIn ? "app-container" : ""}>
      {showTerms && <TermsPolicies />}
      {settingsOpen && <Settings />}
      <HashRouter>
        {loggedIn && (
          <>
            <Header />
            {advertMenuOpen && <Advertise />}
            {explore.length > 0 && <Results />}
            {peek.length > 0 && <Peek id={peek} />}
            {commentId.length > 0 && <Comments postId={commentId} />}
            {transferId.length > 0 && <Transfer accountId={transferId} />}
            {postMenuOpen && <NewPost />}
            {txOpen && <Transactions />}
          </>
        )}
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
            path="/chat"
            element={loggedIn ? <ChatPage /> : <Navigate to="/" />}
          />
          <Route
            path="/rp"
            element={loggedIn ? <ReputationPage /> : <Navigate to="/" />}
          />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
