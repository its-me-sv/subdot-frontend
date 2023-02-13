import React from "react";

import { Container, Box, CloseIcon } from "../terms-privacy/styles";
import { Text } from "./styles";

import { useAppContext } from "../../contexts/app";

interface LowBalanceProps {}

const LowBalance: React.FC<LowBalanceProps> = () => {
    const {dark, setLowBalance} = useAppContext();

    return (
      <Container dark={dark}>
        <Box dark={dark}>
          <CloseIcon 
            dark={dark} 
            onClick={() => setLowBalance!(false)}
        >X</CloseIcon>
          <Text dark={dark}>
            You have insufficient tokens. Consider claiming the tokens from the{" "}
            <a href="https://discord.gg/fsHCertT">SubSocial Discord Server</a>.
          </Text>
          <Text dark={dark}>
            Run the command <code>!drip {"<YOUR_POLKADOT_JS_ADDRESS>"}</code> in
            the <code>#testnet-faucet</code> text channel
          </Text>
        </Box>
      </Container>
    );
};

export default LowBalance;
