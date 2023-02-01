import React from "react";

import {Container} from "../../components/reputation/styles";

import Info from "../../components/reputation/info";
import Board from "../../components/reputation/board";

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
