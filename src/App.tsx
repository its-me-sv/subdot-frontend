import React from "react";
import {HashRouter, Route, Routes, Navigate} from "react-router-dom";

// pages
import LoginPage from "./pages/login";
import HomePage from "./pages/home";
import ProfilePage from "./pages/profile";
import ChatPage from "./pages/chat";
import ReputationPage from "./pages/reputation";
import ErrorPage from "./pages/error";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/rp" element={<ReputationPage />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
