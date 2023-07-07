import React from "react";

import { AppContextProvider } from "./app";
import { SubsocialContextProvider } from "../subsocial";
import { UserContextProvider } from "./user";
import { SocketContextProvider } from "./socket";

const providers: Array<React.FC<{ children: React.ReactNode }>> = [
  AppContextProvider,
  SubsocialContextProvider,
  UserContextProvider,
  SocketContextProvider
];

interface ContextProps {
  children: React.ReactNode;
}

const ContextProvider: React.FC<ContextProps> = ({ children }) => {
  return (
    <>
      {providers.reduceRight(
        (acc, ResultComponent) => (
          <ResultComponent>{acc}</ResultComponent>
        ),
        children
      )}
    </>
  );
};

export default ContextProvider;
