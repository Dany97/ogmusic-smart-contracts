// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {ERC1155Supply} from "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract ERC1155Contract is ERC1155Supply, Ownable {
    //name of the collection that opensea sees if there isn't name attribute in metadata
    string public name;

    struct tokenData {
        string _tokenDescription;
        string _tokenImageLink;
        string _tokenURI;
        uint256 _priceUSDT;
        string _tokenType;
        string _tokenName;
    }

    mapping(uint256 => tokenData) public tokenInfo;

    string public _collectionImageUrl;
    string public _artistName;
    string private _collectionURI;
    uint256 private tokenCounter;
    address private _tokenShopAddress;

    constructor(
        string memory collectionUri,
        string memory collectionName,
        string memory collectionImageURL,
        string memory artistName,
        address tokenShopAddress,
        address adminAddress
    ) ERC1155(collectionUri) {
        name = collectionName;
        _collectionImageUrl = collectionImageURL;
        _artistName = artistName;
        _collectionURI = collectionUri;
        tokenCounter = 0;
        _tokenShopAddress = tokenShopAddress;
        _transferOwnership(adminAddress);
    }

    function mint(
        uint256 amount,
        string memory tokenName,
        string memory tokenType,
        uint256 priceUSDT,
        string memory tokenDescription,
        string memory tokenImageURL,
        string memory tokenURI
    ) public {
        _mint(owner(), tokenCounter, amount, "");
        tokenInfo[tokenCounter]._tokenName = tokenName;
        tokenInfo[tokenCounter]._tokenType = tokenType;
        tokenInfo[tokenCounter]._priceUSDT = priceUSDT;
        tokenInfo[tokenCounter]._tokenDescription = tokenDescription;
        tokenInfo[tokenCounter]._tokenImageLink = tokenImageURL;
        tokenInfo[tokenCounter]._tokenURI = tokenURI;
        tokenCounter++;
    }

    //modifies collection uri
    function _setURI(string memory newuri) internal virtual override {
        _collectionURI = newuri;
    }

    function setURI(string memory newuri) public {
        _setURI(newuri);
    }

    function uri(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        return tokenInfo[tokenId]._tokenURI;
    }

    //Getters for struct attributes

    function _priceUSDT(uint256 tokenId) public view returns (uint256) {
        return tokenInfo[tokenId]._priceUSDT;
    }

    function _tokenDescription(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        return tokenInfo[tokenId]._tokenDescription;
    }

    function _tokenImageLink(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        return tokenInfo[tokenId]._tokenImageLink;
    }

    function _tokenType(uint256 tokenId) public view returns (string memory) {
        return tokenInfo[tokenId]._tokenType;
    }

    function _tokenName(uint256 tokenId) public view returns (string memory) {
        return tokenInfo[tokenId]._tokenName;
    }

    //function that opensea looks for when trying to retrieve collection metadata
    function contractURI() public view returns (string memory) {
        return _collectionURI;
    }

    //override isApproverForAll in order to automatically authorize TokenShop to move this address's tokens
    // it also allows OpenSea to move tokens for polygon mainnet
    function isApprovedForAll(address account, address operator)
        public
        view
        virtual
        override
        returns (bool)
    {
        if (operator == _tokenShopAddress) {
            return true;
        }
        if (operator == 0x207Fa8Df3a17D96Ca7EA4f2893fcdCb78a304101) {
            //opensea polygon proxy address for erc1155
            return true;
        } else return super.isApprovedForAll(account, operator);
    }
}
