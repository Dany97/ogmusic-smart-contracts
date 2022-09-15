// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {ERC20SharesGenerator} from "./utils/ERC20SharesGenerator.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "pablock-smart-contracts/contracts/PablockMetaTxReceiver.sol";

contract TokenShop is PablockMetaTxReceiver {
    constructor(address metaTxAddress)
        PablockMetaTxReceiver("TokenShop", "0.0.1")
    {
        //lets the contract enable notarizzazione.cloud metatransactions
        setMetaTransaction(metaTxAddress);
    }

    function buyTokensWithMatic(uint256 amountToBuy, address tokensAddress)
        external
        payable
    {
        ERC20SharesGenerator tokensContract = ERC20SharesGenerator(
            tokensAddress
        );

        //checks if the amount of matic sent equals the total price of the tokens
        require(
            msg.value == amountToBuy * tokensContract._priceMatic(),
            "incorrect price"
        );

        //conversion wei to matic
        uint256 scaledAmount = amountToBuy *
            ((uint256(10))**tokensContract.decimals());

        //checks if there are unsold tokens
        require(
            tokensContract.balanceOf(tokensContract._owner()) >= scaledAmount,
            "all the tokens have been sold"
        );

        /*
        Because the ERC20 token standard allows tokens to return false on failure, rather than reverting,
        the final require is necessary to ensure the buyer actually receives their tokens
        */
        require(
            tokensContract.transferFrom(
                tokensContract._owner(),
                msg.sender,
                scaledAmount
            )
        );

        //finally, the contract sends the amount of Balance contained in msg.value to the
        //admin (owner of tokens contract)
        payable(address(tokensContract._owner())).transfer(msg.value);
    }

    function buyTokensWithUSDT(
        uint256 amountToBuy,
        address tokensAddress,
        address mumbaiUSDT
    ) external {
        //usdtContractMumbaiAddress = 0x3813e82e6f7098b9583FC0F33a962D02018B6803;

        ERC20SharesGenerator tokensContract = ERC20SharesGenerator(
            tokensAddress
        );

        ERC20 usdtContractMumbai = ERC20(mumbaiUSDT);

        uint256 usdtToPay = amountToBuy *
            tokensContract._priceUSDT() *
            ((uint256(10))**usdtContractMumbai.decimals());

        //conversion wei to matic
        uint256 scaledAmount = amountToBuy *
            ((uint256(10))**tokensContract.decimals());

        //checks if the buyer has the minimum amount of USDT to afford the total price of the tokens
        require(
            usdtContractMumbai.balanceOf(msg.sender) >= usdtToPay,
            "not enough USDT balance"
        );

        //checks if there are unsold tokens
        require(
            tokensContract.balanceOf(tokensContract._owner()) >= scaledAmount,
            "all the tokens have been sold"
        );

        //the contract transfers USDT tokens from msg.sender to the admin

        require(
            usdtContractMumbai.transferFrom(
                msg.sender,
                tokensContract._owner(),
                usdtToPay
            )
        );

        /*
        Because the ERC20 token standard allows tokens to return false on failure, rather than reverting,
        the final require is necessary to ensure the buyer actually receives their tokens
        */

        require(
            tokensContract.transferFrom(
                tokensContract._owner(),
                msg.sender,
                scaledAmount
            )
        );
    }

    // method to reset metatransaction in case of changes in the contract

    function set_MetaTransaction(address metaTxAddress) public {
        setMetaTransaction(metaTxAddress);
    }
}
