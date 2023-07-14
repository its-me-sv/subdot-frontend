import { useNavigate } from "react-router-dom";

import { Container } from "../terms-privacy/styles";

import { useAppContext } from "../../contexts/app";
import { Caption, Caption2, Title } from "../../pages/login/styles";
import { caption, title } from "../../translations/login";
import { Button } from "../../utils/styles";
import { lgnCrt } from "../../translations/header";
import { Box, Center, Feature, FeaturesContainer, Sides } from "./styles";
import { addtnFeatures, keyFeatures } from "../../data/popup";

interface CreateAccPopUpProps {}

const CreateAccPopUp: React.FC<CreateAccPopUpProps> = () => {
    const navigate = useNavigate();
    const {dark, language, setShowCreate} = useAppContext();

    const handleOk = () => {
        navigate("/");
        setShowCreate!(false);
    };

    return (
      <Container dark={dark}>
        <Box dark={dark}>
          <Sides>
            <Caption2 dark={dark} className="title">
              🌟 Key features
            </Caption2>
            <FeaturesContainer>
              {keyFeatures[language].map((v, i) => (
                <Feature dark={dark} key={v}>
                  {i + 1}. {v}
                </Feature>
              ))}
            </FeaturesContainer>
          </Sides>
          <Center>
            <Title>{title[language]}</Title>
            <Caption dark={dark}>{caption[language]}</Caption>
            <Button
              bgColor={dark ? "#ffffff" : "#222222"}
              dark={dark}
              onClick={handleOk}
            >
              {lgnCrt[language]}
            </Button>
          </Center>
          <Sides>
            <Caption2 dark={dark} className="title">
              📅 Upcoming features
            </Caption2>
            <FeaturesContainer isLeft>
              {addtnFeatures[language].map((v, i) => (
                <Feature dark={dark} key={v}>
                  {i + 1}. {v}
                </Feature>
              ))}
            </FeaturesContainer>
          </Sides>
        </Box>
      </Container>
    );
};

export default CreateAccPopUp;
