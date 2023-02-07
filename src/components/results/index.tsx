import React, {useState, useEffect} from "react";

import {Container, ItemsContainer, Item} from "./styles";

import {useAppContext} from "../../contexts/app";
import { ExploreResult } from "../../utils/types";
import axios from "axios";
import { REST_API } from "../../utils/constants";
import ResultCard from "./card";

interface ResultsProps {}

const Results: React.FC<ResultsProps> = () => {
    const {dark, explore} = useAppContext();
    const [results, setResults] = useState<Array<ExploreResult>>([]);

    useEffect(() => {
        if (explore.length <= 2) return;
        axios.post(`${REST_API}/user/explore`, {
            keyword: explore
        }).then(({data}) => setResults(data));
    }, [explore]);

    return (
        <Container dark={dark}>
            <ItemsContainer>
                {results.map(props => 
                    <ResultCard key={props.accountId} {...props} />
                )}
            </ItemsContainer>
        </Container>
    );
};

export default Results;
