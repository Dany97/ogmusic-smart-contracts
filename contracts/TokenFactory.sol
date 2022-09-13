// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {ERC721Generator} from "./utils/ERC721Generator.sol";
import {ERC20SharesGenerator} from "./utils/ERC20SharesGenerator.sol";
import "./RoleManager.sol";

contract TokenFactory {
    RoleManager roleManager;
    address roleManagerAddress;

    constructor(address initialRoleManagerAddress) {
        require(initialRoleManagerAddress != address(0));
        roleManagerAddress = initialRoleManagerAddress;
        roleManager = RoleManager(initialRoleManagerAddress);
    }

    modifier onlyAdmin() {
        require(roleManager.isAdmin(msg.sender));
        _;
    }

    function mintShares(
        string memory NFTName,
        string memory NFTSymbol,
        string memory NFTDescription,
        string memory NFTUri,
        uint256 sharesAmount,
        uint256 sharesPrice,
        address artistAddress
    ) external onlyAdmin {
        ERC20SharesGenerator sharesGenerator = new ERC20SharesGenerator(
            NFTName,
            NFTSymbol,
            sharesPrice
        );

        ERC721Generator nftGenerator = new ERC721Generator(
            NFTName,
            NFTSymbol,
            NFTDescription,
            NFTUri,
            address(sharesGenerator),
            artistAddress
        );

        sharesGenerator.mint(
            msg.sender,
            sharesAmount * 10**18,
            address(nftGenerator)
        );
    }
}
