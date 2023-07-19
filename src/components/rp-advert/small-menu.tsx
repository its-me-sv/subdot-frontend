import { menu } from "../../translations/header";
import { MenuItem } from "../menu/styles";
import { SmallMenuContainer } from "./styles";
import reputationLogo from "../../assets/icons/reputation.png";
import txsLogo from "../../assets/icons/transactions.png";
import chatLogo from "../../assets/icons/chat.png";
import newLogo from "../../assets/icons/new.png";
import feedBackLogo from "../../assets/icons/feedback.png";
import advertLogo from "../../assets/icons/advert.png";
import { useAppContext } from "../../contexts/app";
import { useNavigate } from "react-router-dom";

interface SmallMenuProps {}

const SmallMenu: React.FC<SmallMenuProps> = () => {
    const navigate = useNavigate();
    const {
        dark, language,
        advert, setAdvertMenuOpen,
        setTxOpen
    } = useAppContext();

    const takeToSubchat = () => {
      navigate("/subchat");
    };

    const takeToRP = () => {
      navigate("/rp");
    };

    const openAdvertise = () => {
      navigate(`/advertise`);
    };

    const openTransactions = () => {
      setTxOpen!(true);
    };

    return (
      <SmallMenuContainer dark={dark}>
        <MenuItem dark={dark} onClick={takeToSubchat}>
          <img src={chatLogo} />
          <span>SUBCHAT</span>
          <img src={newLogo} />
        </MenuItem>
        <MenuItem dark={dark} onClick={takeToRP}>
          <img src={reputationLogo} />
          <span>{menu.rpBoard[language]}</span>
          <img src={newLogo} />
        </MenuItem>
        <MenuItem dark={dark} onClick={openTransactions}>
          <img src={txsLogo} />
          <span>{menu.transactions[language]}</span>
        </MenuItem>
        <MenuItem dark={dark} onClick={openAdvertise}>
          <img src={advertLogo} />
          <span>{menu.advertise[language]}</span>
          <img src={newLogo} />
        </MenuItem>
        <a href="https://subdot.canny.io/feedback" target="_blank">
          <MenuItem dark={dark}>
            <img src={feedBackLogo} />
            <span>{menu.feedback[language]}</span>
            <img src={newLogo} />
          </MenuItem>
        </a>
      </SmallMenuContainer>
    );
};

export default SmallMenu;
