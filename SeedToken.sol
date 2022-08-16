// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SeedToken is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    string [] uriData = ["https://gateway.pinata.cloud/ipfs/QmVyeLioibznzVKoC4y4SYnPsd3yRCeWuKpebWFkbofyJZ",
                         "https://gateway.pinata.cloud/ipfs/Qmbda1nrSPvbgN5cYjuHMLLzNdsHPYFk3jekQgTsmAb71B"];

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("SeedToken", "STK") {}

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uriData[0]);
    }

    function changeData(uint256 _tokenId) public{
        _setTokenURI(_tokenId, uriData[1]);
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