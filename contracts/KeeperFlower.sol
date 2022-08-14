// SPDX-License-Identifier: MIT
pragma solidity 0.8.6;

import "@chainlink/contracts/src/v0.8/KeeperCompatible.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract KeeperFlower is ERC721, ERC721URIStorage, KeeperCompatibleInterface {
    using Counters for Counters.Counter;

    Counters.Counter public tokenIdCounter;

    // Metadata information for each stage of the NFT on IPFS.
    string[] ipfsUris;

    mapping(uint256 => string[]) tokenIdToURIS;
    mapping(address => uint256[]) ownerToTokensId;

    uint256 lastTimeStamp;
    uint256 interval;

    constructor(uint256 _interval, string[] memory _ifpsUris) ERC721("Flower Platzi", "FPLTZ") {
        interval = _interval;
        lastTimeStamp = block.timestamp;
        ipfsUris = _ifpsUris;
    }

    function checkUpkeep(
        bytes calldata /* checkData */
    )
        external
        view
        override
        returns (
            bool upkeepNeeded,
            bytes memory /* performData */
        )
    {
        uint256 tokenId = tokenIdCounter.current() - 1;
        bool done;
        if (flowerStage(tokenId) >= 4) {
            done = true;
        }

        upkeepNeeded = !done && ((block.timestamp - lastTimeStamp) > interval);
        // We don't use the checkData in this example. The checkData is defined when the Upkeep was registered.
    }

    function performUpkeep(
        bytes calldata /* performData */
    ) external override {
        //We highly recommend revalidating the upkeep in the performUpkeep function
        if ((block.timestamp - lastTimeStamp) > interval) {
            lastTimeStamp = block.timestamp;
            uint256 tokenId = tokenIdCounter.current() - 1;
            growFlower(tokenId);
        }
        // We don't use the performData in this example. The performData is generated by the Keeper's call to your checkUpkeep function
    }

    function safeMint(address to, string[] memory _ifpsUris) public {
        uint256 tokenId = tokenIdCounter.current();
        tokenIdToURIS[tokenId] = (_ifpsUris.length) == 0 ? ipfsUris : _ifpsUris;
        tokenIdCounter.increment();

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenIdToURIS[tokenId][0]);
        ownerToTokensId[msg.sender].push(tokenId);
    }

    function growFlower(uint256 _tokenId) public {
        if (flowerStage(_tokenId) >= 4) {
            return;
        }
        // Get the current stage of the flower and add 1
        uint256 newVal = flowerStage(_tokenId) + 1;
        // store the new URI
        string memory newUri = tokenIdToURIS[_tokenId][newVal];
        // Update the URI
        _setTokenURI(_tokenId, newUri);
    }

    // determine the stage of the flower growth
    function flowerStage(uint256 _tokenId) public view returns (uint256) {
        string memory _uri = tokenURI(_tokenId);
        // Seed
        if (compareStrings(_uri, tokenIdToURIS[_tokenId][0])) {
            return 0;
        }
        // Sprout
        if (compareStrings(_uri, tokenIdToURIS[_tokenId][1])) {
            return 1;
        }
        //Bloom
        if (compareStrings(_uri, tokenIdToURIS[_tokenId][2])) {
            return 2;
        }
        //Polinization
        if (compareStrings(_uri, tokenIdToURIS[_tokenId][3])) {
            return 3;
        }
        // Seed Dispersal
        return 4;
    }

    // helper function to compare strings
    function compareStrings(string memory a, string memory b) public pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }

    // The following functions is an override required by Solidity.
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    //Burn Token if you are the owner of token
    function burnToken(uint256 tokenId) public {
        if (ownerOf(tokenId) == msg.sender) {
            _burn(tokenId);

            delete tokenIdToURIS[tokenId];
            removeTokenIdFromOwner(tokenId);
        }
    }

    function removeTokenIdFromOwner(uint256 tokenId) private {
        uint256[] memory actualTokensId = ownerToTokensId[msg.sender];
        ownerToTokensId[msg.sender] = new uint256[](0);

        for (uint256 i = 0; actualTokensId.length > i; i++) {
            if (actualTokensId[i] != tokenId) {
                ownerToTokensId[msg.sender].push(actualTokensId[i]);
            }
        }
    }

    // The following functions is an override required by Solidity.
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function getTokensId() public view returns (uint256[] memory) {
        return ownerToTokensId[msg.sender];
    }
}
