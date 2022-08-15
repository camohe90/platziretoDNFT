import React from "react";

import { Box } from "@chakra-ui/react";
import "./App.scss";

import { NFTContext } from "../NFTContext/";
import { NFTLoading } from "../NFTLoading";
import { NFTS } from "../NFTS";
import { NFTWallet } from "../NFTWallet";
import { Header } from "../../shared/Header";

function App() {
  const {
    addresses,
    nftManualContract,
    nftDinamicCompile,
    nftsMetadata,
    disabled,
    setDisable,
    buttonDisable, 
    setButtonDisable,
    error,
    loading,
    setLoading
  } = React.useContext(NFTContext);

  return (
    <React.Fragment>
      <Box w="100%" minHeight="100vh">
        <Header>
          <NFTWallet buttonDisable={buttonDisable} setDisable={setDisable} />
        </Header>
        {error && <h1>Error</h1>}
        {loading && <NFTLoading />}
        <NFTS 
          addresses={addresses}
          nftManualContract={nftManualContract}
          nftDinamicCompile={nftDinamicCompile}
          nftsMetadata={nftsMetadata}
          disabled={disabled}
          setLoading={setLoading}
          setDisable={setDisable}
          setButtonDisable={setButtonDisable}
        />
      </Box>
    </React.Fragment>
  );
}

export default App;
