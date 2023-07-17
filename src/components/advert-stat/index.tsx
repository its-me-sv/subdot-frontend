import { useEffect, useState } from "react";
import { format } from "timeago.js";
import { AdvertStatsContainer, FetchButton, Seperator, StatHeader, StatItem, StatsContainer } from "./styles";
import { useAppContext } from "../../contexts/app";
import { statTitle, statsBox } from "../../translations/advert";
import { AdvertStats } from "../../utils/types";
import { defaultAdvertStats } from "../../data/advert";
import axios from "axios";
import { REST_API } from "../../utils/constants";

interface AdvertStatProps {
    advertId: string;
}

const AdvertStat: React.FC<AdvertStatProps> = ({advertId}) => {
    const {dark, language} = useAppContext();
    const [advertStat, setAdvertStat] = useState<AdvertStats>(defaultAdvertStats);
    const [fetching, setFetching] = useState<boolean>(false);

    const fetchData = () => {
      if (fetching) return;
      setFetching(true);
      axios.get(`${REST_API}/advert/stat/${advertId}`)
      .then(({data}) => setAdvertStat(data))
      .finally(() => setFetching(false));
    };

    useEffect(() => {
        if (!advertId) return;
        fetchData();
    }, [advertId]);

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
            <span title={new Date(advertStat.posted).toString()}>
              {format(new Date(advertStat.posted))}
            </span>
          </StatItem>
          <Seperator />
          <StatItem dark={dark}>
            <span>{statsBox.expires[language]}</span>
            <span title={new Date(advertStat.expires).toString()}>
              {format(new Date(advertStat.expires))}
            </span>
          </StatItem>
          <Seperator />
          <StatItem dark={dark}>
            <span>{statsBox.invst[language]}</span>
            <span>{advertStat.investment || "--"} SOON</span>
          </StatItem>
          <Seperator />
          <StatItem dark={dark}>
            <span>{statsBox.vws[language]}</span>
            <span>{advertStat.views || "--"}</span>
          </StatItem>
          <Seperator />
          <StatItem dark={dark}>
            <span>{statsBox.engmnt[language]}</span>
            <span>{advertStat.engagement || "--"}</span>
          </StatItem>
        </StatsContainer>
      </AdvertStatsContainer>
    );
};

export default AdvertStat;
