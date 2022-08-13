
# Dynamic NFT

A Dynamic NFT (DNFT) is an NFT that can change its metadata. The change can happen because of many things – especially external conditions. The major benefit of dynamic NFTs is their ability to evolve based on the real-world data changes delivered to the blockchain via oracles.

## Examples

Next, you can find two contracts as solution to this [Challenge](https://github.com/Oriplus/solidity-eth-challenge/blob/main/Retos.md) using an [IPFS](https://www.pinata.cloud/) for storage images and, metadata. Also,
[Keepers](https://keepers.chain.link/) to change dynamically the DNFT.


<details>
<summary>Challenge 1</summary>

## [KeeperFlower](https://github.com/Oriplus/retoDNFT/blob/reto/contracts/KeeperFlower.sol)

It's a DNFT that shows three stages of flower growth:

    1. Seed
    2. Sprout
    3. Bloom

After contract deployment(Remix) with an interval of 5 min in [Rinkeby](https://rinkeby.etherscan.io/address/0x70da28b73c9361b3b709feb4af8dd0e4fda19918#code), an [Upkeeper](https://keepers.chain.link/rinkeby/64023018647980276003552894717984562307962781051787609086304742503427314831054) was created with the 'Custom Logic' option:

    1. Contract address: 0x70dA28b73c9361b3b709feB4AF8dd0E4fdA19918
    2. Name: Flower 
    3. Gas Limit: 200000
    4. Starting balance (LINK): 5
    5. Email
    6. Project Name: Flower

Final result on [OpenSea](https://testnets.opensea.io/assets/rinkeby/0x70da28b73c9361b3b709feb4af8dd0e4fda19918/0) 


[Metadata](https://github.com/Oriplus/retoDNFT/tree/reto/Metadata%20templates/flower-metadata)

[Images](https://github.com/Oriplus/retoDNFT/tree/reto/image/flower-img)

Check this contract [here](https://rinkeby.etherscan.io/address/0x70da28b73c9361b3b709feb4af8dd0e4fda19918#code)

</details>

<details>
<summary>Challenge 2</summary>

## [KeeperOrder](https://github.com/Oriplus/retoDNFT/blob/reto/contracts/KeeperOrder.sol)
It's a DNFT that shows five stages of an order for customers who shop online and want to see the whole process of their purchase, giving them a better shopping experience because they can track their orders.

Order status are:

    1. Created
    2. Processed
    3. Prepared
    4. Shipped
    5. Delivered

After contract deployment(Remix) with an interval of 5 min in [Rinkeby](https://rinkeby.etherscan.io/address/0x5a742e312dd6a1ac25a1ffd592b0283f28a6bc79), an [Upkeeper](https://keepers.chain.link/rinkeby/71691115880082957428526168619259509085587374252898502305905310667257692303589) was created with the 'Custom Logic' option:

    1. Contract address: 0x5a742e312dd6a1ac25a1ffd592b0283f28a6bc79
    2. Name: Order 
    3. Gas Limit: 200000
    4. Starting balance (LINK): 5
    5. Email
    6. Project Name: Order

Final result on [OpenSea](https://testnets.opensea.io/assets/rinkeby/0x5a742e312dd6a1ac25a1ffd592b0283f28a6bc79/0): 

<img src="https://github.com/Oriplus/retoDNFT/blob/reto/image/order-img/opensea-1.png" width="500" height="500" />
<img src="https://github.com/Oriplus/retoDNFT/blob/reto/image/order-img/opensea-2.png" width="500" height="500" />
<img src="https://github.com/Oriplus/retoDNFT/blob/reto/image/order-img/opensea-3.png" width="500" height="500" />
<img src="https://github.com/Oriplus/retoDNFT/blob/reto/image/order-img/opensea-4.png" width="500" height="500" />
<img src="https://github.com/Oriplus/retoDNFT/blob/reto/image/order-img/opensea-5.png" width="500" height="500" />



[Metadata](https://github.com/Oriplus/retoDNFT/tree/reto/Metadata%20templates/order-metadata)

[Images](https://github.com/Oriplus/retoDNFT/tree/reto/image/order-img)

Check this contract [here](https://rinkeby.etherscan.io/address/0x5a742e312dd6a1ac25a1ffd592b0283f28a6bc79)

</details>

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)

