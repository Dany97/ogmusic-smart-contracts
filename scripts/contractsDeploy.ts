//script for smart contracts deployment

import { ethers, network } from "hardhat";

async function main() {
    // This is just a convenience check
    if (network.name === "hardhat") {
      console.warn(
        "You are trying to deploy a contract to the Hardhat Network, which" +
          "gets automatically created and destroyed every time. Use the Hardhat" +
          " option '--network localhost'"
      );
    }
  
    const [deployer] = await ethers.getSigners();
        console.log(
            "Deploying the contract with the account:",
            await deployer.getAddress()
        );

        
          //role manager

        console.log("Account balance:", (await deployer.getBalance()).toString());

        const RoleManager = await ethers.getContractFactory("RoleManager");

        //deploy with pablock address for mumbai network
        const roleManager = await RoleManager.deploy("0x4419AF074BC3a6C7D90f242dfdC1a163Bc710091"); 

        await roleManager.deployed();

        console.log("RoleManager deployed at:", roleManager.address);

        //token factory

        const TokenFactory = await ethers.getContractFactory("TokenFactory");

        const tokenFactory = await TokenFactory.deploy(roleManager.address, "0x4419AF074BC3a6C7D90f242dfdC1a163Bc710091"); 

        await tokenFactory.deployed();

        console.log("TokenFactory deployed at:", tokenFactory.address);



        //token shop

        const TokenShop = await ethers.getContractFactory("TokenShop");

        const tokenShop = await TokenShop.deploy("0x4419AF074BC3a6C7D90f242dfdC1a163Bc710091"); 

        await tokenShop.deployed();

        console.log("TokenShop deployed at:", tokenShop.address);
        

        //royalties manager

        const RoyaltiesManager = await ethers.getContractFactory("RoyaltiesManager");

        const royaltiesManager = await RoyaltiesManager.deploy(roleManager.address, "0x4419AF074BC3a6C7D90f242dfdC1a163Bc710091"); 

        await royaltiesManager.deployed();

        console.log("RoyaltiesManager deployed at:", royaltiesManager.address);


        await royaltiesManager.initialize();
    
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  