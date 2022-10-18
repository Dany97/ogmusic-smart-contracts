pragma solidity >=0.4.22 <0.9.0;

//SPDX-License-Identifier: UNLICENSED

import "./RoleManager.sol";
import "pablock-smart-contracts/contracts/PablockMetaTxReceiver.sol";

abstract contract RoleObserver is PablockMetaTxReceiver {
    address deployer;
    RoleManager roleManager;
    address roleManagerAddress;

    bytes32 public constant ACTIVE = keccak256("ACTIVE");
    bytes32 public constant SUSPENDED = keccak256("SUSPENDED");

    bytes32[] internal _ACCOUNTROLES;

    //modifiers

    modifier onlyRoleManager() {
        require(msgSender() == roleManagerAddress);
        _;
    }

    modifier onlyAdmin() {
        require(roleManager.isAdmin(msgSender()));
        _;
    }

    //useful for setMetaTransaction (if bcode changes metaTx address msgSender() may fail)

    modifier onlyAdminNoMetaTx() {
        require(roleManager.isAdmin(msg.sender));
        _;
    }

    modifier onlyOnce() {
        require(msgSender() == deployer);
        _;
    }

    /*
        Functions to be called for observed state (_ACCOUNTROLES[] at the RoleManager) update.
    */

    //useful if the address of the RoleManager changes
    function addNewRoleManager(address newRoleManagerAddress)
        external
        onlyAdmin
    {
        require(newRoleManagerAddress != address(0));
        roleManagerAddress = newRoleManagerAddress;
        roleManager = RoleManager(newRoleManagerAddress);
        roleManager.registerAsRoleObserver(address(this));
    }

    function addRole(string calldata roleName) external onlyRoleManager {
        _ACCOUNTROLES.push(keccak256(abi.encodePacked(roleName)));
    }

    function deleteRole(string calldata roleName)
        public
        virtual
        onlyRoleManager
    {
        for (uint256 i = 0; i < _ACCOUNTROLES.length; i++) {
            if (_ACCOUNTROLES[i] == keccak256(abi.encodePacked(roleName))) {
                _ACCOUNTROLES[i] = _ACCOUNTROLES[_ACCOUNTROLES.length - 1];
                _ACCOUNTROLES.pop();
                return; //otherwise the revert will always be executed
            }
        }
    }

    function setRoles(bytes32[] calldata allAccountRoles)
        external
        onlyRoleManager
    {
        for (uint256 i = 0; i < allAccountRoles.length; i++)
            _ACCOUNTROLES.push(allAccountRoles[i]);
    }
}
