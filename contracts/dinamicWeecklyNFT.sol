// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts@4.7.2/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.7.2/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts@4.7.2/access/Ownable.sol";
import "@openzeppelin/contracts@4.7.2/utils/Counters.sol";

contract WeeklyNFT is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    Counters.Counter private _indexIdCounter;

    constructor() ERC721("WeeklyNFT", "WKL") {}

    string[] nftJason = [
        "https://gateway.pinata.cloud/ipfs/QmeJbyBJJyK5BmVK6uNJvX2eWaje2h79VSmigWYx1VYxSK",
        "https://gateway.pinata.cloud/ipfs/QmNXkdHeJRTWjLUUjEwSKfh15k1xdxmTnvD9CqPmxtsDyj",
        "https://gateway.pinata.cloud/ipfs/QmVnkjeryMUxiJVchhpKtzf9ajDgnz9AuaxuUrn3sKvP95",
        "https://gateway.pinata.cloud/ipfs/QmNczuXZHJcEva4RSioHokdAx7mdkcB9avofotdEMLicx4",
        "https://gateway.pinata.cloud/ipfs/Qmd3ousWD9T2tBaKJ1oP37QZUZz8Cuh9K8qAhmLSSxLsCw",
        "https://gateway.pinata.cloud/ipfs/QmVkFREixPNWDrFWDsUena1ti1p34fhXk9guUSErUDLYCN",
        "https://gateway.pinata.cloud/ipfs/Qma6GC8iuzxxUDanHiQBL3DAEgzLzUuxzuZUfmDJnJ4NPE"
    ];

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, nftJason[0]);
    }

    function selectDay(uint _tokenId) public {
        _indexIdCounter.increment();
        uint256 indexId = _indexIdCounter.current();
        if (indexId == 7 ) {
            reset(_tokenId);       
        } else {
            _setTokenURI(_tokenId, nftJason[indexId]);
        }
    }

    function reset(uint _tokenId) public {
        _indexIdCounter.reset();
        _setTokenURI(_tokenId, nftJason[0]);
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