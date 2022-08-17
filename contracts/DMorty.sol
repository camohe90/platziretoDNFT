// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "@chainlink/contracts/src/v0.8/KeeperCompatible.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DMorty is ERC721, ERC721URIStorage, KeeperCompatibleInterface {
    using Counters for Counters.Counter;

    Counters.Counter public tokenIdCounter;
 
   // Metadata information for each stage of the NFT on IPFS.
    string[] IpfsUri = [
        "https://ipfs.io/ipfs/QmTWW6BJDtKyhfDG2Ni3pY7g9gxNR5zWpdDhXpUDad9RGG/morty1.json",
        "https://ipfs.io/ipfs/QmTWW6BJDtKyhfDG2Ni3pY7g9gxNR5zWpdDhXpUDad9RGG/morty2.json",
        "https://ipfs.io/ipfs/QmTWW6BJDtKyhfDG2Ni3pY7g9gxNR5zWpdDhXpUDad9RGG/morty3.json",
        "https://ipfs.io/ipfs/QmTWW6BJDtKyhfDG2Ni3pY7g9gxNR5zWpdDhXpUDad9RGG/morty4.json",
        "https://ipfs.io/ipfs/QmTWW6BJDtKyhfDG2Ni3pY7g9gxNR5zWpdDhXpUDad9RGG/morty5.json",
        "https://ipfs.io/ipfs/QmTWW6BJDtKyhfDG2Ni3pY7g9gxNR5zWpdDhXpUDad9RGG/morty6.json"
    ]; 

    uint256 lastTimeStamp;
    uint256 interval;

    constructor(uint _interval) ERC721("Morty", "MTY") {
        interval = _interval;
        lastTimeStamp = block.timestamp;
    }

    function checkUpkeep(bytes calldata /* checkData */) external view override returns (bool upkeepNeeded, bytes memory /* performData */) {
        uint256 tokenId = tokenIdCounter.current() - 1;
        bool done;
        if (mortyStage(tokenId) >= 5) {
            done = true;
        }

        upkeepNeeded = !done && ((block.timestamp - lastTimeStamp) > interval);        
        // We don't use the checkData in this example. The checkData is defined when the Upkeep was registered.
    }

    function performUpkeep(bytes calldata /* performData */) external override {
        //We highly recommend revalidating the upkeep in the performUpkeep function
        if ((block.timestamp - lastTimeStamp) > interval ) {
            lastTimeStamp = block.timestamp;            
            uint256 tokenId = tokenIdCounter.current() - 1;
            changeMorty(tokenId);
        }
        // We don't use the performData in this example. The performData is generated by the Keeper's call to your checkUpkeep function
    }

    function safeMint(address to) public {
        uint256 tokenId = tokenIdCounter.current();
        tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, IpfsUri[0]);
    }

    function changeMorty(uint256 _tokenId) public {
        if(mortyStage(_tokenId) >= 5){return;}
        
        uint256 newVal = mortyStage(_tokenId) + 1;
        
        string memory newUri = IpfsUri[newVal];
        
        _setTokenURI(_tokenId, newUri);
    }

    // determine the stage of the morty change
    function mortyStage(uint256 _tokenId) public view returns (uint256) {
        string memory _uri = tokenURI(_tokenId);
        
        if (compareStrings(_uri, IpfsUri[0])) {
            return 0;
        }
        
        if (
            compareStrings(_uri, IpfsUri[1]) 
        ) {
            return 1;
        }

        if (compareStrings(_uri, IpfsUri[2])) {
            return 2;
        }
        
        if (
            compareStrings(_uri, IpfsUri[3]) 
        ) {
            return 3;
        }

        if (compareStrings(_uri, IpfsUri[4])) {
            return 4;
        }
        
        return 5;
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
