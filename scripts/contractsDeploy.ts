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


    //bcode mumbai metaTx address 0x4419AF074BC3a6C7D90f242dfdC1a163Bc710091
    //bcode polygon mainnet metaTx address 0x5Dc63336bA6d4c1688E51e91fD7B002FC58C2dc9
  
    const [deployer] = await ethers.getSigners();
        console.log(
            "Deploying the contract with the account:",
            await deployer.getAddress()
        );


        const sleep = (milliseconds: number) =>
        new Promise((resolve) => setTimeout(resolve, milliseconds));

        
          //role manager

        console.log("Account balance:", (await deployer.getBalance()).toString());

        const RoleManager = await ethers.getContractFactory("RoleManager");

        //deploy with pablock address for mumbai network
        const roleManager = await RoleManager.deploy("0x5Dc63336bA6d4c1688E51e91fD7B002FC58C2dc9"); 

        await roleManager.deployed();

        console.log("RoleManager deployed at:", roleManager.address);




        


        await sleep(20000);



        

        //user manager
        
        const UserManager = await ethers.getContractFactory("UserManager");

        const userManager = await UserManager.deploy(roleManager.address, "0x5Dc63336bA6d4c1688E51e91fD7B002FC58C2dc9"); 

        await userManager.deployed();

        console.log("UserManager deployed at:", userManager.address);

        await userManager.initialize();



        await sleep(20000);





        //token factory

        const TokenFactory = await ethers.getContractFactory("TokenFactory");

        const tokenFactory = await TokenFactory.deploy(roleManager.address, "0x5Dc63336bA6d4c1688E51e91fD7B002FC58C2dc9"); 

        await tokenFactory.deployed();

        console.log("TokenFactory deployed at:", tokenFactory.address);

        await tokenFactory.initialize();

        await sleep(20000);




        //token shop

        const TokenShop = await ethers.getContractFactory("TokenShop");

        const tokenShop = await TokenShop.deploy(roleManager.address, "0x5Dc63336bA6d4c1688E51e91fD7B002FC58C2dc9"); 

        await tokenShop.deployed();

        console.log("TokenShop deployed at:", tokenShop.address);

        await tokenShop.initialize();



        await sleep(20000);


        

        //royalties manager

        const RoyaltiesManager = await ethers.getContractFactory("RoyaltiesManager");

        const royaltiesManager = await RoyaltiesManager.deploy(roleManager.address, "0x5Dc63336bA6d4c1688E51e91fD7B002FC58C2dc9"); 

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
  