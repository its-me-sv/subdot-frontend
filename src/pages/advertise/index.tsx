import { useEffect, useState } from "react";
import axios from "axios";

import { Container } from "./styles";
import { advertisemenstPage } from "../../translations/page-titles";

import AdvertStat from "../../components/advert-stat";
import UserAdvert from "../../components/user-advert";
import PostAdvert from "../../components/post-advert";

import { useAppContext } from "../../contexts/app";
import { useUserContext } from "../../contexts/user";
import { REST_API } from "../../utils/constants";

interface AdvertisePageProps {}

const AdvertisePage: React.FC<AdvertisePageProps> = () => {
    const {language, dark} = useAppContext();
    const {account} = useUserContext();
    const [advertId, setAdvertId] = useState<string>("");

    const fetchData = () => {
      if (!account?.address) return;
      axios.get(`${REST_API}/advert/user/${account.address}`)
      .then(({data}) => setAdvertId(data || ""));
    };

    useEffect(() => {
        window.document.title = `${advertisemenstPage[language]} / Subdot`;
    }, [language]);

    useEffect(() => {
      fetchData();
    }, [account]);

    return (
      <Container dark={dark}>
        {advertId.length > 0 ? (
          <>
            <UserAdvert advertId={advertId} />
            <AdvertStat advertId={advertId} setAdvertId={setAdvertId} />
          </>
        ) : (
          <PostAdvert setAdvertId={setAdvertId} />
        )}
      </Container>
    );
};

export default AdvertisePage;
