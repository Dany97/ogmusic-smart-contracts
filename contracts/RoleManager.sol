pragma solidity ^0.8.0;

//SPDX-License-Identifier: UNLICENSED

import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "./RoleObserver.sol";

contract RoleManager is AccessControlEnumerable {
    // @dev Proposal: adding roles
    // Roles are referred to by their `bytes32` identifier. These should be exposed
    // in the external API and be unique. The best way to achieve this is by
    // using `public constant` hash digests.

    bytes32[] internal _ACCOUNTROLES;

    bytes32 public constant ADMIN = keccak256("ADMIN");
    bytes32 public constant ACTIVE = keccak256("ACTIVE");
    bytes32 public constant SUSPENDED = keccak256("SUSPENDED");

    address[] private _observers;

    event RoleIsCreated(string role);
    event RoleIsDeleted(string role);

    constructor() {
        // Grant the contract deployer the default admin role: it will be able
        // to grant and revoke any roles.
        _ACCOUNTROLES.push(keccak256("CONSUMER"));
        _ACCOUNTROLES.push(keccak256("ARTIST"));
        _ACCOUNTROLES.push(keccak256("ADMIN"));

        _setupRole(ADMIN, msg.sender);
        grantRole(ACTIVE, msg.sender);
        _grantRole(ADMIN, msg.sender);
    }

    //@dev modifier to set restrictions to methods -> only the admin can execute them

    modifier onlyAdmin() {
        require(hasRole(ADMIN, msg.sender), "Function is restricted to ADMIN.");
        _;
    }

    //@dev method that returns the array containing all addresses that have "role" in their roles
    function getAccountsByRole(string memory role)
        public
        view
        onlyAdmin
        returns (address[] memory addresses)
    {
        bytes32 targetRole = keccak256(bytes(role));

        uint256 count = getRoleMemberCount(targetRole);

        address[] memory accounts = new address[](count);

        for (uint256 i = 0; i < count; i++)
            accounts[i] = (getRoleMember(targetRole, i));

        return accounts;
    }

    /*  This function is for OGMusic contracts to register themselves as observers of RoleManager's state.
        Only OGMusic contracts deployed by an admin are allowed to register, and will be granted the SYSTEM
        role only when they do so.
    */
    function registerAsRoleObserver(address contractAddress) external {
        require(
            hasRole(ADMIN, tx.origin),
            "RoleManager: Function is restricted to ADMIN."
        );
        _grantRole(keccak256("SYSTEM"), contractAddress);

        _observers.push(contractAddress);
        RoleObserver(contractAddress).setAccountRoles(_ACCOUNTROLES);
    }

    function isAdmin(address account) public view returns (bool) {
        return hasRole(ADMIN, account);
    }

    function isActive(address account) public view returns (bool) {
        return hasRole(ACTIVE, account);
    }

    //@dev method useful in case the admin wants to add a new role
    function addRole(string calldata name) public onlyAdmin {
        for (uint256 i = 0; i < _ACCOUNTROLES.length; i++) {
            if (_ACCOUNTROLES[i] == keccak256(abi.encodePacked(name))) {
                revert("RoleManager: Account role already existent.");
            }
        }
        _ACCOUNTROLES.push(keccak256(abi.encodePacked(name)));

        // Triggering all RoleManager observers state update.
        for (uint256 i = 0; i < _observers.length; i++)
            RoleObserver(_observers[i]).addAccountRole(name);

        emit RoleIsCreated(name);
    }

    //@dev method for the admin useful to delete an existing role
    function deleteRole(string memory name) public onlyAdmin {
        require(
            keccak256(abi.encodePacked(name)) !=
                keccak256(abi.encodePacked("ADMIN")),
            "RoleManager: no one, not even the Admin, can delete the role ADMIN"
        );
        for (uint256 i = 0; i < _ACCOUNTROLES.length; i++) {
            if (_ACCOUNTROLES[i] == keccak256(abi.encodePacked(name))) {
                _ACCOUNTROLES[i] = _ACCOUNTROLES[_ACCOUNTROLES.length - 1];
                _ACCOUNTROLES.pop();

                // Triggering all RoleManager observers state update.
                for (uint256 j = 0; j < _observers.length; j++)
                    RoleObserver(_observers[j]).deleteAccountRole(name);

                emit RoleIsDeleted(name);
                return;
            }
        }
        revert("RoleManager: Account role hash was not found.");
    }

    function grantRole(bytes32 role, address account)
        public
        virtual
        override
        onlyAdmin
    {
        _grantRole(role, account);
    }

    function revokeRole(bytes32 role, address account)
        public
        virtual
        override
        onlyAdmin
    {
        _revokeRole(role, account);
    }
}
