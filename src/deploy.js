async function main() {
  const[deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account: ", deployer.address);
  console.log("Account balance: ", (await deployer.getBalance()).toString());
  const contract = await ethers.getContractFactory("keeperChrist");
  const deploy = await contract.deploy(300);
  console.log("Contract deployed to address: ", deploy.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

