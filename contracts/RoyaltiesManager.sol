// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {ERC20SharesGenerator} from "./utils/ERC20SharesGenerator.sol";
import "./RoleObserver.sol";
import "pablock-smart-contracts/contracts/PablockMetaTxReceiver.sol";

contract RoyaltiesManager is RoleObserver, PablockMetaTxReceiver {
    constructor(address initialRoleManagerAddress, address metaTxAddress)
        PablockMetaTxReceiver("RoyaltiesManager", "0.0.1")
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
         *  - RoyaltiesManager becomes SYSTEM.
         */
        roleManager.registerAsRoleObserver(address(this));

        //deployer set to address zero to trigger the onlyOnce modifier
        deployer = address(0);
    }

    function distributeRoyalties(
        address sharesContractAddress,
        //uint256 totalEarnings,
        address[] memory owners
    ) external payable onlyAdmin {
        ERC20SharesGenerator sharesContract = ERC20SharesGenerator(
            sharesContractAddress
        );

        uint256 maxBalance = sharesContract.totalSupply();
        uint256 balanceCounter = 0;

        //checks if the admin has enough balance
        require(
            msg.sender.balance >= msg.value,
            "You don't have enough balance"
        );

        //checks if you passed only tokenholders
        for (uint256 i = 0; i < owners.length; i++) {
            require(
                sharesContract.balanceOf(owners[i]) > 0,
                "RoyaltiesManager: you passed one or more addresses without balance"
            );

            //increment a counter useful for the next check
            balanceCounter =
                balanceCounter +
                sharesContract.balanceOf(owners[i]);
        }

        //checks if you passed only tokenholders but you forgot someone
        require(
            balanceCounter == maxBalance,
            "RoyaltiesManager: the array of addresses you passed is not the exact array of owners"
        );

        for (uint256 i = 0; i < owners.length; i++) {
            uint256 temp = sharesContract.balanceOf(owners[i]) * msg.value;
            uint256 amountToTransfer = temp / maxBalance;

            payable(address(owners[i])).transfer(amountToTransfer);
        }
    }

    // method to reset metatransaction in case of changes in the contract

    function set_MetaTransaction(address metaTxAddress) public {
        setMetaTransaction(metaTxAddress);
    }
}
