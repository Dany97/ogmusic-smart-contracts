// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC20SharesGenerator} from "./ERC20SharesGenerator.sol";

contract ERC721Generator is ERC721 {
    string private _tokenDescription;
    string private _tokenURI;
    address private NFTArtist;

    constructor(
        string memory NFTName,
        string memory NFTSymbol,
        string memory description,
        string memory uri,
        address erc20Contract,
        address artist
    ) ERC721(NFTName, NFTSymbol) {
        _tokenDescription = description;
        _tokenURI = uri;
        _safeMint(erc20Contract, 1);
        NFTArtist = artist;
    }
}
