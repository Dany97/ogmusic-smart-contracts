// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC1155Contract} from "./utils/ERC1155Contract.sol";
import "./RoleObserver.sol";
import "pablock-smart-contracts/contracts/PablockMetaTxReceiver.sol";

contract RoyaltiesManager is RoleObserver {
    constructor(address initialRoleManagerAddress, address metaTxAddress)
        PablockMetaTxReceiver("RoyaltiesManager", "0.1.1")
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

    event royaltiesDistributed(address tokenAddress, uint256 tokenId);

    function distributeRoyalties(
        uint256 valueInUSDT,
        address sharesContractAddress,
        address[] memory owners,
        uint256 tokenId
    ) external onlyAdmin {
        ERC1155Contract sharesContract = ERC1155Contract(sharesContractAddress);

        //mumbai usdt address 0x3813e82e6f7098b9583FC0F33a962D02018B6803
        //polygon mainnet usdt address 0xc2132D05D31c914a87C6611C10748AEb04B58e8F

        address usdtContractAddress = 0xc2132D05D31c914a87C6611C10748AEb04B58e8F;
        ERC20 usdtContract = ERC20(usdtContractAddress);

        uint256 maxBalance = sharesContract.totalSupply(tokenId);
        uint256 balanceCounter = 0;

        //checks if you passed only tokenholders
        for (uint256 i = 0; i < owners.length; i++) {
            require(
                sharesContract.balanceOf(owners[i], tokenId) > 0,
                "RoyaltiesManager: you passed one or more addresses without balance"
            );

            //increment a counter useful for the next check
            balanceCounter =
                balanceCounter +
                sharesContract.balanceOf(owners[i], tokenId);
        }

        //checks if you passed only tokenholders but you forgot someone
        require(
            balanceCounter == maxBalance,
            "RoyaltiesManager: the array of addresses you passed is not the exact array of owners"
        );

        //transfers the correct percentage of USDT to the tokenholders

        for (uint256 i = 0; i < owners.length; i++) {
            uint256 temp = sharesContract.balanceOf(owners[i], tokenId) *
                valueInUSDT;
            uint256 amountToTransfer = temp / maxBalance;

            usdtContract.transferFrom(msgSender(), owners[i], amountToTransfer);
        }

        emit royaltiesDistributed(sharesContractAddress, tokenId);
    }

    // method to reset metatransaction in case of changes in the contract

    function set_MetaTransaction(address metaTxAddress)
        public
        onlyAdminNoMetaTx
    {
        setMetaTransaction(metaTxAddress);
    }
}
