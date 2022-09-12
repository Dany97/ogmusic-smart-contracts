import { expect} from "chai";
import { ethers } from "hardhat";

describe("RoyaltiesManager tests", function(){

    let deployer, consumer, artist, system;
    let roleManager, royaltiesManager;

    beforeEach(async () => {
        ([deployer, consumer, artist, system] = await ethers.getSigners());
        console.log(
            "Deploying the contract with the account:",
            await deployer.getAddress()
        );

        


        console.log("Account balance:", (await deployer.getBalance()).toString());

        const RoleManager = await ethers.getContractFactory("RoleManager");

        //deploy with pablock address for mumbai network
        roleManager = await RoleManager.deploy("0x4419AF074BC3a6C7D90f242dfdC1a163Bc710091"); 

        await roleManager.deployed();

        console.log("RoleManager deployed at:", roleManager.address);

        const RoyaltiesManager = await ethers.getContractFactory("RoyaltiesManager");

        royaltiesManager = await RoyaltiesManager.deploy(roleManager.address);

        await royaltiesManager.deployed();

        console.log("RoyaltiesManager deployed at:", royaltiesManager.address);

        await royaltiesManager.initialize();

        

        
    })

    it("Distribution of Royalties", async function () {
        
        //deployment of token factory and generation of test tokens

        const TokenFactory = await ethers.getContractFactory("TokenFactory");
        const tokenFactory = await TokenFactory.deploy(roleManager.address); 

        await tokenFactory.deployed();

        console.log("TokenFactory deployed at:", tokenFactory.address);
        await tokenFactory.initialize();
        console.log("msg.sender:", deployer.address);
        await tokenFactory.connect(deployer).mintShares("NFTName", "NFTSymbol", "NFTDescription", "NFTUri", "SharesName", "SharesSymbol", 1000, 10, "0x0000000000000000000000000000000000000000");
        
    })
});