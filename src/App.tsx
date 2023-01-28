import React from "react";
import {HashRouter, Route, Routes, Navigate} from "react-router-dom";

// pages
import LoginPage from "./pages/login";
import HomePage from "./pages/home";
import ProfilePage from "./pages/profile";
import ChatPage from "./pages/chat";
import ReputationPage from "./pages/reputation";
import ErrorPage from "./pages/error";

// components
import TermsPolicies from "./components/terms-privacy";
import Header from "./components/header/header";

// providers
import {useAppContext} from "./contexts";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const {loggedIn, showTerms} = useAppContext();
  
  return (
    <div>
      {showTerms && <TermsPolicies />}
      <HashRouter>
        {loggedIn && <Header />}  
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
