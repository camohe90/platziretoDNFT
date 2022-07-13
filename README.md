# platziretoDNFT
Vamos a aprender a crear NFT's dinámicos, lo que significa que pueden cambiar su metadata dependiendo de ciertas condiciones que definamos. Para lograrlo necesitamos usar algunos servicios de chainlink

Los pasos que debes seguir son:

1 Debes subir las imagenes de la metadata que quieres que cambie del NFT a una red IPFS, puede usar https://www.pinata.cloud/
2 En remix debes desplegar el contrato inteligente, para ellos necesitas tokens para la red de prueba rinkeby que puedes solicitar en este faucet https://faucets.chain.link/
3 Debemos validar que nuestro contrato inteligente se desplego correctamente y que podamos visualizar nuestro NFT en el ambiente de pruebas de OpenSea https://testnets.opensea.io/
4 Vamos a crear en la pagina de chainlink ese elemento que nos va a permitir automatizar el cambio de la metadata de nuestro NFT, para ello debemos ingresar en la pagina https://keepers.chain.link.
5 Seleccionamos la opción "register new upkeep"
6 A continuación seleccionamos "Custom-logic"
7 Debemos ingresar la dirección del contrato inteligente que desplegamos en Remix
8 Ingresamos los siguientes valores Upkeep name, Gas limit: 200000, Starting balance (LINK):5, Your email address
9 Aprobamos la transacción
10 Ya podemos ver como nuestro NFT va a cambiar metadata dependiendo del tiempo que hayamos definido en el keeper de chainlink
