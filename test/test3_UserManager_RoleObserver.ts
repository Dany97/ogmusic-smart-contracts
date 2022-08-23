import { expect, use } from "chai";
import { ethers } from "hardhat";

describe("UserManager (contains RoleObserver tests)", function(){

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
        await userManager.initialize();

        });


    

    it("the system adds an user and sees the roles of its account", async function (){
        


        await userManager.addUser(consumer.address, ["CONSUMER"]);

        expect(await userManager.getRoles(consumer.address)).to.have.length(1);
        expect(await userManager.getRoles(consumer.address)).to.include("CONSUMER");




    });

    it("a consumer cannot add a new user", async function (){
        

        //add the user as consumer
        await userManager.addUser(consumer.address, ["CONSUMER"]);

        //the consumer tries to add a new user as artist
        await expect(userManager.connect(consumer).addUser(artist.address, ["CONSUMER", "ARTIST"])).to.be.revertedWith("RoleObserver: Function is restricted to ADMIN.");




    });


    it("the system cannot add an already existing user", async function (){


        await userManager.addUser(consumer.address, ["CONSUMER"]);

        await expect(userManager.addUser(consumer.address, ["CONSUMER"])).to.be.revertedWith("UserManager: User already registered");

    });

    it("a new user cannot have simultaneously CONSUMER and ADMIN roles", async function (){
        

        await expect(userManager.addUser(consumer.address, ["CONSUMER", "ADMIN"])).to.be.revertedWith("UserManager: A user cannot be simultaneously CONSUMER and ADMIN");

    });

    it("a new user cannot have simultaneously ARTIST and ADMIN roles", async function (){
        

        await expect(userManager.addUser(artist.address, ["ARTIST", "ADMIN"])).to.be.revertedWith("UserManager: A user cannot be simultaneously ARTIST and ADMIN");

    });


    it("a user cannot be SYSTEM", async function (){
        

        await expect(userManager.addUser(consumer.address, ["CONSUMER", "SYSTEM"])).to.be.revertedWith("UserManager: A user cannot be SYSTEM");
        await expect(userManager.addUser(artist.address, ["CONSUMER", "ARTIST", "SYSTEM"])).to.be.revertedWith("UserManager: A user cannot be SYSTEM");

    });


    it("the system updates an user and sees the roles of its account", async function (){
        

        //user added previously
        await userManager.addUser(consumer.address, ["CONSUMER"]);

        expect(await userManager.getRoles(consumer.address)).to.have.length(1);
        expect(await userManager.getRoles(consumer.address)).to.include("CONSUMER");

        //system update a consumer, allowing him to be also artist
        await userManager.updateUser(consumer.address, ["CONSUMER", "ARTIST"]);

        expect(await userManager.getRoles(consumer.address)).to.have.length(2);
        expect(await userManager.getRoles(consumer.address)).to.include("CONSUMER");
        expect(await userManager.getRoles(consumer.address)).to.include("ARTIST");

        //only for test purpose, try to update role in a way that revokeRole is called
        await userManager.updateUser(consumer.address, ["ARTIST"]);

        expect(await userManager.getRoles(consumer.address)).to.have.length(1);
        expect(await userManager.getRoles(consumer.address)).to.include("ARTIST");





    });

    it("a consumer cannot update user roles", async function (){
        

        //add the user as consumer
        await userManager.addUser(consumer.address, ["CONSUMER"]);

        //the consumer tries to add a new user as artist
        await expect(userManager.connect(consumer).updateUser(artist.address, ["CONSUMER", "ARTIST"])).to.be.revertedWith("RoleObserver: Function is restricted to ADMIN.");




    });


    it("the system cannot update a non-existing user", async function (){
        

        await expect(userManager.updateUser(consumer.address, ["CONSUMER"])).to.be.revertedWith("UserManager: The user you are trying to update is not registered");

    });

    it("a user cannot be updated simultaneously with CONSUMER and ADMIN roles", async function (){
        
        //add the user as consumer
        await userManager.addUser(consumer.address, ["CONSUMER"]);
        
        //system tries to update him with CONSUMER and ADMIN roles
        await expect(userManager.updateUser(consumer.address, ["CONSUMER", "ADMIN"])).to.be.revertedWith("UserManager: A user cannot be simultaneously CONSUMER and ADMIN");

    });

    it("a user cannot be updated simultaneously with ARTIST and ADMIN roles", async function (){
        
        
        //add the user as consumer
        await userManager.addUser(consumer.address, ["CONSUMER"]);

        //system tries to update him with ADMIN and ADMIN roles
        await expect(userManager.updateUser(consumer.address, ["ARTIST", "ADMIN"])).to.be.revertedWith("UserManager: A user cannot be simultaneously ARTIST and ADMIN");

    });


    it("a user cannot be updated with SYSTEM", async function (){
        

        //add the user as consumer
        await userManager.addUser(consumer.address, ["CONSUMER"]);

        //system tries to update him with ADMIN and ADMIN roles
        await expect(userManager.updateUser(consumer.address, ["SYSTEM"])).to.be.revertedWith("UserManager: A user cannot be SYSTEM");

    });

    it("a new user cannot be added if the system is paused", async function (){
        

        //if paused, addUser doesn't have to work
        await userManager.pause();

        await expect(userManager.addUser(consumer.address, ["CONSUMER"])).to.be.revertedWith("Pausable: paused");

        //when unpaused, addUser returns to work
        await userManager.unpause();
        await userManager.addUser(consumer.address, ["CONSUMER"]);

        expect(await userManager.getRoles(consumer.address)).to.have.length(1);
        expect(await userManager.getRoles(consumer.address)).to.include("CONSUMER");



    });


    it("the system bans a user and sees the status of its account", async function (){
        


        await userManager.addUser(consumer.address, ["CONSUMER"]);

        expect (await roleManager.connect(userManager.address).isActive(consumer.address)).to.equal(true);

        await userManager.banUser(consumer.address);

        expect (await roleManager.connect(userManager.address).isActive(consumer.address)).to.equal(false);

    });

    it("the system cannot ban a user if it is paused", async function (){
        

        await userManager.addUser(consumer.address, ["CONSUMER"]);

        //if paused, banUser doesn't have to work
        await userManager.pause();

        await expect(userManager.banUser(consumer.address)).to.be.revertedWith("Pausable: paused");

        //when unpaused, banUser returns to work
        await userManager.unpause();


        await userManager.banUser(consumer.address);

        expect (await roleManager.connect(userManager.address).isActive(consumer.address)).to.equal(false);

    });

    it("only the admin and the system can ban a user", async function (){
        


        await userManager.addUser(consumer.address, ["CONSUMER"]);
        await userManager.addUser(artist.address, ["CONSUMER", "ARTIST"]);

        await expect(userManager.connect(consumer).banUser(artist.address)).to.be.revertedWith("RoleObserver: Function is restricted to ADMIN.");


    });

    it("the system cannot ban a user who is already suspended", async function (){
        


        await userManager.addUser(consumer.address, ["CONSUMER"]);

        await userManager.banUser(consumer.address);

        await expect(userManager.banUser(consumer.address)).to.be.revertedWith("UserManager: User must be an active one.");
        
        await userManager.unbanUser(consumer.address);

        await userManager.banUser(consumer.address);


        expect (await roleManager.connect(userManager.address).isActive(consumer.address)).to.equal(false);


    });

    it("the system unbans a user and sees the status of its account", async function (){
        

        await userManager.addUser(consumer.address, ["CONSUMER"]);
        await userManager.banUser(consumer.address);
        await userManager.unbanUser(consumer.address);


        expect (await roleManager.connect(userManager.address).isActive(consumer.address)).to.equal(true);

    });

    it("the system cannot unban a user if it is paused", async function (){
        

        await userManager.addUser(consumer.address, ["CONSUMER"]);
        await userManager.banUser(consumer.address);

        //if paused, unbanUser doesn't have to work
        await userManager.pause();

        await expect(userManager.unbanUser(consumer.address)).to.be.revertedWith("Pausable: paused");

        //when unpaused, unbanUser returns to work
        await userManager.unpause();


        await userManager.unbanUser(consumer.address);

        expect (await roleManager.connect(userManager.address).isActive(consumer.address)).to.equal(true);

    });

    it("only the admin and the system can unban a user", async function (){
        


        await userManager.addUser(consumer.address, ["CONSUMER"]);
        await userManager.addUser(artist.address, ["CONSUMER", "ARTIST"]);

        await userManager.banUser(artist.address);


        await expect(userManager.connect(consumer).unbanUser(artist.address)).to.be.revertedWith("RoleObserver: Function is restricted to ADMIN.");


    });

    it("the system cannot unban a user who is not suspended", async function (){
        


        await userManager.addUser(consumer.address, ["CONSUMER"]);

        await expect(userManager.unbanUser(consumer.address)).to.be.revertedWith("UserManager: User is not banned.");
        
        await userManager.banUser(consumer.address);
        await userManager.unbanUser(consumer.address);

        expect (await roleManager.connect(userManager.address).isActive(consumer.address)).to.equal(true);

    });

    it("RoleObserver: admin adds new roleManager", async function() {
        

        console.log(
            "Deploying the contract with the account:",
            await deployer.getAddress()
        );

        console.log("Account balance:", (await deployer.getBalance()).toString());

        const RoleManager = await ethers.getContractFactory("RoleManager");

        //deploy with pablock address for mumbai network
        const newRoleManager = await RoleManager.deploy("0x4419AF074BC3a6C7D90f242dfdC1a163Bc710091"); 

        await newRoleManager.deployed();

        console.log("New RoleManager deployed at:", newRoleManager.address);

        userManager.addNewRoleManager(newRoleManager.address);

        expect(await newRoleManager.isAdmin(deployer.address)).to.equal(true);

    });


    it("RoleObserver: admin cannot add address zero as new roleManager", async function() {
        

        await expect(userManager.addNewRoleManager("0x0000000000000000000000000000000000000000")).to.be.revertedWith("RoleObserver: You are trying to set RoleManager to address(0).");


    });

    it("RoleObserver: test modifier onlyRoleManager", async function() {
        

        await expect(userManager.deleteRole("CONSUMER")).to.be.revertedWith("RoleObserver: Function is restricted to RoleManager.");


    });


});