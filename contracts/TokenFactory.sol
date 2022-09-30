// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {ERC1155Contract} from "./utils/ERC1155Contract.sol";
import {RoleManager} from "./RoleManager.sol";
import "./RoleObserver.sol";
import "pablock-smart-contracts/contracts/PablockMetaTxReceiver.sol";

contract TokenFactory is RoleObserver {
    constructor(address initialRoleManagerAddress, address metaTxAddress)
        PablockMetaTxReceiver("TokenFactory", "0.1.1")
    {
        require(initialRoleManagerAddress != address(0));

        //lets the contract enable notarizzazione.cloud metatransactions
        setMetaTransaction(metaTxAddress);

        roleManagerAddress = initialRoleManagerAddress;
        roleManager = RoleManager(initialRoleManagerAddress);
        deployer = msg.sender;
    }

    function initialize() public onlyOnce {
        /* The roleManager is registered as an observer of RoleManager's state, effects are:
         *  - Observed state _ACCOUNTROLES get initialised at RoyaltiesManager.
         *  - TokenFactory becomes SYSTEM.
         */
        roleManager.registerAsRoleObserver(address(this));

        //deployer set to address zero to trigger the onlyOnce modifier
        deployer = address(0);
    }

    event sharesMinted(address indexed sharesAddress);
    event collectionCreated(address indexed collectionAddress);

    function createCollection(
        string memory collectionUri,
        string memory collectionName,
        string memory collectionImageURL,
        string memory artistName,
        address tokenShopAddress
    ) external onlyAdmin {
        ERC1155Contract erc1155tokenCollection = new ERC1155Contract(
            collectionUri,
            collectionName,
            collectionImageURL,
            artistName,
            tokenShopAddress
        );

        emit collectionCreated(address(erc1155tokenCollection));
    }

    function mintShares(
        address erc1155address,
        uint256 amount,
        string memory tokenName,
        string memory tokenType,
        uint256 priceUSDT,
        string memory tokenDescription,
        string memory tokenImageURL,
        string memory tokenURI
    ) external onlyAdmin {
        ERC1155Contract erc1155token = ERC1155Contract(erc1155address);

        erc1155token.mint(
            amount,
            tokenName,
            tokenType,
            priceUSDT,
            tokenDescription,
            tokenImageURL,
            tokenURI
        );

        emit sharesMinted(erc1155address);
    }

    // method to reset metatransaction in case of changes in the contract

    function set_MetaTransaction(address metaTxAddress)
        public
        onlyAdminNoMetaTx
    {
        setMetaTransaction(metaTxAddress);
    }
}
