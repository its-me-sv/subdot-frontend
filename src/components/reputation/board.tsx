import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import toast from "react-hot-toast";

import {BoardContainer, FetchButton} from "./styles";
import { TopRPUser } from "../../utils/types";
import {loadMore} from "../../translations/rp";
import {topRpFetch} from "../../translations/toast";

import User from "./user";
import { REST_API } from "../../utils/constants";
import { Button } from "../../utils/styles";
import { useAppContext } from "../../contexts/app";

interface BoardProps {}

const Board: React.FC<BoardProps> = () => {
    const [users, setUsers] = useState<Array<TopRPUser>>([]);
    const [over, setOver] = useState<boolean>(false);
    const fetched = useRef<boolean>(false);
    const {dark, language} = useAppContext();

    const fetchData = () => {
        if (over) return;
        const usersPromise = axios.post(`${REST_API}/user/rp`, {skip: users.length});
        toast.promise(usersPromise, {
            loading: topRpFetch.loading[language],
            success: topRpFetch.success[language],
            error: topRpFetch.error[language],
        });
        usersPromise.then(({data}) => {
            setUsers([...users, ...data]);
            setOver(data.length === 0);
        });
    };

    useEffect(() => {
        if (fetched.current) return;
        fetched.current = true;
        fetchData();
    }, []);
    
    return (
      <BoardContainer>
        {users.map((v) => (
          <User key={v.accountId} {...v} />
        ))}
        {!over && (
          <FetchButton>
            <Button
              bgColor={dark ? "#ffffff" : "#222222"}
              dark={dark}
              onClick={fetchData}
            >
              {loadMore[language]}
            </Button>
          </FetchButton>
        )}
      </BoardContainer>
    );
};

export default Board;
