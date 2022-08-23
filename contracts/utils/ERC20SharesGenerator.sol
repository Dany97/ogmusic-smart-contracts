// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract ERC20SharesGenerator is ERC20, IERC721Receiver, Ownable {
    address _creator;
    uint256 _price;
    bool private deposited = false;

    modifier onlyIfTokenDeposited() {
        require(deposited == true, "Token not deposited");
        _;
    }

    constructor(
        string memory _name,
        string memory _symbol,
        address creator,
        uint256 price
    ) ERC20(_name, _symbol) {
        _creator = creator;
        _price = price;
    }

    function mint(address minter, uint256 shares)
        external
        onlyIfTokenDeposited
    {
        _mint(minter, shares);
        deposited = false;
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
