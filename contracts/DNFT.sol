// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@chainlink/contracts/src/v0.8/KeeperCompatible.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract keeperFlower is ERC721, ERC721URIStorage, Ownable, KeeperCompatibleInterface{
    using Counters for Counters.Counter;

    Counters.Counter public tokenIdCounter;
 
   // Metadata information for each stage of the NFT on IPFS.
    string[] IpfsUri = [
        "https://gateway.pinata.cloud/ipfs/QmVTMeyMvEiZScJcjbPATxvRqkY25EQSWkJYML8aqwK5bD/semilla.json",
        "https://gateway.pinata.cloud/ipfs/QmVTMeyMvEiZScJcjbPATxvRqkY25EQSWkJYML8aqwK5bD/germinando.json",
        "https://gateway.pinata.cloud/ipfs/QmVTMeyMvEiZScJcjbPATxvRqkY25EQSWkJYML8aqwK5bD/creciendo.json",
        "https://gateway.pinata.cloud/ipfs/QmVTMeyMvEiZScJcjbPATxvRqkY25EQSWkJYML8aqwK5bD/florecida.json",
        "https://gateway.pinata.cloud/ipfs/QmVTMeyMvEiZScJcjbPATxvRqkY25EQSWkJYML8aqwK5bD/arbol.json"
    ]; 

    uint256 public interval;
    uint256 public lastTimeStamp;

    constructor() ERC721("Flower Platzi", "fPLTZ") {
        interval = 20;
        lastTimeStamp=block.timestamp; 
    }

    function setInterval(uint256 _interval) external onlyOwner
    {
        interval = _interval;
    }

     function checkUpkeep(bytes calldata /* checkData */) external view override returns (bool upkeepNeeded, bytes memory /* performData */) 
    {
        uint256 tokenId=tokenIdCounter.current();
        upkeepNeeded = false;
        if(tokenId>0)
        {
            if(( lastTimeStamp+interval) < ( block.timestamp ))
            {
                while(tokenId>0)
                {
                    tokenId--;   
                    if (flowerStage(tokenId) < 4) 
                    {
                        upkeepNeeded = true;
                        break;
                    }       
                }                
            }
        }
    }

    function performUpkeep(bytes calldata /* performData */) external override
    {
        //We highly recommend revalidating the upkeep in the performUpkeep function
        uint256 tokenId=tokenIdCounter.current();
        if(tokenId>0)
        {
            if(( lastTimeStamp+interval) < ( block.timestamp ))
            {
                bool upkeepNeeded = false;
                while(tokenId>0)
                {
                    tokenId--;   
                    if (flowerStage(tokenId) < 4) 
                    {
                        upkeepNeeded = true;
                        growFlower(tokenId);
                    }       
                }
                if(upkeepNeeded)
                {
                    lastTimeStamp=block.timestamp;
                }
            }
        }

        // We don't use the performData in this example. The performData is generated by the Keeper's call to your checkUpkeep function
    }


    function safeMint(address to) public {
        uint256 tokenId = tokenIdCounter.current();
        tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, IpfsUri[0]);
    }

    function safeGrowFlower(uint256 _tokenId) external
    {
        require(( lastTimeStamp+interval) < ( block.timestamp )  ,"Not time yet");
        growFlower(_tokenId);
    }

    function growFlower(uint256 _tokenId) internal {
        if(flowerStage(_tokenId) >= 4){return;}
        // Get the current stage of the flower and add 1
        uint256 newVal = flowerStage(_tokenId) + 1;
        // store the new URI
        string memory newUri = IpfsUri[newVal];
        // Update the URI
        _setTokenURI(_tokenId, newUri);
    }

    // determine the stage of the flower growth
    function flowerStage(uint256 _tokenId) public view returns (uint256) {
        string memory _uri = tokenURI(_tokenId);
        // Seed
        if (compareStrings(_uri, IpfsUri[0])) 
        {
            return 0;
        }
        // Sprout
        if (compareStrings(_uri, IpfsUri[1]) ) 
        {
            return 1;
        }
        if (compareStrings(_uri, IpfsUri[2]) ) 
        {
            return 2;
        }
        if (compareStrings(_uri, IpfsUri[3]) ) 
        {
            return 3;
        }
        // Must be a Bloom
        return 4;
    }

    // helper function to compare strings
    function compareStrings(string memory a, string memory b)
        public
        pure
        returns (bool)
    {
        return (keccak256(abi.encodePacked((a))) ==
            keccak256(abi.encodePacked((b))));
    }

    // The following functions is an override required by Solidity.
    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    // The following functions is an override required by Solidity.
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
//End

