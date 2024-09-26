import { expect} from "chai";
import { ethers } from "hardhat";

describe("ERC721Generator Tests", function(){

    it("create shares", async function() {
        
        const [deployer, consumer, artist, system, active, sharesAddress] = await ethers.getSigners();
        console.log(
            "Deploying the contract with the account:",
            await deployer.getAddress()
        );

        console.log("Account balance:", (await deployer.getBalance()).toString());

        const ERC721Generator = await ethers.getContractFactory("ERC721Generator");

        //deploy with pablock address for mumbai network
        //the deployment mints an NFT to msg.sender(deployer)
        const erc721Generator = await ERC721Generator.deploy("NFTProva", "PRV", "Descrizione", "www.sito.com", sharesAddress.address, artist.address); 

        await erc721Generator.deployed();

        console.log("ERC721Generator deployed at:", erc721Generator.address);

        //NFT creation tests
        
        expect(await erc721Generator.balanceOf(sharesAddress.address)).to.equal(1);
        expect(await erc721Generator.name()).to.equal("NFTProva");
        expect(await erc721Generator.symbol()).to.equal("PRV");
        /*
        expect(await erc721Generator.getDescription()).to.equal("Descrizione");
        expect(await erc721Generator.getURI()).to.equal("www.sito.com");
        expect(await erc721Generator.getArtist()).to.equal(artist.address);
        */



        
        
        





            
    })
    

});