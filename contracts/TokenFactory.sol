// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {ERC721Generator} from "./utils/ERC721Generator.sol";
import {ERC20SharesGenerator} from "./utils/ERC20SharesGenerator.sol";
import "./RoleObserver.sol";
import "hardhat/console.sol";

contract TokenFactory is RoleObserver {
    constructor(address initialRoleManagerAddress) {
        require(
            initialRoleManagerAddress != address(0),
            "TokenFactory: RoleManager address must not be zero."
        );
        roleManagerAddress = initialRoleManagerAddress;
        roleManager = RoleManager(initialRoleManagerAddress);
        deployer = msg.sender;
    }

    event sharesCreated(address contractAddress);

    function initialize() public onlyOnce {
        /* The roleManager is registered as an observer of RoleManager's state, effects are:
         *  - Observed state _ACCOUNTROLES get initialised at TokenFactory.
         *  - TokenFactory becomes SYSTEM.
         */
        roleManager.registerAsRoleObserver(address(this));

        //deployer set to address zero to trigger the onlyOnce modifier
        deployer = address(0);
    }

    function mintShares(
        string memory NFTName,
        string memory NFTSymbol,
        string memory NFTDescription,
        string memory NFTUri,
        string memory ERC20SharesName,
        string memory ERC20SharesSymbol,
        uint256 sharesAmount,
        uint256 sharesPrice,
        uint256 rightsPercentage,
        address artistAddress
    ) public onlyAdmin returns (address sharesAddress) {
        ERC20SharesGenerator sharesGenerator = new ERC20SharesGenerator(
            ERC20SharesName,
            ERC20SharesSymbol,
            sharesPrice,
            rightsPercentage
        );
        /*
        console.log(
            "ERC20SharesGenerator deployed at: ",
            address(sharesGenerator)
        );
        */
        ERC721Generator nftGenerator = new ERC721Generator(
            NFTName,
            NFTSymbol,
            NFTDescription,
            NFTUri,
            address(sharesGenerator),
            artistAddress
        );

        //console.log("ERC721Generator deployed at: ", address(nftGenerator));

        //link erc20 to original nft
        sharesGenerator.linkNFT(address(nftGenerator));

        sharesGenerator.mint(msg.sender, sharesAmount);

        emit sharesCreated(address(sharesGenerator));

        return (address(sharesGenerator));
    }
}
