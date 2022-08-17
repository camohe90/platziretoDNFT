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

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uriData[0]);
    }
function changeNumber(uint256 _tokenId) public {
        if (numberStage(_tokenId) >= 2) {
            _setTokenURI(_tokenId, uriData[0]);
            return;
        }
        uint256 newVal = numberStage(_tokenId) + 1; // Get the current number and add 1
        string memory newUri = uriData[newVal]; // store the new URI
        _setTokenURI(_tokenId, newUri);// Update the URI
    }

    // determine the stage of the Nft
    function numberStage(uint256 _tokenId) public view returns (uint256) {
        string memory _uri = tokenURI(_tokenId);
        if (compareStrings(_uri, uriData[0])) {// Dragon 1
            return 0;
        }
        if (compareStrings(_uri, uriData[1])) { // Dragon 2
            return 1;
        }
        return 2; // Dragon 3
    }
     // helper function to compare strings
    function compareStrings(string memory a, string memory b) public pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) ==
            keccak256(abi.encodePacked((b))));
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