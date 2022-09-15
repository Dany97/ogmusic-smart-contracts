// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {ERC721Generator} from "./utils/ERC721Generator.sol";
import {ERC20SharesGenerator} from "./utils/ERC20SharesGenerator.sol";
import "./RoleManager.sol";
import "pablock-smart-contracts/contracts/PablockMetaTxReceiver.sol";

contract TokenFactory is PablockMetaTxReceiver {
    RoleManager roleManager;
    address roleManagerAddress;

    constructor(address initialRoleManagerAddress, address metaTxAddress)
        PablockMetaTxReceiver("TokenFactory", "0.0.1")
    {
        require(initialRoleManagerAddress != address(0));

        //lets the contract enable notarizzazione.cloud metatransactions
        setMetaTransaction(metaTxAddress);

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
        uint256 sharesPriceMatic,
        uint256 sharesPriceWETH,
        uint256 sharesPriceUSDT,
        uint256 sharesPriceUSD,
        address artistAddress
    ) external onlyAdmin {
        ERC20SharesGenerator sharesGenerator = new ERC20SharesGenerator(
            NFTName,
            NFTSymbol,
            sharesPriceMatic,
            sharesPriceWETH,
            sharesPriceUSDT,
            sharesPriceUSD
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
            sharesAmount * sharesGenerator.decimals(),
            address(nftGenerator)
        );
    }

    // method to reset metatransaction in case of changes in the contract

    function set_MetaTransaction(address metaTxAddress) public {
        setMetaTransaction(metaTxAddress);
    }
}
