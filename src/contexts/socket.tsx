import React, {createContext, useContext, useEffect, useState} from "react";
import {Socket} from "socket.io-client";
import {io} from "socket.io-client";

import {SOCKET} from "../utils/constants";
import {AdvertInfo} from "../utils/types";

import {useAppContext} from "./app";
import {useUserContext} from "./user";

interface ServerToClientEvents {
  newAdvert?: (advert: AdvertInfo) => void;
}

interface ClientToServerEvents {
  joinRoom?: (roomId: string) => void;
  leaveRoom?: (roomId: string) => void;
  newAdvert?: (advert: AdvertInfo) => void;
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
  const {setAdvert} = useAppContext();
  const {account} = useUserContext();
  const [socket, setSocket] =
    useState<Socket<ServerToClientEvents, ClientToServerEvents>>(defaultState.socket);

  useEffect(() => {
    socket.emit("joinRoom", "advert");
    socket.on("newAdvert", setAdvert);
  }, []);

  useEffect(() => {
    if (!account) return;
    socket.emit("joinRoom", account.address);
  }, [account]);

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
