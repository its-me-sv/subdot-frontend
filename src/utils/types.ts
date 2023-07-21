export interface WalletAccount {
    address: string;
    name: string;
}

export interface User {
    created: string;
    username: string;
    name: string;
    status: string;
    picture: string;
}

export interface UserPost {
    description: string;
    picture: string;
    summary: string;
    isShowMore: boolean;
}

export interface UserPostMeta {
    createdAt: number;
    likes: number
}

export interface Message {
    text: string;
}

export interface Web2User {
    accountId: string;
    username: string;
    name: string;
    reputation: number;
    isCommunity: boolean;
}

export interface ExploreResult {
    accountId: string;
    username: string;
    name: string;
    reputation: number;
}

export interface TopRPUser {
    accountId: string;
    username: string;
    reputation: number;
}

export interface ProfileMeta {
    followers: number;
    following: number;
    posts: number;
}

export interface PostComment {
    creator: string;
    createdAt: number;
    id: string;
    body: string;
}

export interface TransactionInfo {
    accountId: string;
    desc:number;
    kind: boolean;
    amount: number;
    createdAt: string;
    _id: string;
}

export interface AdvertInfo {
    id: string;
    crtd: string;
    picture: string;
    link: string;
    expires: string;
}

export interface MessageContent {
    sender: string;
    reciever: string;
    message: string;
}

export interface DBMessage {
    message_id: string;
    created_at: string;
    ipfs_content_id: string;
    verified: boolean;
}

export interface PostOpen {
    postId: string;
    post: UserPost;
    owner: User;
    ownerId: string;
    postMeta: UserPostMeta;
    cmtsLen: number;
    likedId: string;
}

export interface AdvertStats {
    posted: string;
    expires: string;
    investment: number;
    views: number;
    engagement: number;
}

export interface UserAdvertDetails {
    picture: string;
    link: string;
}

export interface UserAllTimeStats {
    total_rp: number,
    e5p: number,
    p10f: number,
    ptg: number,
    ac: number,
}
