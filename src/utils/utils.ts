export const getImage = (id: string): string => {
    if (id.includes("dicebear")) return id;
    return `https://ipfs.subsocial.network/ipfs/${id}`;
};
