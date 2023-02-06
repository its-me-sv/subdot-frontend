import {getNewIdsFromEvent} from '@subsocial/api';
import toast from "react-hot-toast";

// logTransaction is a callback method when a transaction is sent to
// the blockchain. It listens and logs the events like ready, broadcast, finalized, etc.
// It also logs if a new id is generated during an event.
export const logTransaction = (result: any) => {
    const {status} = result;

    if (!result || !status) return;
    
    if (status.isFinalized) {
        const blockHash = status.isFinalized ? status.asFinalized : status.asInBlock;
        toast.success(`Tx finalized. Block hash: ${blockHash.toString()}`);
        const newIds = getNewIdsFromEvent(result); // get first argument from array.
        if (newIds.length > 0) {
            console.log(`New Item Id: ${newIds[0]}`);
        }
    } else if (result.isError) {
        toast.error("Tx failed");
        console.log(JSON.stringify(result));
    } else {
        toast(`Tx status: ${status.type}`, { icon: "⏱" });
    }
};

// Sign and send transaction using polkadot.js web extension.
// Arguments: [tx] is the transaction object, accountId is the wallet adddress, callback is a method
// that listens to events of the transaction processing. See example: [logTransaction].
export const signAndSendTx = async (
    tx: any,
    accountId: string,
    callback?: (result: any) => void
) => {
    const {web3FromAddress} = await import('@polkadot/extension-dapp');
    const accounts = await getAllAccounts();

    const addresses = accounts.map(account => account.address);
    if (!addresses.includes(accountId)) {
        toast.error("Address not found on Polkadot.js extension.");
        return;
    }

    const {signer} = await web3FromAddress(accountId);
    await tx.signAsync(accountId, { signer });
    await tx.send(callback ?? logTransaction);
};

// Fetch list of available accounts from the polkadotjs extension.
// It returns list of accounts, each account have address and other metadata property.
export const getAllAccounts = async () => {
    const { isWeb3Injected, web3Enable, web3Accounts } = await import(
        '@polkadot/extension-dapp'
    );
    
    if (!isWeb3Injected) {
        await toast.error("Browser do not have any polkadot.js extension");
        window.alert("You are required to have the polkadot.js extension installed to use this dapp");
        window.open("https://polkadot.js.org/extension/", "_blank");
        return [];
    }

    const injectedExtensions = await web3Enable('subsocial-starter');
    if (!injectedExtensions.length) {
        toast.error("Polkadot Extension have not authorized us to get accounts");
        return [];
    }

    return await web3Accounts();
};
