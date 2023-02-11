import {UserPost, UserPostMeta, User} from "../../utils/types";
import { DICE_BEAR } from "../../utils/constants";

export const defaultPost: UserPost = {
    description: "",
    picture: "",
    summary: "",
    isShowMore: false
};

export const defaultUserPostMeta: UserPostMeta = {
    createdAt: Date.now(),
    likes: 0
};

export const defaultUser: User = {
    created: "2023-02-07T16:25:55.956Z",
    username: "--------",
    name: "-------",
    status: "-------",
    picture: DICE_BEAR,
};