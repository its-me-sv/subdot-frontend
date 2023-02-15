import React, {useEffect} from "react";

import {Container} from "../../components/reputation/styles";

import Info from "../../components/reputation/info";
import Board from "../../components/reputation/board";

import {useAppContext} from "../../contexts/app";

interface ReputationPageProps {}

const ReputationPage: React.FC<ReputationPageProps> = () => {
  const {dark} = useAppContext();

  useEffect(() => {
    window.document.title = "Reputation leaderboard • Subdot";
  }, []);

  return (
    <Container dark={dark}>
      <Board />
      <Info />
    </Container>
  );
};

export default ReputationPage;
