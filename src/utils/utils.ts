import { DICE_BEAR } from "./constants";
import skeleton from "../assets/loader.gif";

export const getImage = (id: string): string => {
    if (id === DICE_BEAR) return skeleton;
    if (id.includes("dicebear")) return id;
    return `https://ipfs.subsocial.network/ipfs/${id}`;
};
