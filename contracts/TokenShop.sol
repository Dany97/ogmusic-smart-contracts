// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC1155Contract} from "./utils/ERC1155Contract.sol";
import "pablock-smart-contracts/contracts/PablockMetaTxReceiver.sol";
import {RoleManager} from "./RoleManager.sol";
import "./RoleObserver.sol";

contract TokenShop is RoleObserver {
    constructor(address initialRoleManagerAddress, address metaTxAddress)
        PablockMetaTxReceiver("TokenShop", "0.1.1")
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
         *  - Observed state _ACCOUNTROLES get initialised at TokenShop.
         *  - TokenShop becomes SYSTEM.
         */
        roleManager.registerAsRoleObserver(address(this));

        //deployer set to address zero to trigger the onlyOnce modifier
        deployer = address(0);
    }

    event tokensBought(address tokenAddress, uint256 tokenId, address buyer);

    function buyTokensWithUSDT(
        uint256 amountToBuy,
        address tokensAddress,
        uint256 tokenId,
        address buyerAddress
    ) external onlyAdmin {
        //mumbai usdt address 0x3813e82e6f7098b9583FC0F33a962D02018B6803
        //polygon mainnet usdt address 0xc2132D05D31c914a87C6611C10748AEb04B58e8F

        address usdtContractAddress = 0xc2132D05D31c914a87C6611C10748AEb04B58e8F;

        ERC1155Contract tokensContract = ERC1155Contract(tokensAddress);

        uint256 price = tokensContract._priceUSDT(tokenId);

        ERC20 usdtContract = ERC20(usdtContractAddress);

        uint256 usdtToPay = amountToBuy * price;

        //checks if there are unsold tokens
        require(
            tokensContract.balanceOf(tokensContract.owner(), tokenId) >=
                amountToBuy,
            "token amount not available"
        );

        //the contract transfers USDT tokens from msgSender() to the admin

        usdtContract.transferFrom(buyerAddress, msgSender(), usdtToPay);

        // tokens are transferred from owner to buyer (msgSender())

        tokensContract.safeTransferFrom(
            msgSender(),
            buyerAddress,
            tokenId,
            amountToBuy,
            ""
        );

        emit tokensBought(tokensAddress, tokenId, buyerAddress);
    }

    // method to reset metatransaction in case of changes in the contract

    function set_MetaTransaction(address metaTxAddress)
        public
        onlyAdminNoMetaTx
    {
        setMetaTransaction(metaTxAddress);
    }
}
