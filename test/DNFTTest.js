const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

const interval = 120;
const name = "Flower Platzi";
const symbol = "fPLTZ";

describe("DNFT tests", function() {
  let deployer;
  let userAccount;
  let NftToken;
  let nftToken;

  let fetchedTokenName;
  let fetchedTokenSymbol;
  let fetchedownerAmount;

  describe("tests", function () {
    before(async function() {
      const availableSigners = await ethers.getSigners();
      //const [owner, addr1, addr2] = await ethers.getSigners();
      deployer = availableSigners[0];
      userAccount=availableSigners[1];
      console.log(deployer.address+"!="+userAccount.address);

      const NftToken = await ethers.getContractFactory("keeperFlower");

      const nftToken = await NftToken.deploy();
      
      await nftToken.deployed();

      fetchedTokenName = await nftToken.name();
      fetchedTokenSymbol = await nftToken.symbol();
      await nftToken.safeMint(deployer.address);
      await nftToken.safeMint(deployer.address);
      await nftToken.safeMint(userAccount.address);
      fetchedownerAmount = await nftToken.balanceOf(deployer.address);
      fetcheduserAmount = await nftToken.balanceOf(userAccount.address);

      console.log("minted="+fetchedownerAmount);

    });

    it('Should be named Flower Platzi', async function() {
      expect(fetchedTokenName).to.be.equal(name);
    });

    it('Should have symbol "fPLTZ"', async function() {
      expect(fetchedTokenSymbol).to.be.equal(symbol);
    });

    it("owner should have 2 nft", async function () {  
      expect(fetchedownerAmount).to.be.equal(2);
    });

    it("user should have 1 nft", async function () {  
      expect(fetcheduserAmount).to.be.equal(1);
    });
  });



});