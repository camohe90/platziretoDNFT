// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
//Added the keeper compatible 
import "@chainlink/contracts/src/v0.8/KeeperCompatible.sol";

contract NFTPlatzi2 is ERC721, ERC721URIStorage, Ownable, KeeperCompatibleInterface  {
    using Counters for Counters.Counter;
    string[] uriData = [
    "https://gateway.pinata.cloud/ipfs/QmTeG35uzLvx6Yy5PyiKMZSMS2ZiwqxVkp4E6Eiv9mzFXk",
    "https://gateway.pinata.cloud/ipfs/QmVXSDPqieG4hZFciYFTfCod1KyKvruyoVu5zyS3FC4WQD",
    "https://gateway.pinata.cloud/ipfs/QmcQ2HgPAa2kcvinmMj6g863tiC5uEbF2kpj7Bmx6QEUpb",
    "https://gateway.pinata.cloud/ipfs/QmXLQzwLgSv3NCweBhg3hq37xcswPPkQ47m6iL6KjDNHPb",
    "https://gateway.pinata.cloud/ipfs/QmVMv3Yr5ugxUiMFAEDcF7SbMLnSsqya5rQCZkGzPdbujB"
    ];

    //added state variables for the keepers functions
    uint interval;
    uint lastTimeStamp;

    Counters.Counter private _tokenIdCounter;

    constructor(uint _interval) ERC721("NFTPLATZI", "PLTZ") {
        //the user has to initialize the value for intervals
        //the lasTimeStamp deppends of global variable, means current timestamp in seconds
        interval = _interval;
        lastTimeStamp = block.timestamp;
    }

     function checkUpkeep(bytes calldata /* checkData */) external view override returns (bool upkeepNeeded, bytes memory /* performData */) {
         uint tokenId = _tokenIdCounter.current() - 1;
        // i left the keepper update the metadata until the LINK's over     
        upkeepNeeded = (block.timestamp - lastTimeStamp) > interval;

    }

    function performUpkeep(bytes calldata /* performData */) external override {
        if ((block.timestamp - lastTimeStamp) > interval ) {
            lastTimeStamp = block.timestamp;
            uint tokenId = _tokenIdCounter.current() - 1;
            changeStatus(tokenId);
        }
    }

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uriData[0]);
    }

    function changeStatus(uint256 _tokenId) public {
        if(changeStage(_tokenId) >= 4){return;}
        // Get the current stage of the mickey and add 1
        uint256 newVal = changeStage(_tokenId) + 1;
        // store the new URI
        string memory newUri = uriData[newVal];
        // Update the URI
        _setTokenURI(_tokenId, newUri);
    }


    // determine the stage of the mickey mouse
    function changeStage(uint256 _tokenId) public view returns (uint256) {
        string memory _uri = tokenURI(_tokenId);
        // Loop to compare the stage of the mickey and assign the uri
         for (uint i = 0; i < uriData.length; i++) {
            if (compareStrings(_uri, uriData[i])) {
            return i;
        }
        }
        //when the uriData[4], return the uriData[4]
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

    // The following functions are overrides required by Solidity.
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}