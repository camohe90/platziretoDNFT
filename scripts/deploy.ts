const { ethers } = require('hardhat');

const deploy = async () => {
    // Se llena con los datos de configuracion (red y llave)
    const [deployer] = await ethers.getSigners();

    console.log(`Deploying the proyect : ${deployer.address}`);

    // Trae el byte code del smart contract
    const DNFT = await ethers.getContractFactory("DMorty");
    // Despliega el contrato
    // el constructor recibe la cantidad de segundos antes de cambiar la metadata
    const deployed = await DNFT.deploy("120");

    // Imprime la dirección en donde se despleg el contrato
    console.log(`DMorty ha sido desplegado: ${deployed.address}`)
};

deploy().then(()=>process.exit(0)).catch(error => {
    console.log(error)
    process.exit(1)
});