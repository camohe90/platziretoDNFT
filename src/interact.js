require('dotenv').config();

const { ethers } = require("ethers");
const ERC20_ABI = require('./../abi/contracts/DNFT.sol/keeperChrist.json');
const { API_URL, METAMASK_PRIVATE_KEY } = process.env;
const provider = new ethers.providers.JsonRpcProvider(API_URL);

const _displayEtherscanURL = (txHash) =>
  console.log(`Follow tx in https://rinkeby.etherscan.io/tx/${txHash}`);

const getStageStation = async () => {
  const contractAddress = "0xa9a24f50aabf8ac11314f2ac7757d6975ea0d8fd";
  const contract = new ethers.Contract(contractAddress, ERC20_ABI, provider);
  const walletAccount = new ethers.Wallet(METAMASK_PRIVATE_KEY, provider);
  const contractWithSigner = contract.connect(walletAccount);
  const tx = await contractWithSigner.changeStation(0);
  console.log(tx);
}

getStageStation();
