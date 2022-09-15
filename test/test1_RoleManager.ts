import { expect } from "chai";
import { ethers } from "hardhat";


describe("RoleManager", function(){
    
    let deployer, consumer, artist, system;
    let roleManager;

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
    });

    

    it("only an admin or the system can view the array of addresses for each role", async function () {
        
        
        await roleManager.grantRole(ethers.utils.solidityKeccak256(["string"], ["CONSUMER"]), consumer.address);
        await roleManager.grantRole(ethers.utils.solidityKeccak256(["string"], ["CONSUMER"]), artist.address);
        await roleManager.grantRole(ethers.utils.solidityKeccak256(["string"], ["ARTIST"]), artist.address);
        await roleManager.grantRole(ethers.utils.solidityKeccak256(["string"], ["SYSTEM"]), system.address);

        //the admin can see the accounts
        expect(await roleManager.getAccountsByRole("CONSUMER")).to.include(consumer.address);
        expect(await roleManager.getAccountsByRole("CONSUMER")).to.include(artist.address);
        expect(await roleManager.getAccountsByRole("CONSUMER")).to.have.length(2);
        expect(await roleManager.getAccountsByRole("QQQ")).to.have.length(0);

        




        //the system can see the accounts
        expect(await roleManager.connect(system).getAccountsByRole("CONSUMER")).to.include(consumer.address);
        expect(await roleManager.connect(system).getAccountsByRole("CONSUMER")).to.include(artist.address);
        expect(await roleManager.connect(system).getAccountsByRole("CONSUMER")).to.have.length(2);


        //a consumer cannot execute the function
        await expect(roleManager.connect(consumer).getAccountsByRole("CONSUMER")).to.be.revertedWith("RoleManager: Function is restricted to ADMIN and SYSTEM.");

    });
    
    it("an admin can add and remove a role", async function () {
        
        
        //add role test
        await roleManager.addRole("TEST");


        expect(await roleManager.isRole("TEST")).to.equal(true);

        expect(await roleManager.isRole("WRONGTEST")).to.equal(false);


        //remove role test

        //adding observer to trigger

        const UserManager = await ethers.getContractFactory("UserManager");

        const userManager = await UserManager.deploy(roleManager.address);

        console.log("UserManager deployed at:", userManager.address);

        await userManager.initialize();

        await userManager.addUser(consumer.address, ["TEST", "CONSUMER"]);
        await userManager.addUser(artist.address, ["TEST", "CONSUMER", "ARTIST"]);


        await roleManager.deleteRole("TEST");

        expect(await roleManager.isRole("TEST")).to.equal(false);


        

    });


    
    it("only an admin can add or delete a role", async function () {
        
        




        //reverts if role is consumer
        await roleManager.grantRole(ethers.utils.solidityKeccak256(["string"], ["CONSUMER"]), consumer.address);

        //add role test
        await expect(roleManager.connect(consumer).addRole("TEST")).to.be.revertedWith("Role Manager: Function is restricted to ADMIN.");
        

        //delete role test
        await expect(roleManager.connect(consumer).deleteRole("ARTIST")).to.be.revertedWith("Role Manager: Function is restricted to ADMIN.");



    });


    it("no one, not even an admin, can delete the admin role", async function () {
        

        await roleManager.grantRole(ethers.utils.solidityKeccak256(["string"], ["CONSUMER"]), consumer.address);

        //admin tries to delete ADMIN role
        await expect(roleManager.deleteRole("ADMIN")).to.be.revertedWith("RoleManager: no one, not even the Admin, can delete the role ADMIN");
        

        //consumer tries to delete ADMIN role
        await expect(roleManager.connect(consumer).deleteRole("ADMIN")).to.be.revertedWith("Role Manager: Function is restricted to ADMIN.");



    });

    it("the admin cannot add an already existing role", async function () {
        
        

        //admin tries to add ADMIN role
        await expect(roleManager.addRole("ADMIN")).to.be.revertedWith("RoleManager: Account role already exists");
        
    });

    it("the admin cannot delete a non-existing role", async function () {
        


        //admin tries to add ADMIN role
        await expect(roleManager.deleteRole("NON EXISTING ROLE")).to.be.revertedWith("RoleManager: Account role hash was not found.");
        
    });


    it("checks for boolean view functions", async function () {
        
        

        await roleManager.grantRole(ethers.utils.solidityKeccak256(["string"], ["CONSUMER"]), consumer.address);
        await roleManager.grantRole(ethers.utils.solidityKeccak256(["string"], ["SYSTEM"]), system.address);


        //isSystem
        expect(await roleManager.isSystem(system.address)).to.equal(true);
        expect(await roleManager.isSystem(consumer.address)).to.equal(false);

        //isAdmin
        expect(await roleManager.isAdmin(deployer.address)).to.equal(true);
        expect(await roleManager.isAdmin(consumer.address)).to.equal(false);

        //isActive
        expect(await roleManager.isActive(deployer.address)).to.equal(true);
        expect(await roleManager.isActive(consumer.address)).to.equal(false);

        //isRole
        expect(await roleManager.isRole("ADMIN")).to.equal(true);
        expect(await roleManager.isRole("PIPPO")).to.equal(false);



        
    });

    it("only system or admin can grant a role", async function () {


        //reverts if consumer tries to grant a role
        await expect(roleManager.connect(consumer).grantRole(ethers.utils.solidityKeccak256(["string"], ["SYSTEM"]), system.address)).to.be.revertedWith("RoleManager: Function is restricted to ADMIN or SYSTEM.");

        //admin grants a role
        await roleManager.grantRole(ethers.utils.solidityKeccak256(["string"], ["SYSTEM"]), system.address);
        expect(await roleManager.isSystem(system.address)).to.equal(true);

        //system grants a role
        await roleManager.connect(system).grantRole(ethers.utils.solidityKeccak256(["string"], ["ACTIVE"]), consumer.address);
        expect(await roleManager.isActive(consumer.address)).to.equal(true);

    });


    it("only admin can grant ADMIN role", async function () {


        //reverts if consumer tries to grant ADMIN role
        await expect(roleManager.connect(consumer).grantRole(ethers.utils.solidityKeccak256(["string"], ["ADMIN"]), artist.address)).to.be.revertedWith("RoleManager: Function is restricted to Admins.");

        //reverts if system tries to grant ADMIN role
        await roleManager.grantRole(ethers.utils.solidityKeccak256(["string"], ["SYSTEM"]), system.address);
        await expect(roleManager.connect(system).grantRole(ethers.utils.solidityKeccak256(["string"], ["ADMIN"]), artist.address)).to.be.revertedWith("RoleManager: Function is restricted to Admins.");

        //admin grants ADMIN role
        await roleManager.grantRole(ethers.utils.solidityKeccak256(["string"], ["ADMIN"]), artist.address);
        expect(await roleManager.isAdmin(artist.address)).to.equal(true);

    });

    it("only system or admin can revoke a role", async function () {

        //the admin grants the roles that we'll try to revoke
        await roleManager.grantRole(ethers.utils.solidityKeccak256(["string"], ["SYSTEM"]), system.address);
        await roleManager.grantRole(ethers.utils.solidityKeccak256(["string"], ["ACTIVE"]), consumer.address);


        //reverts if consumer tries to revoke a role
        await expect(roleManager.connect(consumer).revokeRole(ethers.utils.solidityKeccak256(["string"], ["SYSTEM"]), system.address)).to.be.revertedWith("RoleManager: Function is restricted to ADMIN and SYSTEM.");

        //admin revokes a role
        await roleManager.revokeRole(ethers.utils.solidityKeccak256(["string"], ["SYSTEM"]), system.address);
        expect(await roleManager.isSystem(system.address)).to.equal(false);

        //system revokes a role
        await roleManager.grantRole(ethers.utils.solidityKeccak256(["string"], ["SYSTEM"]), system.address);
        await roleManager.connect(system).revokeRole(ethers.utils.solidityKeccak256(["string"], ["ACTIVE"]), consumer.address);
        expect(await roleManager.isActive(consumer.address)).to.equal(false);

    });


    it("no one, not even an admin, can revoke the Master Admin from ADMIN role", async function () {



        //reverts if consumer tries to revoke ADMIN role
        await expect(roleManager.connect(consumer).revokeRole(ethers.utils.solidityKeccak256(["string"], ["ADMIN"]), deployer.address)).to.be.revertedWith("RoleManager: Function is restricted to ADMIN and SYSTEM.");

        //reverts if admin tries to revoke Master Admin (deployer) from ADMIN role
        await expect(roleManager.revokeRole(ethers.utils.solidityKeccak256(["string"], ["ADMIN"]), deployer.address)).to.be.revertedWith("RoleManager: you cannot eliminate the Master Admin from his role");

        //reverts if system tries to revoke Master Admin (deployer) from ADMIN role
        await roleManager.grantRole(ethers.utils.solidityKeccak256(["string"], ["SYSTEM"]), system.address);
        await expect(roleManager.connect(system).revokeRole(ethers.utils.solidityKeccak256(["string"], ["ADMIN"]), deployer.address)).to.be.revertedWith("RoleManager: you cannot eliminate the Master Admin from his role");

        //grant to consumer ADMIN role
        await roleManager.grantRole(ethers.utils.solidityKeccak256(["string"], ["ADMIN"]), consumer.address);
        expect(await roleManager.isAdmin(consumer.address)).to.equal(true);


        //it's ok if admin or system try to revoke a normal admin (not the Master/deployer) from ADMIN role
        await roleManager.revokeRole(ethers.utils.solidityKeccak256(["string"], ["ADMIN"]), consumer.address);
        expect(await roleManager.isAdmin(consumer.address)).to.equal(false);

        await roleManager.grantRole(ethers.utils.solidityKeccak256(["string"], ["ADMIN"]), consumer.address);
        expect(await roleManager.isAdmin(consumer.address)).to.equal(true);


        await roleManager.connect(system).revokeRole(ethers.utils.solidityKeccak256(["string"], ["ADMIN"]), consumer.address);
        expect(await roleManager.isAdmin(consumer.address)).to.equal(false);


        
    });
    
    

    it("a contract registers as RoleObserver of RoleManager's state (tx.origin = Admin)", async function () {

        //deployment of userManager (potential observer)

        const UserManager = await ethers.getContractFactory("UserManager");

        const userManager = await UserManager.deploy(roleManager.address); 

        await userManager.deployed();

        //tx.origin = admin
        await roleManager.registerAsRoleObserver(userManager.address);
        expect(await roleManager.isSystem(userManager.address)).to.equal(true);


    });

    

    
    it("a contract can't register as RoleObserver of RoleManager's state if tx.origin != Admin", async function () {


        //deployment of userManager (potential observer)
        
        const UserManager = await ethers.getContractFactory("UserManager");

        const userManager = await UserManager.deploy(roleManager.address); 

        await userManager.deployed();

        //tx.origin != admin 
        await roleManager.grantRole(ethers.utils.solidityKeccak256(["string"], ["CONSUMER"]), consumer.address);
        await expect(roleManager.connect(consumer).registerAsRoleObserver(userManager.address)).to.be.revertedWith("RoleManager: Function is restricted to ADMIN.");

    });


    it("a contract registers as RoleObserver and is updated in addRole and deleteRole", async function () {


        //deployment of userManager (concrete observer)

        const UserManager = await ethers.getContractFactory("UserManager");

        const userManager = await UserManager.deploy(roleManager.address); 

        await userManager.deployed();

        //tx.origin = admin
        await roleManager.registerAsRoleObserver(userManager.address);

        //add role, test the branch in which userManager gets updated
        await roleManager.addRole("ROLE");

        expect(await roleManager.isRole("ROLE")).to.equal(true);


        //remove role, test the branch in which userManager gets updated
        await roleManager.deleteRole("ROLE");

        expect(await roleManager.isRole("ROLE")).to.equal(false);
        


    });

    
    
    
});

