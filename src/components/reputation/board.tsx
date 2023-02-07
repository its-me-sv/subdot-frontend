import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import toast from "react-hot-toast";

import {BoardContainer, FetchButton} from "./styles";
import { TopRPUser } from "../../utils/types";

import User from "./user";
import { REST_API } from "../../utils/constants";
import { Button } from "../../utils/styles";
import { useAppContext } from "../../contexts/app";

interface BoardProps {}

const Board: React.FC<BoardProps> = () => {
    const [users, setUsers] = useState<Array<TopRPUser>>([]);
    const [over, setOver] = useState<boolean>(false);
    const fetched = useRef<boolean>(false);
    const {dark} = useAppContext();

    const fetchData = () => {
        if (over) return;
        const usersPromise = axios.post(`${REST_API}/user/rp`, {skip: users.length});
        toast.promise(usersPromise, {
            loading: "Fetching top RP users",
            success: "Fetched top RP users",
            error: "Unable to fetch top RP users",
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
                    bgColor={dark ? "#f5f4f9" : "#1a1a1a"} 
                    dark={dark}
                    onClick={fetchData}
                >
                Load more
                </Button>
            </FetchButton>
        )}
      </BoardContainer>
    );
};

export default Board;
