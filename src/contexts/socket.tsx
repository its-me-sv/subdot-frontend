import React, {createContext, useContext, useState} from "react";
import {Socket} from "socket.io-client";
import {io} from "socket.io-client";

import {SOCKET} from "../utils/constants";

interface ServerToClientEvents {}

interface ClientToServerEvents {
  joinRoom?: (roomId: string) => void;
}

interface SocketContextInterface {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  setSocket?: (val: any) => void;
}

const defaultState: SocketContextInterface = {
  socket: io(SOCKET),
};

export const SocketContext =
  createContext<SocketContextInterface>(defaultState);

export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [socket, setSocket] =
    useState<Socket<ServerToClientEvents, ClientToServerEvents>>(defaultState.socket);

  return (
    <SocketContext.Provider
      value={{
        socket,
        setSocket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
