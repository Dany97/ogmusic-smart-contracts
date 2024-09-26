import { expect} from "chai";
import { ethers } from "hardhat";

describe("UserManager Initialization", function(){

    let deployer, consumer, artist, system, active;
    let roleManager, userManager;

    beforeEach(async () => {
        ([deployer, consumer, artist, system, active] = await ethers.getSigners());
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

        
        const UserManager = await ethers.getContractFactory("UserManager");

        userManager = await UserManager.deploy(roleManager.address);

        console.log("UserManager deployed at:", userManager.address);


        
    });

    it("UserManager initializes itself becoming a concrete observer of RoleManager's state", async function() {
        

        await userManager.initialize();
        expect (await roleManager.connect(userManager.address).isSystem(userManager.address)).to.equal(true);

    })
    
    it("UserManager cannot be deployed by address zero", async function() {
        
        const UserManager = await ethers.getContractFactory("UserManager");

        await expect(UserManager.deploy("0x0000000000000000000000000000000000000000")).to.be.revertedWith("UserManager: RoleManager address must not be zero.");
        
    })

    it("UserManager cannot initialize itself twice or initialize with a different deployer", async function() {
        

        await expect(userManager.connect(consumer).initialize()).to.be.revertedWithoutReason;
        await userManager.initialize();
        await expect(userManager.initialize()).to.be.revertedWithoutReason;

    })
    

})