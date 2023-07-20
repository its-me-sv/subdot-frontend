import React, {createContext, useContext, useEffect, useState} from "react";
import {Socket} from "socket.io-client";
import {io} from "socket.io-client";
import toast from "react-hot-toast";

import {SOCKET} from "../utils/constants";
import {AdvertInfo, DBMessage} from "../utils/types";

import {useAppContext} from "./app";
import {useUserContext} from "./user";
import { newFollower } from "../translations/toast";

interface ServerToClientEvents {
  newAdvert?: (advert: AdvertInfo) => void;
  newTx?: (msg: string) => void;
  notify?: (msg: string) => void;
  follow?: (accId: string) => void;
  unfollow?: (accId: string) => void;
  incrRP?: (rp: number) => void;
  newMessage?: (msg: DBMessage) => void;
  verifyMessage?: (roomId: string) => void;
  newMessageNotification?: (msg: string) => void;
}

interface ClientToServerEvents {
  joinRoom?: (roomId: string) => void;
  leaveRoom?: (roomId: string) => void;
  newAdvert?: (advert: AdvertInfo) => void;
  newTx?: (roomId: string, msg: string) => void;
  notify?: (roomId: string, msg: string) => void;
  follow?: (roomId: string, accId: string) => void;
  unfollow?: (roomId: string, accId: string) => void;
  incrRP?: (roomId: string, rp: string) => void;
  newMessage?: (roomId: string, msg: DBMessage) => void;
  verifyMessage?: (roomId: string) => void;
  newMessageNotification?: (roomId: string, msg: string) => void;
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
  const {setAdverts, language, adverts} = useAppContext();
  const {account, setFollowers, setReputation} = useUserContext();
  const [socket, setSocket] =
    useState<Socket<ServerToClientEvents, ClientToServerEvents>>(defaultState.socket);

  useEffect(() => {
    socket.emit("joinRoom", "advert");
    socket.on("newAdvert", newAdvert => {
      if (adverts.find(v => v.id === newAdvert.id)) return;
      const ttl = new Date(newAdvert.expires).getTime() - Date.now();
      if (ttl <= 0) return;
      setAdverts!(prev => [...prev, newAdvert]);
      setTimeout(() => {
        setAdverts!(prev => [...prev.filter(v => v.id !== newAdvert.id)]);
      }, ttl);
      if (process.env.NODE_ENV === "development") {
        toast("New advertisement arrived");
      }
    });
    socket.on("newTx", (msg) => toast(msg, { icon: "💸", id: msg }));
    socket.on("notify", (msg) => toast(msg, { icon: "🔔", id: msg }));
    socket.on("follow", accId => {
      toast(newFollower[language], { icon: "🔔", id: accId });
      setFollowers!(prev => [...prev, accId]);
    });
    socket.on("unfollow", accId => {
      setFollowers!(prev => [...prev.filter(v => v !== accId)]);
    });
    socket.on("incrRP", rp => setReputation!(prev => prev + rp));
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
