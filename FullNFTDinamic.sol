//Begin
// SPDX-License-Identifier: MIT
pragma solidity 0.8.6;

import "@chainlink/contracts/src/v0.8/KeeperCompatible.sol";
import "@openzeppelin/contracts@4.6.0/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts@4.6.0/utils/Counters.sol";

contract randomMen is ERC721, ERC721URIStorage, KeeperCompatibleInterface {
    using Counters for Counters.Counter;

    Counters.Counter public tokenIdCounter;

    // Metadata information for each stage of the NFT on IPFS.
    string[] pinataUri = [
        "https://gateway.pinata.cloud/ipfs/QmY24XCZrr3zEdYYwLhqAVyhXsojbbsKWTbkTL1AgR6xne/ehtDevProgram%20reto%20mes%202%20avatar%20random%201.json",
        "https://gateway.pinata.cloud/ipfs/QmY24XCZrr3zEdYYwLhqAVyhXsojbbsKWTbkTL1AgR6xne/ehtDevProgram%20reto%20mes%202%20avatar%20random%202.json",
        "https://gateway.pinata.cloud/ipfs/QmY24XCZrr3zEdYYwLhqAVyhXsojbbsKWTbkTL1AgR6xne/ehtDevProgram%20reto%20mes%202%20avatar%20random%203.json",
        "https://gateway.pinata.cloud/ipfs/QmY24XCZrr3zEdYYwLhqAVyhXsojbbsKWTbkTL1AgR6xne/ehtDevProgram%20reto%20mes%202%20avatar%20random%204.json",
        "https://gateway.pinata.cloud/ipfs/QmY24XCZrr3zEdYYwLhqAVyhXsojbbsKWTbkTL1AgR6xne/ehtDevProgram%20reto%20mes%202%20avatar%20random%205.json"
    ];

    uint256 lastTimeStamp;
    uint256 interval;

    constructor(uint256 _interval) ERC721("Random Men Platzi", "RM_PTZ") {
        interval = _interval;
        lastTimeStamp = block.timestamp;
    }

    function checkUpkeep(bytes calldata)
        external
        view
        override
        returns (bool upkeepNeeded, bytes memory)
    {
        uint256 tokenId = tokenIdCounter.current() - 1;
        bool done;
        if (manStage(tokenId) >= 4) {
            done = true;
        }

        upkeepNeeded = !done && ((block.timestamp - lastTimeStamp) > interval);
    }

    function performUpkeep(bytes calldata) external override {
        if ((block.timestamp - lastTimeStamp) > interval) {
            lastTimeStamp = block.timestamp;
            uint256 tokenId = tokenIdCounter.current() - 1;
            changeMan(tokenId);
        }
    }

    function safeMint(address to) public {
        uint256 tokenId = tokenIdCounter.current();
        tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, pinataUri[0]);
    }

    function changeMan(uint256 _tokenId) public {
        if (manStage(_tokenId) >= 4) {
            return;
        }
        uint256 newVal = manStage(_tokenId) + 1;
        string memory newUri = pinataUri[newVal];
        _setTokenURI(_tokenId, newUri);
    }

    function manStage(uint256 _tokenId) public view returns (uint256) {
        string memory _uri = tokenURI(_tokenId);
        if (compareStrings(_uri, pinataUri[0])) {
            return 0;
        }
        if (compareStrings(_uri, pinataUri[1])) {
            return 1;
        }
        if (compareStrings(_uri, pinataUri[2])) {
            return 2;
        }
        if (compareStrings(_uri, pinataUri[3])) {
            return 3;
        }
        return 4;
    }

    function compareStrings(string memory a, string memory b)
        public
        pure
        returns (bool)
    {
        return (keccak256(abi.encodePacked((a))) ==
            keccak256(abi.encodePacked((b))));
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
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
