import React, {useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

import {Button} from "../../utils/styles";
import {RPContainer, RPItem, RPItemsContainer, RPTitle} from "./styles";
import {title, viewAll} from "../../translations/rp";
import {topRpFetch} from "../../translations/toast";

import {useAppContext} from "../../contexts/app";
import { TopRPUser } from "../../utils/types";
import { REST_API } from "../../utils/constants";

interface RPProps {}

const RP: React.FC<RPProps> = () => {
    const navigate = useNavigate();
    const {setPeek, language, dark} = useAppContext();
    const [users, setUsers] = useState<Array<TopRPUser>>([]);
    const fetched = useRef<boolean>(false);

    useEffect(() => {
      if (fetched.current) return;
      fetched.current = true;
      const rpPromise = axios.get(`${REST_API}/user/rp-5`);
      toast.promise(rpPromise, {
        loading: topRpFetch.loading[language],
        success: topRpFetch.success[language],
        error: topRpFetch.error[language]
      });
      rpPromise.then(({data}) => setUsers(data));
    }, []);

    return (
      <RPContainer dark={dark}>
        <RPTitle dark={dark}>{title[language]}</RPTitle>
        <RPItemsContainer>
          {users.map((v, i) => (
            <RPItem 
              key={v.accountId} 
              dark={dark} 
              onClick={() => setPeek!(v.accountId)}
            >
              <span>#{i + 1} {v.username}</span>
              <span>{v.reputation} RP</span>
            </RPItem>
          ))}
        </RPItemsContainer>
        <Button
          onClick={() => navigate("/rp")}
          bgColor={dark ? "#ffffff" : "#222222"}
          dark={dark}
        >
          {viewAll[language]}
        </Button>
      </RPContainer>
    );
};

export default RP;

