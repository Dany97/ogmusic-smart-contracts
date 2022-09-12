import { expect} from "chai";
import { ethers } from "hardhat";

describe("Token Factory tests", function(){
    it("Minting NFT + ERC20 Shares", async function () {
        
        const [deployer, consumer, artist, system, active] = await ethers.getSigners();
        console.log(
            "Deploying the contract with the account:",
            await deployer.getAddress()
        );

        


        console.log("Account balance:", (await deployer.getBalance()).toString());

        const RoleManager = await ethers.getContractFactory("RoleManager");

        //deploy with pablock address for mumbai network
        const roleManager = await RoleManager.deploy("0x4419AF074BC3a6C7D90f242dfdC1a163Bc710091"); 

        await roleManager.deployed();

        console.log("RoleManager deployed at:", roleManager.address);

        const TokenFactory = await ethers.getContractFactory("TokenFactory");

        //reverts if role manager is address zero
        await expect(TokenFactory.deploy("0x0000000000000000000000000000000000000000")).to.be.revertedWithoutReason;

        const tokenFactory = await TokenFactory.deploy(roleManager.address); 

        await tokenFactory.deployed();

        console.log("TokenFactory deployed at:", tokenFactory.address);

        //reverts if initialize is called by someone different by the deployer
        await expect(tokenFactory.connect(consumer).initialize()).to.be.revertedWithoutReason;


        await tokenFactory.initialize();

        //reverts if initialize is called more than once
        await expect(tokenFactory.initialize()).to.be.revertedWithoutReason;

        //test for minting of NFT and shares
        console.log("msg.sender:", deployer.address);
        await tokenFactory.connect(deployer).mintShares("NFTName", "NFTSymbol", "NFTDescription", "NFTUri", "SharesName", "SharesSymbol", 1000, 10, "0x0000000000000000000000000000000000000000");
        
        //reverts if deployer isn't the admin
        await expect(tokenFactory.connect(consumer).mintShares("NFTName", "NFTSymbol", "NFTDescription", "NFTUri", "SharesName", "SharesSymbol", 1000, 10, "0x0000000000000000000000000000000000000000")).to.be.revertedWithoutReason;
    
        

    })
});