// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20SharesGenerator is ERC20, IERC721Receiver {
    uint256 public _price;
    bool private deposited = false;
    address public _linkedNFT;
    address public _owner;

    modifier onlyIfTokenDeposited() {
        require(deposited == true);
        _;
    }

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 price
    ) ERC20(_name, _symbol) {
        _price = price;
    }

    function mint(
        address minter,
        uint256 shares,
        address nftAddress
    ) external onlyIfTokenDeposited {
        _mint(minter, shares);
        _linkedNFT = nftAddress;
        _owner = tx.origin;
        _approve(_owner, address(this), shares);
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
