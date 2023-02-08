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

export interface Post {
    description: string;
    picture?: string; 
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
