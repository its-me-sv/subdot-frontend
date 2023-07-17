import { useEffect, useState } from "react";
import { useAppContext } from "../../contexts/app";
import { advertisemenstPage } from "../../translations/page-titles";
import { AdvertStatsContainer, Container, FetchButton, Seperator, StatItem, StatsContainer } from "./styles";

interface AdvertisePageProps {}

const AdvertisePage: React.FC<AdvertisePageProps> = () => {
    const {language, dark} = useAppContext();
    const [fetching, setFetching] = useState<boolean>(false);

    const fetchData = () => {
        if (fetching) return;
        setFetching(true);
        setTimeout(() => {
            setFetching(false);
        }, 1000);
    };

    useEffect(() => {
        window.document.title = `${advertisemenstPage[language]} / Subdot`;
    }, [language]);

    return (
      <Container dark={dark}>
        <AdvertStatsContainer dark={dark}>
          <FetchButton onClick={fetchData} title="Refetch data" dark={dark}>
            {fetching ? "⏱️" : "↺"}
          </FetchButton>
          <StatsContainer>
            <StatItem>
              <span>Posted</span>
              <span>2 days ago</span>
            </StatItem>
            <Seperator />
            <StatItem>
              <span>Expires</span>
              <span>in 1 day</span>
            </StatItem>
            <Seperator />
            <StatItem>
              <span>Views</span>
              <span>500</span>
            </StatItem>
            <Seperator />
            <StatItem>
              <span>Engagements</span>
              <span>127</span>
            </StatItem>
          </StatsContainer>
        </AdvertStatsContainer>
      </Container>
    );
};

export default AdvertisePage;
