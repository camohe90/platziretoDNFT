// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTDinamic is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    string[] urlData = [
        'https://gateway.pinata.cloud/ipfs/QmQ5PSNDZEzUvcPdGd73zzFiY6NJHAyzwnUzVcJnUgy7Xs/creciendo.json',
        'https://gateway.pinata.cloud/ipfs/QmQ5PSNDZEzUvcPdGd73zzFiY6NJHAyzwnUzVcJnUgy7Xs/florecida.json'
    ];

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("NFTDinamic", "DNC") {}

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, urlData[0]);
    }

    function changeData(uint _tokenId) public {
       _setTokenURI(_tokenId, urlData[1]); 
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