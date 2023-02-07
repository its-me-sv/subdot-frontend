import { SubmittableResult } from '@polkadot/api';
import { SubmittableExtrinsic } from '@polkadot/api/submittable/types';
import {Signer} from '@polkadot/types/types';
import { getNewIdsFromEvent } from '@subsocial/api';
import toast from "react-hot-toast";
import { WalletAccount } from '../utils/types';

export const getTxEventIds = (
    tx: SubmittableExtrinsic<"promise", SubmittableResult>
): Promise<Array<string>> => {
    return new Promise(async (resolve, reject) => {
        await tx.send(async (result: any) => {
            const { status } = result;
            if (!result || !status) return reject();
            if (status.isFinalized) {
                const ids = getNewIdsFromEvent(result).map(v => v.toString());
                return resolve(ids);
            } else if (result.isError) {
                return reject();
            }
        });
    });
};

export const getSigner = async (
    accountId: string
): Promise<Signer | null> => {
    const {web3FromAddress} = await import('@polkadot/extension-dapp');
    const accounts = await getAllAccounts();

    const addresses = accounts.map(account => account.address);
    if (!addresses.includes(accountId)) {
        toast.error("Address not found on Polkadot.js extension.");
        return null;
    }

    const {signer} = await web3FromAddress(accountId);
    return signer;
};

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
