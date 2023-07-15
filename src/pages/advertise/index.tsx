import { useEffect } from "react";
import { useAppContext } from "../../contexts/app";
import { advertisemenstPage } from "../../translations/page-titles";

interface AdvertisePageProps {}

const AdvertisePage: React.FC<AdvertisePageProps> = () => {
    const {language} = useAppContext();

    useEffect(() => {
        window.document.title = `${advertisemenstPage[language]} / Subdot`;
    }, [language]);

    return (
        <h1>Advertisement page</h1>
    );
};

export default AdvertisePage;
