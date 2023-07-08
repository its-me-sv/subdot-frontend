import React, {useEffect} from "react";

import {Container} from "../../components/reputation/styles";
import {rpPage} from "../../translations/page-titles";

import Info from "../../components/reputation/info";
import Board from "../../components/reputation/board";

import {useAppContext} from "../../contexts/app";
import { useChatContext } from "../../contexts/chat";

interface ReputationPageProps {}

const ReputationPage: React.FC<ReputationPageProps> = () => {
  const {dark, language} = useAppContext();
  const {resetChat} = useChatContext();

  useEffect(() => {
    window.document.title = `${rpPage[language]} • Subdot`;
  }, [language]);

  useEffect(() => {
    resetChat!();
  }, []);

  return (
    <Container dark={dark}>
      <Board />
      <Info />
    </Container>
  );
};

export default ReputationPage;
