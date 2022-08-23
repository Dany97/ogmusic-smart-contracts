import { expect} from "chai";
import { ethers } from "hardhat";

describe("ERC20 shares generator Tests", function(){

    it("deploy and mint", async function() {
        
        const [deployer, consumer, artist, system, active] = await ethers.getSigners();
        console.log(
            "Deploying the contract with the account:",
            await deployer.getAddress()
        );

        console.log("Account balance:", (await deployer.getBalance()).toString());

        const ERC20SharesGenerator = await ethers.getContractFactory("ERC20SharesGenerator");

        //deploy with pablock address for mumbai network
        const erc20SharesGenerator = await ERC20SharesGenerator.deploy("PIPPO", "PIP", deployer.address, 100); 

        await erc20SharesGenerator.deployed();

        console.log("ERC20SharesGenerator deployed at:", erc20SharesGenerator.address);
        
        const TestNFT = await ethers.getContractFactory("TestNFT");
        
        //mints 1 nft to deployer 
        const testNFT = await TestNFT.deploy("Test", "TFT"); 

        await testNFT.deployed();

        console.log("TestNFT deployed at:", testNFT.address);


        //sends token to erc20SharesGenerator contract
        await testNFT.transfer(deployer.address, erc20SharesGenerator.address, 1);

        //mints 50 ERC-20 to deployer
        await erc20SharesGenerator.mint(deployer.address, 50);

        expect(await erc20SharesGenerator.balanceOf(deployer.address)).to.equal(50);
        expect(await erc20SharesGenerator.name()).to.equal("PIPPO");
        expect(await erc20SharesGenerator.symbol()).to.equal("PIP");
        await expect(erc20SharesGenerator.connect(consumer).mint(deployer.address, 50)).to.be.revertedWith("Token not deposited");






    })

});