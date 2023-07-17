import { useEffect } from "react";
import { useAppContext } from "../../contexts/app";
import { advertisemenstPage } from "../../translations/page-titles";
import { Container } from "./styles";
import AdvertStat from "../../components/advert-stat";

interface AdvertisePageProps {}

const AdvertisePage: React.FC<AdvertisePageProps> = () => {
    const {language, dark} = useAppContext();

    useEffect(() => {
        window.document.title = `${advertisemenstPage[language]} / Subdot`;
    }, [language]);

    return (
      <Container dark={dark}>
        <AdvertStat />
      </Container>
    );
};

export default AdvertisePage;
