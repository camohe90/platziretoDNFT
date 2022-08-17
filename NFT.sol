// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTPLATZI is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    string[] URIData = [
        "https://gateway.pinata.cloud/ipfs/QmPPDjU4tpt24S86TkvGUX4BwAjJe4JzGog5vs1Pvwt3ni",
        "https://gateway.pinata.cloud/ipfs/QmUrpLy2wEcYWTyQ7zqHAvgV4xWkAxGMiU8vr8rikrLbk8",
        "https://gateway.pinata.cloud/ipfs/QmUPX2B3irLqoGuPhQ38Hafeg6LFCsaieRxygRhcMvRKmA",
        "https://gateway.pinata.cloud/ipfs/QmXn3MBZ8JfmsYhDPW6twgH8bim2pmWMVeuc5uaXRSBUgk",
        "https://gateway.pinata.cloud/ipfs/Qmb1h3oYR1L1tWa13JaqcJ4BfjzSHgrqc257EJZxSisNjn"
        ];

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("NFTPLATZI", "PLTZ") {}

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, URIData[0]);
    }

    function changeData(uint _tokenId) public {
        for(uint i = 0; i < 3; i++){
            _setTokenURI(_tokenId, URIData[i]);
        }
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