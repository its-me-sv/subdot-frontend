import {Signer} from '@polkadot/types/types';
import {getNewIdsFromEvent} from '@subsocial/api';
import toast from "react-hot-toast";
import { WalletAccount } from '../utils/types';

// logTransaction is a callback method when a transaction is sent to
// the blockchain. It listens and logs the events like ready, broadcast, finalized, etc.
// It also logs if a new id is generated during an event.
export const logTransaction = (result: any, callback?: (id: string) => void) => {
    const {status} = result;

    if (!result || !status) return;
    
    if (status.isFinalized) {
        const blockHash = status.isFinalized ? status.asFinalized : status.asInBlock;
        console.log(`Tx finalized. Block hash: ${blockHash.toString()}`);
        const newIds = getNewIdsFromEvent(result); // get first argument from array.
        if (newIds.length > 0) {
            if (callback) callback(newIds[0].toString());
        }
    } else if (result.isError) {
        console.log("Tx failed", JSON.stringify(result));
    } else {
        console.log(`⏱ Tx status: ${status.type}`);
    }
};

// Sign and send transaction using polkadot.js web extension.
// Arguments: [tx] is the transaction object, accountId is the wallet adddress, callback is a method
// that listens to events of the transaction processing. See example: [logTransaction].
export const getSigner = async (accountId: string): Promise<Signer | null> => {
    const {web3FromAddress} = await import('@polkadot/extension-dapp');
    const accounts = await getAllAccounts();

    const addresses = accounts.map(account => account.address);
    if (!addresses.includes(accountId)) {
        toast.error("Address not found on Polkadot.js extension.");
        return null;
    }

    const {signer} = await web3FromAddress(accountId);
    return signer;
    // const data = await tx.signAsync(accountId, { signer });
    // const data1 = await data;
    // console.log("debug", data1);
    // if (!callback) await tx.send(logTransaction);
    // else await tx.send((res: any) => logTransaction(res, callback));
};

// Fetch list of available accounts from the polkadotjs extension.
// It returns list of accounts, each account have address and other metadata property.
export const getAllAccounts = async (): Promise<Array<WalletAccount>> => {
    const { isWeb3Injected, web3Enable, web3Accounts } = await import(
        '@polkadot/extension-dapp'
    );
    
    if (!isWeb3Injected) {
        toast.error("Browser do not have any polkadot.js extension");
        window.alert("You are required to have the polkadot.js extension installed to use this dapp");
        window.open("https://polkadot.js.org/extension/", "_blank");
        return [];
    }

    const injectedExtensions = await web3Enable('subsocial-starter');
    if (!injectedExtensions.length) {
        toast.error("Polkadot Extension have not authorized us to get accounts");
        return [];
    }

    return (await web3Accounts()).map((v) => ({
        address: v.address,
        name: v.meta.name || "No name"
    })); 
};
