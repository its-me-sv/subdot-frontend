import { useEffect } from "react";

import { Container } from "./styles";
import { advertisemenstPage } from "../../translations/page-titles";

import AdvertStat from "../../components/advert-stat";
import UserAdvert from "../../components/user-advert";
import PostAdvert from "../../components/post-advert";

import { useAppContext } from "../../contexts/app";

interface AdvertisePageProps {}

const AdvertisePage: React.FC<AdvertisePageProps> = () => {
    const {language, dark, advertId} = useAppContext();

    useEffect(() => {
        window.document.title = `${advertisemenstPage[language]} / Subdot`;
    }, [language]);

    return (
      <Container dark={dark}>
        {advertId.length > 0 ? (
          <>
            <UserAdvert advertId={advertId} />
            <AdvertStat advertId={advertId} />
          </>
        ) : (
          <PostAdvert />
        )}
      </Container>
    );
};

export default AdvertisePage;
