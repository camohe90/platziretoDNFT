// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@chainlink/contracts/src/v0.8/KeeperCompatible.sol";
import "@openzeppelin/contracts@4.6.0/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts@4.6.0/utils/Counters.sol";

// KeeperCompatibleInterface

contract DynamicPokemon is ERC721, ERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter public tokenIdCounter;
 
   // Metadata information for each stage of the NFT on IPFS.
    string[] IpfsUri = [
        "https://gateway.pinata.cloud/ipfs/QmYMWHJxUfrVSCJYQERb6XJpXpsTKwYvfuJF5TTkQSRSXX",
        "https://gateway.pinata.cloud/ipfs/QmS5UQCKYsuUyE2gYHNBxW593wzG9SnmTEavAVh7fjRe6L",
        "https://gateway.pinata.cloud/ipfs/QmPkkkYtiiiNuQBsVhb5djX56nifQG6cS8z4qiVxjUmVpP"
    ]; 

    constructor() ERC721("Dynamic Pokemon", "DPKMN") {}

    function safeMint(address to) public {
        uint256 tokenId = tokenIdCounter.current();
        tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, IpfsUri[0]);
    }

    function chageMetadata(uint _tokenId) public {
        _setTokenURI(_tokenId, IpfsUri[1]);
    }

    // The following functions is an override required by Solidity.
    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
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