import React from "react";

import { Container, Box } from "../terms-privacy/styles";
import { Text } from "../low-balance/styles";
import { Button } from "../../utils/styles";

import { useAppContext } from "../../contexts/app";

interface OverlapProps {}

const Overlap: React.FC<OverlapProps> = () => {
    const {dark, setOverlap} = useAppContext();

    return (
      <Container dark={dark}>
        <Box dark={dark}>
          <Text dark={dark}>
            This account appears to be used by another dapp on the same
            Subsocial Testnet in which Subdot is deployed. To avoid {" "} 
            <code>content</code> field overlap between dapps on the Testnet, 
            kindly consider creating an exclusive account for Subdot if possible.
          </Text>
          <Button
            bgColor={dark ? "#f5f4f9" : "#1a1a1a"}
            dark={dark}
            onClick={() => setOverlap!(false)}
          >
            OK
          </Button>
        </Box>
      </Container>
    );
};

export default Overlap;
