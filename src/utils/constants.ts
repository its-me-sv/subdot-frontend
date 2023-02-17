export const REST_API: string = process.env.NODE_ENV === "development" 
? "http://192.168.29.97:5000/api"
: "https://subdot-backend.onrender.com/api";

export const SOCKET: string = REST_API.slice(0, -4);

export const DICE_BEAR: string = "https://api.dicebear.com/5.x/identicon/svg?seed=subdot";

export const BALANCE_DIVISOR: number = 10000000000;

export const ADVERT_BENEFICIAR: string = "5GP4tv4zanLgcwup1u1dLX9Ca8XAs3uRS6RQCvHX3GgCr8Ru";

export const ADVERT_COST: number = 2;
