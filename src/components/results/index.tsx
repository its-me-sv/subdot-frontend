import React, {useState, useEffect} from "react";

import {Container, ItemsContainer, Item} from "./styles";

import {useAppContext} from "../../contexts/app";
import { ExploreResult } from "../../utils/types";
import axios from "axios";
import { REST_API } from "../../utils/constants";
import ResultCard from "./card";

interface ResultsProps {}

const Results: React.FC<ResultsProps> = () => {
    const {dark, explore, setExplore} = useAppContext();
    const [results, setResults] = useState<Array<ExploreResult>>([]);

    useEffect(() => {
        if (explore.length < 1) return;
        axios.post(`${REST_API}/user/explore`, {
            keyword: explore
        }).then(({data}) => setResults(data));
    }, [explore]);

    return (
        <Container dark={dark} onClick={() => {
            setExplore!("");
        }}>
            <ItemsContainer>
                {results.map(props => 
                    <ResultCard key={props.accountId} {...props} />
                )}
                {results.length === 0 && <span>Nothing to show</span>}
            </ItemsContainer>
        </Container>
    );
};

export default Results;
