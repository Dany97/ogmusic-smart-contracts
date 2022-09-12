pragma solidity >=0.4.22 <0.9.0;

//SPDX-License-Identifier: UNLICENSED

import {RoleManager} from "./RoleManager.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableMap.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "./RoleObserver.sol";
import "hardhat/console.sol";

contract UserManager is RoleObserver, AccessControlEnumerable {
    struct UserData {
        // Updated array of strings for roles of a user e.g. ["CONSUMER", "ARTIST"].
        string[] roles;
        // Either "ACTIVE" or "SUSPENDED".
        string activityStatus;
    }

    // Public access to registry is only via getters automatically generated by the compiler.
    mapping(address => UserData) public registry;

    /*
     *  Attributes that serve as dynamic array variables within addUser(); they need to be kept in the storage.
     */
    string[] toGrant;
    string[] toRevoke;
    string[] finalRoles;

    event UserIsRegistered(address indexed newUser, string[] userRole);
    event UserIsActivated(address indexed user);
    event UserIsBanned(address indexed user);
    event UserIsUnbanned(address indexed user);

    constructor(address initialRoleManagerAddress) {
        require(
            initialRoleManagerAddress != address(0),
            "UserManager: RoleManager address must not be zero."
        );
        roleManagerAddress = initialRoleManagerAddress;
        roleManager = RoleManager(initialRoleManagerAddress);
        deployer = msg.sender;
    }

    function initialize() public onlyOnce {
        /* The roleManager is registered as an observer of RoleManager's state, effects are:
         *  - Observed state _ACCOUNTROLES get initialised at UserManager.
         *  - UserManager becomes SYSTEM.
         */
        roleManager.registerAsRoleObserver(address(this));

        address[] memory admins = roleManager.getAccountsByRole("ADMIN");

        // Admin registration
        for (uint256 i = 0; i < admins.length; i++) {
            registry[admins[i]].roles.push("ADMIN");
            registry[admins[i]].activityStatus = "ACTIVE";
            roleManager.grantRole(ACTIVE, admins[i]);
        }

        //deployer set to address zero to trigger the onlyOnce modifier
        deployer = address(0);
    }

    /*
     *  @dev This getter is necessary because the Solidity-generated getter of mapping 'registry'
     *  will ignore the mappings or arrays used inside the struct, i.e. it doesn't return its array 'roles'.
     */
    function getRoles(address account) external view returns (string[] memory) {
        return registry[account].roles;
    }

    /*
     *  @dev Function that performs the registration of a certain account.
     */
    function addUser(address newAddress, string[] memory roleNames)
        external
        onlyAdmin
    {
        require(
            (registry[newAddress].roles.length == 0 &&
                keccak256(bytes(registry[newAddress].activityStatus)) ==
                keccak256("")),
            "UserManager: User already registered"
        );

        //a user cannot be simultaneously CONSUMER and ADMIN
        for (uint256 i = 0; i < roleNames.length; i++) {
            for (uint256 j = 0; j < roleNames.length; j++) {
                require(
                    !((keccak256(abi.encodePacked(roleNames[i])) ==
                        keccak256(abi.encodePacked("CONSUMER"))) &&
                        (
                            (keccak256(abi.encodePacked(roleNames[j])) ==
                                (keccak256(abi.encodePacked("ADMIN"))))
                        )),
                    "UserManager: A user cannot be simultaneously CONSUMER and ADMIN"
                );
            }
        }

        //a user cannot be simultaneously ARTIST and ADMIN
        for (uint256 i = 0; i < roleNames.length; i++) {
            for (uint256 j = 0; j < roleNames.length; j++) {
                require(
                    !((keccak256(abi.encodePacked(roleNames[i])) ==
                        keccak256(abi.encodePacked("ARTIST"))) &&
                        (keccak256(abi.encodePacked(roleNames[j])) ==
                            keccak256(abi.encodePacked("ADMIN")))),
                    "UserManager: A user cannot be simultaneously ARTIST and ADMIN"
                );
            }
        }

        //a user cannot be SYSTEM

        for (uint256 i = 0; i < roleNames.length; i++) {
            require(
                !(keccak256(abi.encodePacked(roleNames[i])) ==
                    keccak256(abi.encodePacked("SYSTEM"))),
                "UserManager: A user cannot be SYSTEM"
            );
        }

        roleManager.grantRole(ACTIVE, newAddress);

        for (uint256 i = 0; i < roleNames.length; i++) {
            roleManager.grantRole(keccak256(bytes(roleNames[i])), newAddress);

            registry[newAddress].roles.push(roleNames[i]);
            registry[newAddress].activityStatus = "ACTIVE";

            emit UserIsRegistered(newAddress, roleNames);
        }

        emit UserIsActivated(newAddress);

        return;
    }

    /*
     *  @dev Function that performs the update of a certain account roles.
     */
    function updateUser(address user, string[] memory newRoles)
        external
        onlyAdmin
    {
        require(
            (registry[user].roles.length != 0 &&
                keccak256(bytes(registry[user].activityStatus)) !=
                keccak256("")),
            "UserManager: The user you are trying to update is not registered"
        );

        //a user cannot be simultaneously CONSUMER and ADMIN
        for (uint256 i = 0; i < newRoles.length; i++) {
            for (uint256 j = 0; j < newRoles.length; j++) {
                require(
                    !((keccak256(abi.encodePacked(newRoles[i])) ==
                        keccak256(abi.encodePacked("CONSUMER"))) &&
                        (
                            (keccak256(abi.encodePacked(newRoles[j])) ==
                                (keccak256(abi.encodePacked("ADMIN"))))
                        )),
                    "UserManager: A user cannot be simultaneously CONSUMER and ADMIN"
                );
            }
        }

        //a user cannot be simultaneously ARTIST and ADMIN
        for (uint256 i = 0; i < newRoles.length; i++) {
            for (uint256 j = 0; j < newRoles.length; j++) {
                require(
                    !((keccak256(abi.encodePacked(newRoles[i])) ==
                        keccak256(abi.encodePacked("ARTIST"))) &&
                        (keccak256(abi.encodePacked(newRoles[j])) ==
                            keccak256(abi.encodePacked("ADMIN")))),
                    "UserManager: A user cannot be simultaneously ARTIST and ADMIN"
                );
            }
        }

        //a user cannot be SYSTEM

        for (uint256 i = 0; i < newRoles.length; i++) {
            require(
                !(keccak256(abi.encodePacked(newRoles[i])) ==
                    keccak256(abi.encodePacked("SYSTEM"))),
                "UserManager: A user cannot be SYSTEM"
            );
        }

        delete toGrant;
        bool flag;
        // Iterate through newRoles to find what roles are not in registry[user].roles
        for (uint256 j = 0; j < newRoles.length; j++) {
            for (uint256 k = 0; k < registry[user].roles.length; k++) {
                if (
                    keccak256(bytes(newRoles[j])) ==
                    keccak256(bytes(registry[user].roles[k]))
                ) {
                    flag = true;
                }
            }
            // If the flag is true, it means that role newRoles[j] was found in the old ones, so no need to grant it again
            if (flag == false) {
                toGrant.push(newRoles[j]);
            }
            flag = false;
        }

        // Iterate through newRoles to find what roles are in registry[user].roles while not in new Roles
        delete toRevoke;
        flag = false;
        for (uint256 j = 0; j < registry[user].roles.length; j++) {
            for (uint256 k = 0; k < newRoles.length; k++) {
                if (
                    keccak256(bytes(newRoles[k])) ==
                    keccak256(bytes(registry[user].roles[j]))
                ) {
                    flag = true;
                }
            }
            if (flag == false) {
                toRevoke.push(registry[user].roles[j]);
            }
            flag = false;
        }

        for (uint256 i = 0; i < toRevoke.length; i++) {
            roleManager.revokeRole(keccak256(bytes(toRevoke[i])), user);
        }

        for (uint256 l = 0; l < toGrant.length; l++) {
            roleManager.grantRole(keccak256(bytes(toGrant[l])), user);
        }

        //if the above for doesn't revert i can do this
        delete registry[user].roles;
        for (uint256 i = 0; i < newRoles.length; i++) {
            registry[user].roles.push(newRoles[i]);
        }
    }

    function banUser(address userAddress) external onlyAdmin {
        require(
            roleManager.hasRole(ACTIVE, userAddress),
            "UserManager: User must be an active one."
        );
        roleManager.revokeRole(ACTIVE, userAddress);
        roleManager.grantRole(SUSPENDED, userAddress);
        registry[userAddress].activityStatus = "SUSPENDED";

        emit UserIsBanned(userAddress);
    }

    function unbanUser(address userAddress) external onlyAdmin {
        require(
            roleManager.hasRole(SUSPENDED, userAddress),
            "UserManager: User is not banned."
        );
        roleManager.revokeRole(SUSPENDED, userAddress);
        roleManager.grantRole(ACTIVE, userAddress);
        registry[userAddress].activityStatus = "ACTIVE";

        emit UserIsUnbanned(userAddress);
    }

    /*
     *  @dev Override of RoleObserver's function that upon account role deletion also needs to
     *  update the user registry.
     */
    function deleteRole(string calldata roleName) public virtual override {
        super.deleteRole(roleName);

        /*
         *  @dev To purge the role across all the registry, we fetch the users having the target role (to be deleted)
         *  and for each of them: 1) push into a dynamic array all remaining role strings; 2) revoke the target role;
         *  3) update the registry entry of the user with the dynamic array.
         *
         *  Solidity stores dynamic arrays i.e. those that do not have a finite size at declaration (in this case
         *  finalRoles) in storage i.e. there should be a contract state variable for it, hence we should account for its
         *  persistence when we use it: we should clean it at each function run at the beginning or at the end.
         */
        address[] memory users = roleManager.getAccountsByRole(roleName);

        for (uint256 i = 0; i < users.length; i++) {
            // @dev Clean it before filling it (equivalent: after usage) as it's in storage.
            delete finalRoles;

            for (uint256 j = 0; j < registry[users[i]].roles.length; j++) {
                if (
                    keccak256(bytes(registry[users[i]].roles[j])) !=
                    keccak256(bytes(roleName))
                ) {
                    finalRoles.push(registry[users[i]].roles[j]);
                }
            }
            roleManager.revokeRole(keccak256(bytes(roleName)), users[i]);
            registry[users[i]].roles = finalRoles;
        }
    }
}
