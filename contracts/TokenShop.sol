// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {ERC20SharesGenerator} from "./utils/ERC20SharesGenerator.sol";

contract TokenShop {
    function buyTokens(uint256 amountToBuy, address tokensAddress)
        external
        payable
    {
        ERC20SharesGenerator tokensContract = ERC20SharesGenerator(
            tokensAddress
        );

        //checks if the amount of matic sent equals the total price of the tokens
        require(
            msg.value == amountToBuy * tokensContract._price(),
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
}
