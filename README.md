# Aprendamos a crear NFT's dinámicos

## Reto 1

Vamos a aprender a crear NFT's dinámicos, lo que significa que pueden cambiar su metadata dependiendo de ciertas condiciones que definamos. 

Para lograrlo necesitamos conectarnos con herramientas que nos provea la información para automatizar nuestro contrato inteligente, es esta ocasión vamos a usar algunos servicios de Chainlink

Los pasos que debes seguir son:

1. Debes subir las imagenes de la metadata que quieres que cambie del NFT a una red IPFS, puede usar [pinata](https://www.pinata.cloud/)
    1. [Stage 1 - Egg](https://gateway.pinata.cloud/ipfs/QmfZPVXYduhvnFbTpJ8X1umoRudpVamXWqNvhWRgS8Jkww)
    2. [Stage 2 - Larva](https://gateway.pinata.cloud/ipfs/QmXVAXsWdXfvkvgpGxCqe24PAZx5SRaNrpdGZtEzUTyh8k)
    3. [Stage 3 - Caterpillar](https://gateway.pinata.cloud/ipfs/QmXJh7vzVWcE6QgjkgJ6dN1wR7R1djx3Grvg7Z6R9JXUAH)
    4. [Stage 4 - Chrysalis](https://gateway.pinata.cloud/ipfs/QmbcWtLbzpT6dwKojNaRc652emYSUqKu2xynjqN7bij2DM)
    5. [Stage 5 - Adult Butterfly](https://gateway.pinata.cloud/ipfs/QmQw6qUCAjWJsnL7dbc13h9Xb9fhXQVBpkmMNdM5TCTiQz)
2. En Remix debes desplegar el contrato inteligente, para ellos necesitas tokens para la red de prueba rinkeby, que puedes solicitar en este [faucet](https://faucets.chain.link/)
3. Debemos validar que nuestro contrato inteligente se desplego correctamente en [rinkeby](https://rinkeby.etherscan.io/) y que podamos visualizar nuestro NFT en el ambiente de pruebas de [OpenSea](https://testnets.opensea.io/)
    1. Contrato en Rinkeby: https://rinkeby.etherscan.io/tx/0xf1c8d17245ecdf6b147c07036b8e470206b9d45fab7d60e6347f8ac781234a62
    2. NFT rn OpenSea: https://testnets.opensea.io/assets/rinkeby/0x9c54847cb7ce4d825f33a60af0bd64fd4f612fa3/0
4. Vamos a crear en la pagina de chainlink ese elemento que nos va a permitir automatizar el cambio de la metadata de nuestro NFT, para ello debemos ingresar en la pagina [keeper](https://keepers.chain.link)
5. Seleccionamos la opción "register new upkeep"
6. A continuación seleccionamos "Custom-logic"
7. Debemos ingresar la dirección del contrato inteligente que desplegamos en Remix
8. Ingresamos los siguientes valores Upkeep name, Gas limit: 200000, Starting balance (LINK):5, Your email address
9. Aprobamos la transacción y esperamos que se proceso para la red de chainlink.
10. Ya podemos ver como nuestro NFT va a cambiar metadata dependiendo del tiempo que hayamos establecido al momento de desplegar el contrato y sera el que ejecute el keeper de chainlink.
11. Para validar que efectivamete la metadata de nuestro NFT esta cambiando, podemos usar las funciones de tokenURI que nos permite saber que metadata tiene determinado NFT o la función flowerStage que retorna un número entre 0-2 y podriamos ver como va incrementado.
12. Si quiere visualizar como cambia la metadata de tu NFT en opensea tienes que ingresar a la colección que creaste, ingresar en el primer elemento y en la esquina superior derecha selección la opción actualizar metadata, finalmente debes actualizar la ventana para poder ver los cambios.

![Actualizar metadata](image/uptadeMetadata_1.jpg)

## Reto 2

1. Modifica el código original del repositorio para permitir que tu NFT tenga 5 cambios de metadata.
Contrato Inteligente: MonarchButterflyNFT
2. Realizar el despliegue del contrato modificado.
    1. Contrato en Rinkeby: https://rinkeby.etherscan.io/address/0xb74d4499Be00EaA624e3D87A8A9bc22FF858C08d
    2. NFT rn OpenSea: https://testnets.opensea.io/assets/rinkeby/0xb74d4499be00eaa624e3d87a8a9bc22ff858c08d/0
3. Crear una nueva automatización por tiempo como se ejecuto en el paso 1.  
[Nueva Automatización](https://keepers.chain.link/rinkeby/89615120766617773194023706581950678373554443020532255325133518513205560718756)
![Nueva Automatización](image/ImagesMonarchButterfly/MonarchButterflyNFTUpkeepDetailsChainlink.jpg)
![Nueva Automatización Ejecutada Completamente](image/ImagesMonarchButterfly/MonarchButterflyNFTUpkeepDetailsChainlinkComplete.jpg)
## Reto 3 (Opcional)

1. Crear una interfaz gráfica con react que permita subir la imagen, el nombre, la descripción,  caracteristicas del NFT y que se encargue de generar el archivo JSON de metadata y lo suba a la red IPFS de su preferencia 
2. Desplegar el contrato inteligente.
3. Realizar las pruebas de funcionamiento


## Recursos

* [Qué es chainlink](https://chainlinkspanishcommunity.medium.com/qu%C3%A9-es-chainlink-6ea80f9ff95e)
* [Documentación de Chainlink ](https://docs.chain.link/docs)

