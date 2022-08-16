// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTPLATZI is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    uint indexData = 3;
    string[] uriData = [
        "https://gateway.pinata.cloud/ipfs/QmeJHjTMhC3RqxMC1UQSnmQL1y7BwwVT431ugKFzCrh9du",
        "https://gateway.pinata.cloud/ipfs/QmdEdF5FkPpsN2DAHzuLtGudXD25AquRik2y5KnfFz1sew",
        "https://gateway.pinata.cloud/ipfs/QmctEztxEJmykZX5zT19rJmBYSbK2RKvxcSu8G1p4VJYGd"
    ];

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("NFTPLATZI", "PTLZ") {}

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        indexData = 0;
        _setTokenURI(tokenId, uriData[indexData]);
    }

    function changeData(uint _tokenId) public onlyOwner {
        indexData++;
        _setTokenURI(_tokenId, uriData[indexData]);
        if(indexData == 2) {
            indexData = 0;
        }
    }

    function safeBurn(uint _tokenId) public onlyOwner{
        _burn(_tokenId);
    }

    // The following functions is an override required by Solidity.
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
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