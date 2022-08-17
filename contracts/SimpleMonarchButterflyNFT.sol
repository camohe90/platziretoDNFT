// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SimpleMonarchButterfly is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    string[] private pinataUri = [
        "https://gateway.pinata.cloud/ipfs/QmWN6aN6hah8cgEn4WyxUNrdtcc7nQrQb9Xjh1Wssg6v1M",
        "https://gateway.pinata.cloud/ipfs/Qmd8Yss7nM9K46A1auy54BQ6ZDFW8h7tXND7SpepnfhR7s",
        "https://gateway.pinata.cloud/ipfs/QmUegtmLm3TBy6GhLWiyNKEacLpBjEJDgQ179jpggpGceJ",
        "https://gateway.pinata.cloud/ipfs/QmWGvXfWJafgtqNUunHD7KSHgFxgSLvM17E2QMhrToy6yc",
        "https://gateway.pinata.cloud/ipfs/QmY6Gjxvzp5mfAeSRdwDmNtKe2ukstVYHk2RtwVQefbQJb"
    ];

    constructor() ERC721("Simple Monarch Butterfly", "SMNBF") {}

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, pinataUri[0]);
    }

    function upgradeNFT(uint _tokenId) public {
        _setTokenURI(_tokenId, pinataUri[1]);
    }

    // The following functions are overrides required by Solidity.
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
} 