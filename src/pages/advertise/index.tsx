import { useEffect } from "react";

import { Container } from "./styles";
import { advertisemenstPage } from "../../translations/page-titles";

import AdvertStat from "../../components/advert-stat";
import UserAdvert from "../../components/user-advert";

import { useAppContext } from "../../contexts/app";

interface AdvertisePageProps {}

const AdvertisePage: React.FC<AdvertisePageProps> = () => {
    const {language, dark} = useAppContext();

    useEffect(() => {
        window.document.title = `${advertisemenstPage[language]} / Subdot`;
    }, [language]);

    return (
      <Container dark={dark}>
        <UserAdvert advertId="123" />
        <AdvertStat advertId="123" />
      </Container>
    );
};

export default AdvertisePage;
