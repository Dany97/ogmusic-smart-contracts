// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract ERC20SharesGenerator is ERC20, IERC721Receiver {
    address private _creator;
    uint256 private _price;
    bool private deposited = false;
    uint256 private _rightsPercentage;
    address private _linkedNFT;

    modifier onlyIfTokenDeposited() {
        require(deposited == true, "Token not deposited");
        _;
    }

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 price,
        uint256 rightsPercentage
    ) ERC20(_name, _symbol) {
        _price = price;
        _rightsPercentage = rightsPercentage;
    }

    function mint(address minter, uint256 shares)
        external
        onlyIfTokenDeposited
    {
        _mint(minter, shares);
        _creator = minter;
    }

    function linkNFT(address nftAddress) public {
        _linkedNFT = nftAddress;
    }

    function getLinkedNFT() public view returns (address nftAddress) {
        return _linkedNFT;
    }

    function getPrice() public view returns (uint256 price) {
        return _price;
    }

    /// @notice Function needed to let the contract being able to receive ERC721 NFTs
    /// @dev Mandatory for IERC721Receiver
    function onERC721Received(
        address,
        address,
        uint256,
        bytes memory
    ) public virtual override returns (bytes4) {
        deposited = true;
        return this.onERC721Received.selector;
    }
}
