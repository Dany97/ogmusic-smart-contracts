// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC20SharesGenerator} from "./ERC20SharesGenerator.sol";

contract ERC721Generator is ERC721 {
    string _tokenDescription;
    string _tokenURI;
    string _name;
    string _symbol;
    ERC20SharesGenerator private sharesGenerator;

    constructor(
        string memory NFTName,
        string memory NFTSymbol,
        string memory description,
        string memory uri
    ) ERC721(NFTName, NFTSymbol) {
        _name = NFTName;
        _symbol = NFTSymbol;
        _tokenDescription = description;
        _tokenURI = uri;
        _safeMint(msg.sender, 1);
    }

    /*
    function NFTSelfMint() public {
        _safeMint(msg.sender, 1);
    }
    */

    function createTokenShares(
        string memory name,
        string memory symbol,
        uint256 shares,
        uint256 price
    ) public {
        sharesGenerator = new ERC20SharesGenerator(
            name,
            symbol,
            msg.sender,
            price
        );

        safeTransferFrom(msg.sender, address(sharesGenerator), 1);

        sharesGenerator.mint(msg.sender, shares);
    }

    function getSharesGenerator() public view returns (ERC20SharesGenerator) {
        return sharesGenerator;
    }

    function getSharesGeneratorAddress() public view returns (address) {
        return address(sharesGenerator);
    }

    function getDescription() public view returns (string memory) {
        return _tokenDescription;
    }

    function getURI() public view returns (string memory) {
        return _tokenURI;
    }
}
