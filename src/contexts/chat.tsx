import React, { createContext, useContext, useEffect, useState } from "react";

interface ChatContextInterface {
    currChat: string;
    setCurrChat?: (val: string) => void;
    resetChat?: () => void;
}

const defaultState: ChatContextInterface = {
    currChat: ""
};

export const ChatContext = createContext<ChatContextInterface>(defaultState);

export const useChatContext = () => useContext(ChatContext);

export const ChatContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currChat, setCurrChat] = useState<string>("");

    const resetChat = () => {
        setCurrChat("");
    };

    return (
        <ChatContext.Provider value={{currChat, setCurrChat, resetChat}}>
            {children}
        </ChatContext.Provider>
    );
};
