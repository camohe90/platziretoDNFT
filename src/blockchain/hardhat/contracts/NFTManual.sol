// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTManual is ERC721, ERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter public tokenIdCounter;

    // Metadata information for each stage of the NFT on IPFS.
    string[] IpfsUri = [
        "https://gateway.pinata.cloud/ipfs/QmUrCMNAFRVGzRFZnUketpBWXbXky2Ygfa6iyVzhoNQhmK",
        "https://gateway.pinata.cloud/ipfs/QmeD8eDLi2w2GSpBoxid3rnZLXo7iEeZJ2NvgghFQ3FVaw",
        "https://gateway.pinata.cloud/ipfs/QmRA2A9x1SozdHHLS84ccD4rtgdiVaaHxSGxgoKnmDPcxj",
        "https://gateway.pinata.cloud/ipfs/QmXfDRDfrDJ8KBMaR5HtscuA5fLZy4uWzycr4FwA4JkzS3",
        "https://gateway.pinata.cloud/ipfs/QmXTFYRixLuydCLyZZ1TuaDounGHGkw9aDiXEhCKYXysYq"
    ];

    uint256 lastTimeStamp;
    uint256 interval;

    constructor() ERC721("NFTManual", "MNL") {
    }

    function safeMint(address to) public {
        uint256 tokenId = tokenIdCounter.current();
        tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, IpfsUri[0]);
    }

    function changeNumber(uint256 _tokenId) public {
        if (numberStage(_tokenId) >= 4) {
            _setTokenURI(_tokenId, IpfsUri[0]);
            return;
        }
        // Get the current number and add 1
        uint256 newVal = numberStage(_tokenId) + 1;
        // store the new URI
        string memory newUri = IpfsUri[newVal];
        // Update the URI
        _setTokenURI(_tokenId, newUri);
    }

    // determine the stage of number
    function numberStage(uint256 _tokenId) public view returns (uint256) {
        string memory _uri = tokenURI(_tokenId);
        // number I
        if (compareStrings(_uri, IpfsUri[0])) {
            return 0;
        }
        // number II
        if (compareStrings(_uri, IpfsUri[1])) {
            return 1;
        }
        // number III
        if (compareStrings(_uri, IpfsUri[2])) {
            return 2;
        }
        // number IV
        if (compareStrings(_uri, IpfsUri[3])) {
            return 3;
        }
        // number V
        return 4;
    }

    // helper function to compare strings
    function compareStrings(string memory a, string memory b) public pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) ==
            keccak256(abi.encodePacked((b))));
    }

    // The following functions is an override required by Solidity.
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    // The following functions is an override required by Solidity.
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
}
