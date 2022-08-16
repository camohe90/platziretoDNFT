// SPDX-License-Identifier: MIT
pragma solidity 0.8.6;

import "@chainlink/contracts/src/v0.8/KeeperCompatible.sol";
import "@openzeppelin/contracts@4.6.0/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts@4.6.0/utils/Counters.sol";

contract EvolvingPokemon is ERC721, ERC721URIStorage, KeeperCompatibleInterface {
    using Counters for Counters.Counter;

    Counters.Counter public tokenIdCounter;
 
   // Metadata information for each stage of the NFT on Pinata.
    string[] PinataUri = [
        "https://gateway.pinata.cloud/ipfs/QmWexRToFgpoYAA5URp7we1ckKQwGWZ5cePgTcNWA9V2sE/evee.json",
        "https://gateway.pinata.cloud/ipfs/QmWexRToFgpoYAA5URp7we1ckKQwGWZ5cePgTcNWA9V2sE/flareon.json",
        "https://gateway.pinata.cloud/ipfs/QmWexRToFgpoYAA5URp7we1ckKQwGWZ5cePgTcNWA9V2sE/jolteon.json",
        "https://gateway.pinata.cloud/ipfs/QmWexRToFgpoYAA5URp7we1ckKQwGWZ5cePgTcNWA9V2sE/vaporeon.json",
        "https://gateway.pinata.cloud/ipfs/QmWexRToFgpoYAA5URp7we1ckKQwGWZ5cePgTcNWA9V2sE/umbreon.json",
        "https://gateway.pinata.cloud/ipfs/QmWexRToFgpoYAA5URp7we1ckKQwGWZ5cePgTcNWA9V2sE/espeon.json"
    ];

    uint256 lastTimeStamp;
    uint256 interval;

    constructor(uint _interval) ERC721("Evolving Pokemon", "ePKMN") {
        interval = _interval;
        lastTimeStamp = block.timestamp;
    }

    function checkUpkeep(bytes calldata /* checkData */) external view override returns (bool upkeepNeeded, bytes memory /* performData */) {
        uint256 tokenId = tokenIdCounter.current() - 1;
        bool done;
        if (eveeStage(tokenId) >= 5) {
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
            evolveEvee(tokenId);
        }
        // We don't use the performData in this example. The performData is generated by the Keeper's call to your checkUpkeep function
    }

    function safeMint(address to) public {
        uint256 tokenId = tokenIdCounter.current();
        tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, PinataUri[0]);
    }

    function evolveEvee(uint256 _tokenId) public {
        if(eveeStage(_tokenId) >= 5){return;}
        // Get the current stage of the flower and add 1
        uint256 newVal = eveeStage(_tokenId) + 1;
        // store the new URI
        string memory newUri = PinataUri[newVal];
        // Update the URI
        _setTokenURI(_tokenId, newUri);
    }

    // determine the stage of the flower growth
    function eveeStage(uint256 _tokenId) public view returns (uint256) {
        string memory _uri = tokenURI(_tokenId);
        // Evee
        if (compareStrings(_uri, PinataUri[0])) {
            return 0;
        }

        if (
            compareStrings(_uri, PinataUri[1]) 
        ) {
            return 1;
        }
        if (
            compareStrings(_uri, PinataUri[2]) 
        ) {
            return 2;
        }
        if (
            compareStrings(_uri, PinataUri[3]) 
        ) {
            return 3;
        }
        if (
            compareStrings(_uri, PinataUri[4]) 
        ) {
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