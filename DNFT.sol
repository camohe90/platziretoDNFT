// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "@chainlink/contracts/src/v0.8/KeeperCompatible.sol";
import "@openzeppelin/contracts@4.6.0/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts@4.6.0/utils/Counters.sol";

contract dynamicFlowerPlatzi is ERC721, ERC721URIStorage, KeeperCompatibleInterface {
    using Counters for Counters.Counter;

    Counters.Counter public tokenIdCounter;
 
   // Metadata information for each stage of the NFT on IPFS.
    string[] IpfsUri = [
        "https://gateway.pinata.cloud/ipfs/QmQrzxt1fvzoR6J91FTe58dd8Dg79CfPmPKhzhkDZKS1xP",
        "https://gateway.pinata.cloud/ipfs/QmeJmauVJk6j6jp2xtRfx1QpRsjGjYJMLqQSiuRgrHVHdT",
        "https://gateway.pinata.cloud/ipfs/QmfWfqhhWFN1acW25iZ5chhDUBjPitgpRHHrHccpmetAmY",
        "https://gateway.pinata.cloud/ipfs/QmTzqVwz2DtgpePnXh8WwRxfFZNJ3b1PfsseKgP3ZWuyEg",
        "https://gateway.pinata.cloud/ipfs/QmR3NEZdDby4iSLKNkq4UUPBxjN3a38LfZQYcCEjQDxTVN"
    ]; 

    uint256 lastTimeStamp;
    uint256 interval;

    constructor(uint _interval) ERC721("Dynamic Flower", "DFLWR") {
        interval = _interval;
        lastTimeStamp = block.timestamp;
    }

    function checkUpkeep(bytes calldata ) external view override returns(bool upkeepNeeded, bytes memory) {
        uint256 tokenId = tokenIdCounter.current() - 1;
        bool done;
        if (flowerStage(tokenId) >= 4) {
            done = true;
        }

        upkeepNeeded = !done && ((block.timestamp - lastTimeStamp) > interval);        
    }

    function performUpkeep(bytes calldata) external override {
        if ((block.timestamp - lastTimeStamp) > interval ) {
            lastTimeStamp = block.timestamp;            
            uint256 tokenId = tokenIdCounter.current() - 1;
            growFlower(tokenId);
        }
    }

    function safeMint(address to) public {
        uint256 tokenId = tokenIdCounter.current();
        tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, IpfsUri[0]);
    }

    function growFlower(uint256 _tokenId) public {
        if(flowerStage(_tokenId) >= 4){return;}
        uint256 newVal = flowerStage(_tokenId) + 1;
        string memory newUri = IpfsUri[newVal];
        _setTokenURI(_tokenId, newUri);
    }

    function flowerStage(uint256 _tokenId) public view returns (uint256) {
        string memory _uri = tokenURI(_tokenId);
        if (compareStrings(_uri, IpfsUri[0])) {
            return 0;
        }
        if (
            compareStrings(_uri, IpfsUri[1]) 
        ) {
            return 1;
        }
        if (
            compareStrings(_uri, IpfsUri[2]) 
        ) {
            return 2;
        }
        if (
            compareStrings(_uri, IpfsUri[3]) 
        ) {
            return 3;
        }
        return 4;
    }

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