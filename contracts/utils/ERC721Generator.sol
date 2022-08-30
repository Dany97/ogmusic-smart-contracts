// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC20SharesGenerator} from "./ERC20SharesGenerator.sol";
import "hardhat/console.sol";

contract ERC721Generator is ERC721 {
    string private _tokenDescription;
    string private _tokenURI;
    string private _name;
    string private _symbol;
    address private linkedERC20;
    address private NFTArtist;

    constructor(
        string memory NFTName,
        string memory NFTSymbol,
        string memory description,
        string memory uri,
        address erc20Contract,
        address artist
    ) ERC721(NFTName, NFTSymbol) {
        _name = NFTName;
        _symbol = NFTSymbol;
        _tokenDescription = description;
        _tokenURI = uri;
        _safeMint(erc20Contract, 1);
        linkedERC20 = erc20Contract;
        NFTArtist = artist;
    }

    function getDescription() public view returns (string memory) {
        return _tokenDescription;
    }

    function getURI() public view returns (string memory) {
        return _tokenURI;
    }

    function getArtist() public view returns (address artist) {
        return NFTArtist;
    }

    function getLinkedERC20Contract()
        public
        view
        returns (address erc20Contract)
    {
        return linkedERC20;
    }
}
