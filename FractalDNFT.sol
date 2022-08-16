// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract FractalToken is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    string[] uri = [
        "https://gateway.pinata.cloud/ipfs/QmYHstowA8iAWoKtML7pMAEkcsBW5bXaaiCZNQDjebdP8M",
        "https://gateway.pinata.cloud/ipfs/QmfKBbPu91fPCqSq4j8cYRiP5Z3Yk8mX2Du48Hu43NQNbU"
    ]; 

    constructor() ERC721("FractalToken", "FRTK") {}

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri[0]);
    }

    function upgradeNFT(uint _tokenId) public {
        _setTokenURI(_tokenId, uri[1]);
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