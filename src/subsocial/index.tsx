import {createContext, ReactNode, useCallback, useContext, useEffect, useState} from "react";
import {SubsocialApi} from "@subsocial/api";
import {waitReady} from "@polkadot/wasm-crypto";
import {Buffer} from "buffer";
import toast from "react-hot-toast";

import {networkConfig, AUTH_HEADER} from "./config";

window.Buffer = Buffer;

interface SubsocialContextInterface {
    api: SubsocialApi | null,
    isReady: boolean
}

const defaultState: SubsocialContextInterface = {
    api: null,
    isReady: false
};

export const SubsocialContext = createContext<SubsocialContextInterface>(defaultState);

export const useSubsocial = () => useContext(SubsocialContext);

let requested = false;

export const SubsocialContextProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [api, setApi] = useState<SubsocialApi | null>(defaultState.api);
    const [isReady, setIsReady] = useState<boolean>(defaultState.isReady);

    const initialize = useCallback(async () => {
        if (requested) return;
        requested = true;
        await waitReady();
        const ssPromise = SubsocialApi.create(networkConfig).then(newApi => {
            setApi(newApi);
            setIsReady(true);
            newApi.ipfs.setWriteHeaders({
              authorization: "Basic " + AUTH_HEADER,
            });
        });
        toast.promise(ssPromise, {
            loading: "Connecting to Subsocial",
            success: "Successfully connected to Subsocial",
            error: "Error when connecting to Subsocial"
        });
    }, []);

    useEffect(() => {
        initialize();
    }, []);
    
    return (
        <SubsocialContext.Provider value={{
            api, isReady
        }}>
            {children}
        </SubsocialContext.Provider>
    );
};
