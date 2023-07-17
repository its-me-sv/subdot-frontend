import { useEffect, useState } from "react";
import { useAppContext } from "../../contexts/app";
import { advertisemenstPage } from "../../translations/page-titles";
import { AdvertStatsContainer, Container, FetchButton, Seperator, StatHeader, StatItem, StatsContainer } from "./styles";
import { format } from "timeago.js";

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
          <StatHeader dark={dark}>
            <span>Advertisement stats</span>
            <FetchButton onClick={fetchData} title="Refetch data" dark={dark}>
              {fetching ? "⏱️" : "↺"}
            </FetchButton>
          </StatHeader>
          <StatsContainer>
            <StatItem dark={dark}>
              <span>Posted</span>
              <span title={new Date().toString()}>{format(Date.now())}</span>
            </StatItem>
            <Seperator />
            <StatItem dark={dark}>
              <span>Expires</span>
              <span title={new Date().toString()}>{format(Date.now())}</span>
            </StatItem>
            <Seperator />
            <StatItem dark={dark}>
              <span>Investment</span>
              <span>3 SOON</span>
            </StatItem>
            <Seperator />
            <StatItem dark={dark}>
              <span>Views</span>
              <span>500</span>
            </StatItem>
            <Seperator />
            <StatItem dark={dark}>
              <span>Engagements</span>
              <span>127</span>
            </StatItem>
          </StatsContainer>
        </AdvertStatsContainer>
      </Container>
    );
};

export default AdvertisePage;
