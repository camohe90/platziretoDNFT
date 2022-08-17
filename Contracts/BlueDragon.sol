// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BlueDragon is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    string[] uriData = [
            "https://gateway.pinata.cloud/ipfs/QmTyf3WE89ezETCcrZpRvTaF1zjyUhwXP4fqC3tkCNn9jr",
            "https://gateway.pinata.cloud/ipfs/QmSiZ4XE9an72QdmaHfmFMJ3TxjZUmXHCLFkCzXTiZY2EL",
            "https://gateway.pinata.cloud/ipfs/Qmeh1GwaygAhDediixrkrwRVDdkpxmrjnX13MNXTrt1hPj"
        ];
    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("BlueDragon", "BLD") {}

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
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