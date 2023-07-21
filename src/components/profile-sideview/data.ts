import {User, ProfileMeta, UserAllTimeStats} from "../../utils/types";
import { DICE_BEAR } from "../../utils/constants";

export const defaultUser: User = {
    created: "2023-02-07T16:25:55.956Z",
    username: "--------",
    name: "-------",
    status: "-------",
    picture: DICE_BEAR,
};

export const defaultMeta: ProfileMeta = {
    followers: 0,
    following: 0,
    posts: 0,
};

export const defaultRPStats: UserAllTimeStats = {
    total_rp: 0,
    e5p: 0,
    p10f: 0,
    ptg: 0,
    ac: 0
};
