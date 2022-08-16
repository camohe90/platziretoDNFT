import { useEffect, useState } from "react";
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./util/interact.js";

const Minter = (props) => {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");

  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected();

    setWallet(address);
    setStatus(status);

    addWalletListener();
  }, []);

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your browser.
          </a>
        </p>
      );
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const onMintPressed = async () => {
    const { success, status } = await mintNFT(url, name, description);
    setStatus(status);
    if (success) {
      setName("");
      setDescription("");
      setURL("");
    }
  };

  return (
    <div className="Minter">
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>

      <br></br>

      <h1 id="title">
        University Certificate NFT Minter
      </h1>
      <p>
        Upload your certificate's link, course, and faculty. Then press "Mint NFT certificate"
      </p>

      <br></br>

      <form>
        <h2>
          🔗 Link to certificate: 
        </h2>
        <input
          type="text"
          placeholder="e.g. https://gateway.pinata.cloud/ipfs/..."
          onChange={(event) => setURL(event.target.value)}
        />
        <h2>
          📖 Course: 
        </h2>
        <input
          type="text"
          placeholder="e.g. Online Cryptography Course"
          onChange={(event) => setName(event.target.value)}
        />
        <h2>
          🏫 Faculty:
        </h2>
        <input
          type="text"
          placeholder="e.g. Computer Science Department"
          onChange={(event) => setDescription(event.target.value)}
        />
      </form>
      <p id="status" style={{ color: "orange" }}>
        {status}
      </p>
      <button 
        id="mintButton"
        onClick={onMintPressed}
      >
        Mint NFT certificate
      </button>
    </div>
  );
};

export default Minter;
