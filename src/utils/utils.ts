import { DICE_BEAR } from "./constants";
import skeleton from "../assets/loader.gif";

export const getImage = (id: string): string => {
    if (id === DICE_BEAR) return skeleton;
    if (id.includes("dicebear")) return id;
    return `https://ipfs.subsocial.network/ipfs/${id}`;
};

export const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
};
