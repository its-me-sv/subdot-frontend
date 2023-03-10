import React from "react";

import {Container, SearchIcon, Input} from "./styles";
import {explr} from "../../translations/header";

import {useAppContext} from "../../contexts/app";

interface ExploreProps {}

const Explore: React.FC<ExploreProps> = () => {
    const {setExplore, explore, language, dark} = useAppContext();

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
        setExplore!(event.target.value);
    };

    return (
      <Container dark={dark}>
        <SearchIcon dark={dark} />
        <Input
          type="text"
          dark={dark}
          placeholder={explr[language]}
          value={explore}
          onChange={handleChange}
        />
      </Container>
    );
};

export default Explore;
