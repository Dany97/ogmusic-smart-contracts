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
        const erc20SharesGenerator = await ERC20SharesGenerator.deploy("PIPPO", "PIP", 100, 10); 

        await erc20SharesGenerator.deployed();

        console.log("ERC20SharesGenerator deployed at:", erc20SharesGenerator.address);

        //reverts if token is not sent to the contract
        await expect(erc20SharesGenerator.connect(consumer).mint(deployer.address, 50)).to.be.revertedWith("Token not deposited");

        
        const ERC721Generator = await ethers.getContractFactory("ERC721Generator");

        //deploy with pablock address for mumbai network
        //the deployment mints an NFT to msg.sender(deployer)
        const erc721Generator = await ERC721Generator.deploy("NFTProva", "PRV", "Descrizione", "www.sito.com", erc20SharesGenerator.address, artist.address); 

        await erc721Generator.deployed();

        console.log("ERC721Generator deployed at:", erc721Generator.address);
        

        //mints 50 ERC-20 to deployer
        await erc20SharesGenerator.mint(deployer.address, 50);
        

        expect(await erc20SharesGenerator.balanceOf(deployer.address)).to.equal(50);
        expect(await erc20SharesGenerator.name()).to.equal("PIPPO");
        expect(await erc20SharesGenerator.symbol()).to.equal("PIP");

        await erc20SharesGenerator.linkNFT(erc721Generator.address);
        expect(await erc20SharesGenerator.getLinkedNFT()).to.equal(erc721Generator.address);
        expect(await erc20SharesGenerator.getPrice()).to.equal(100);








    })

});