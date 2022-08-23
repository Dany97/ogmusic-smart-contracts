// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract TestNFT is ERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        // Immediately mint some tokens to the sender
        // NB: for testing purpuse only
        _mintMultiple(1, msg.sender);
    }

    function _mintMultiple(uint256 amount, address destination) internal {
        for (uint256 i = 0; i < amount; i++) {
            _mintOne(destination);
        }
    }

    function _mintOne(address destination) internal {
        _tokenIds.increment();
        _mint(destination, _tokenIds.current());
        _setTokenURI(
            _tokenIds.current(),
            "https://gateway.pinata.cloud/ipfs/QmXrgoxu1NGzf6dNPhkz9MaBdfwMEXGbiTBQESStCALLQP"
        );
    }

    function mint() public {
        _mintOne(msg.sender);
    }

    function mintTo(address to) public {
        _mintOne(to);
        console.log("minted to", to);
        console.log("balance", balanceOf(to));
    }

    function transfer(
        address from,
        address to,
        uint256 tokenId
    ) public {
        _safeTransfer(from, to, tokenId, "");
    }

    function getLastId() public view returns (uint256) {
        return _tokenIds.current();
    }
}
