// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC1155Contract} from "./utils/ERC1155Contract.sol";
import "pablock-smart-contracts/contracts/PablockMetaTxReceiver.sol";
import {RoleManager} from "./RoleManager.sol";

contract TokenShop is PablockMetaTxReceiver {
    RoleManager roleManager;
    address roleManagerAddress;

    constructor(address initialRoleManagerAddress, address metaTxAddress)
        PablockMetaTxReceiver("TokenShop", "0.1.1")
    {
        require(initialRoleManagerAddress != address(0));

        //lets the contract enable notarizzazione.cloud metatransactions
        setMetaTransaction(metaTxAddress);

        roleManagerAddress = initialRoleManagerAddress;
        roleManager = RoleManager(initialRoleManagerAddress);
    }

    modifier onlyAdminNoMetaTx() {
        require(roleManager.isAdmin(msg.sender));
        _;
    }

    event tokensBought(address tokenAddress, uint256 tokenId, address buyer);

    function buyTokensWithMatic(
        uint256 amountToBuy,
        address tokensAddress,
        uint256 tokenId
    ) external payable {
        ERC1155Contract tokensContract = ERC1155Contract(tokensAddress);
        uint256 price = tokensContract._priceUSDT(tokenId);
        //checks if the amount of matic sent equals the total price of the tokens
        require(msg.value == amountToBuy * price, "incorrect price");

        //checks if there are unsold tokens
        require(
            tokensContract.balanceOf(tokensContract._owner(), tokenId) >=
                amountToBuy,
            "all the tokens have been sold"
        );

        //token transfer

        tokensContract.safeTransferFrom(
            tokensContract._owner(),
            msgSender(),
            tokenId,
            amountToBuy,
            ""
        );

        //finally, the contract sends the amount of Balance contained in msg.value to the
        //admin (owner of tokens contract)
        payable(address(tokensContract._owner())).transfer(msg.value);

        emit tokensBought(tokensAddress, tokenId, msgSender());
    }

    function buyTokensWithUSDT(
        uint256 amountToBuy,
        address tokensAddress,
        uint256 tokenId
    ) external {
        address usdtContractAddress = 0x3813e82e6f7098b9583FC0F33a962D02018B6803; //MUMBAI

        ERC1155Contract tokensContract = ERC1155Contract(tokensAddress);
        uint256 price = tokensContract._priceUSDT(tokenId);

        ERC20 usdtContract = ERC20(usdtContractAddress);

        uint256 usdtToPay = amountToBuy *
            price *
            ((uint256(10))**usdtContract.decimals());

        //checks if there are unsold tokens
        require(
            tokensContract.balanceOf(tokensContract._owner(), tokenId) >=
                amountToBuy,
            "all the tokens have been sold"
        );

        //the contract transfers USDT tokens from msgSender() to the admin

        usdtContract.transferFrom(
            msgSender(),
            tokensContract._owner(),
            usdtToPay
        );

        /*
        tokens are transferred from owner to buyer (msgSender())
        */

        tokensContract.safeTransferFrom(
            tokensContract._owner(),
            msgSender(),
            tokenId,
            amountToBuy,
            ""
        );

        emit tokensBought(tokensAddress, tokenId, msgSender());
    }

    /*
    function buyTokensWithWETH(uint256 amountToBuy, address tokensAddress)
        external
    {
        address wethContractAddress = 0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa; //MUMBAI

        ERC20SharesGenerator tokensContract = ERC20SharesGenerator(
            tokensAddress
        );

        ERC20 wethContract = ERC20(wethContractAddress);

        uint256 wethToPay = amountToBuy *
            tokensContract._priceWETH() *
            ((uint256(10))**wethContract.decimals());

        //conversion wei to token unit
        uint256 scaledAmount = amountToBuy *
            ((uint256(10))**tokensContract.decimals());

        //checks if there are unsold tokens
        require(
            tokensContract.balanceOf(tokensContract._owner()) >= scaledAmount,
            "all the tokens have been sold"
        );

        //the contract transfers WETH tokens from msgSender() to the admin

        wethContract.transferFrom(
            msgSender(),
            tokensContract._owner(),
            wethToPay
        );

        
        //tokens are transferred from owner to buyer (msgSender())
        

        tokensContract.transferFrom(
            tokensContract._owner(),
            msgSender(),
            scaledAmount
        );
    }
    */

    function claimTokensAfterFiatPayment(
        uint256 amountToClaim,
        address tokensAddress,
        uint256 tokenId
    ) external {
        ERC1155Contract tokensContract = ERC1155Contract(tokensAddress);

        /*
        token transfer
        */

        tokensContract.safeTransferFrom(
            tokensContract._owner(),
            msgSender(),
            tokenId,
            amountToClaim,
            ""
        );

        emit tokensBought(tokensAddress, tokenId, msgSender());
    }

    // method to reset metatransaction in case of changes in the contract

    function set_MetaTransaction(address metaTxAddress)
        public
        onlyAdminNoMetaTx
    {
        setMetaTransaction(metaTxAddress);
    }
}
