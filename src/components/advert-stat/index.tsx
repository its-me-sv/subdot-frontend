import { useState } from "react";
import { format } from "timeago.js";
import { AdvertStatsContainer, FetchButton, Seperator, StatHeader, StatItem, StatsContainer } from "./styles";
import { useAppContext } from "../../contexts/app";
import { statTitle, statsBox } from "../../translations/advert";

interface AdvertStatProps {}

const AdvertStat: React.FC<AdvertStatProps> = () => {
    const {dark, language} = useAppContext();
    const [fetching, setFetching] = useState<boolean>(false);

    const fetchData = () => {
      if (fetching) return;
      setFetching(true);
      setTimeout(() => {
        setFetching(false);
      }, 1000);
    };

    return (
      <AdvertStatsContainer dark={dark}>
        <StatHeader dark={dark}>
          <span>{statTitle[language]}</span>
          <FetchButton onClick={fetchData} title="Refetch data" dark={dark}>
            {fetching ? "⏱️" : "↺"}
          </FetchButton>
        </StatHeader>
        <StatsContainer>
          <StatItem dark={dark}>
            <span>{statsBox.posted[language]}</span>
            <span title={new Date().toString()}>{format(Date.now())}</span>
          </StatItem>
          <Seperator />
          <StatItem dark={dark}>
            <span>{statsBox.expires[language]}</span>
            <span title={new Date().toString()}>{format(Date.now())}</span>
          </StatItem>
          <Seperator />
          <StatItem dark={dark}>
            <span>{statsBox.invst[language]}</span>
            <span>3 SOON</span>
          </StatItem>
          <Seperator />
          <StatItem dark={dark}>
            <span>{statsBox.vws[language]}</span>
            <span>500</span>
          </StatItem>
          <Seperator />
          <StatItem dark={dark}>
            <span>{statsBox.engmnt[language]}</span>
            <span>127</span>
          </StatItem>
        </StatsContainer>
      </AdvertStatsContainer>
    );
};

export default AdvertStat;
