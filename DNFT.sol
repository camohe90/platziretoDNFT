
pragma solidity 0.8.7;

import "https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/interfaces/KeeperCompatibleInterface.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Counters.sol";


contract ButterflyKeeper is ERC721, ERC721URIStorage, KeeperCompatibleInterface {
    using Counters for Counters.Counter;

    Counters.Counter public tokenIdCounter;
 
    string[] IpfsUri = [
        "https://gateway.pinata.cloud/ipfs/QmeZJrh4JQeqECY7taoikMDewC8RUuEN3mRitoriSayrRr/fase1.json",
        "https://gateway.pinata.cloud/ipfs/QmeZJrh4JQeqECY7taoikMDewC8RUuEN3mRitoriSayrRr/fase2.json",
        "https://gateway.pinata.cloud/ipfs/QmeZJrh4JQeqECY7taoikMDewC8RUuEN3mRitoriSayrRr/fase3.json",
        "https://gateway.pinata.cloud/ipfs/QmeZJrh4JQeqECY7taoikMDewC8RUuEN3mRitoriSayrRr/fase4.json",
        "https://gateway.pinata.cloud/ipfs/QmeZJrh4JQeqECY7taoikMDewC8RUuEN3mRitoriSayrRr/fase5.json"
    ]; 

    uint256 lastTimeStamp;
    uint256 interval;

    constructor(uint _interval) ERC721("Butterflies", "BNFT") {
        interval = _interval;
        lastTimeStamp = block.timestamp;
    }

    function checkUpkeep(bytes calldata /* checkData */) external view override returns (bool upkeepNeeded, bytes memory /* performData */) {
        uint256 tokenId = tokenIdCounter.current() - 1;
        bool done;
        if (butterflyStage(tokenId) >= 4) {
            done = true;
        }

        upkeepNeeded = !done && ((block.timestamp - lastTimeStamp) > interval);        
    }

    function performUpkeep(bytes calldata /* performData */) external override {
        if ((block.timestamp - lastTimeStamp) > interval ) {
            lastTimeStamp = block.timestamp;            
            uint256 tokenId = tokenIdCounter.current() - 1;
            growButterfly(tokenId);
        }
    }

    function safeMint(address to) public {
        uint256 tokenId = tokenIdCounter.current();
        tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, IpfsUri[0]);
    }

    function growButterfly(uint256 _tokenId) public {
        if(butterflyStage(_tokenId) >= 4){return;}
        uint256 newVal = butterflyStage(_tokenId) + 1;
        string memory newUri = IpfsUri[newVal];
        _setTokenURI(_tokenId, newUri);
    }

    function butterflyStage(uint256 _tokenId) public view returns (uint256) {
        string memory _uri = tokenURI(_tokenId);
        if (compareStrings(_uri, IpfsUri[0])) {
            return 0;
        }
        else if (
            compareStrings(_uri, IpfsUri[1]) 
        ) {
            return 1;
        }

        else if (
            compareStrings(_uri, IpfsUri[2]) 
        ) {
            return 2;
        }

        else if (
            compareStrings(_uri, IpfsUri[3]) 
        ) {
            return 3;
        }

        else  {
            return 4;
        }  
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
