import React from "react";

import {Container} from "./styles";

import Info from "./info";
import Board from "./board";

interface ReputationPageProps {}

const ReputationPage: React.FC<ReputationPageProps> = () => {
  return (
    <Container>
      <Board />
      <Info />
    </Container>
  );
};

export default ReputationPage;
