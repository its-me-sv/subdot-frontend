import { AdvertStats, UserAdvertDetails } from "../utils/types";

export const dummyLink: string = "https://bit.ly/temp-advert";

export const dummyPicture: string = "https://images.all-free-download.com/images/graphicwebp/avocado_product_advertising_poster_bright_colorful_elegant_decor_6851697.webp";

export const defaultAdvertStats: AdvertStats = {
    posted: new Date().toISOString(),
    expires: new Date().toISOString(),
    investment: 0,
    views: 0,
    engagement: 0
};

export const defaultUserAdvert: UserAdvertDetails = {
    link: "-------",
    picture: "-------"
};
