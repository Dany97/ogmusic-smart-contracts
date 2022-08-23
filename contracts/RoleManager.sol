pragma solidity >=0.4.22 <0.9.0;

//SPDX-License-Identifier: UNLICENSED

import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "./RoleObserver.sol";
import "./UserManager.sol";
import "pablock-smart-contracts/contracts/PablockMetaTxReceiver.sol";

contract RoleManager is AccessControlEnumerable, PablockMetaTxReceiver {
    // @dev Proposal: adding roles
    // Roles are referred to by their `bytes32` identifier. These should be exposed
    // in the external API and be unique. The best way to achieve this is by
    // using `public constant` hash digests.

    bytes32[] internal _ACCOUNTROLES;

    bytes32 public constant ADMIN = keccak256("ADMIN");
    bytes32 public constant ACTIVE = keccak256("ACTIVE");
    bytes32 public constant SUSPENDED = keccak256("SUSPENDED");
    bytes32 public constant SYSTEM = keccak256("SYSTEM");

    address[] private _observers;

    event RoleIsCreated(string role);
    event RoleIsDeleted(string role);

    constructor(address metaTxAddress)
        PablockMetaTxReceiver("RoleManager", "0.0.1")
    {
        //lets the contract enable notarizzazione.cloud metatransactions
        //setMetaTransaction(metaTxAddress);

        // Grant the contract deployer the default admin role: it will be able
        // to grant and revoke any roles.
        _ACCOUNTROLES.push(keccak256("CONSUMER"));
        _ACCOUNTROLES.push(keccak256("ARTIST"));
        _ACCOUNTROLES.push(keccak256("ADMIN"));
        _ACCOUNTROLES.push(keccak256("SYSTEM"));

        _setupRole(ADMIN, msg.sender);
        grantRole(ACTIVE, msg.sender);
        _grantRole(ADMIN, msg.sender);

        _grantRole(SYSTEM, address(this));
    }

    //@dev modifier to set restrictions to methods -> only the admin can execute them

    modifier onlyAdmin() {
        require(
            hasRole(ADMIN, msg.sender),
            "Role Manager: Function is restricted to ADMIN."
        );
        _;
    }

    /*
    @dev modifier to set restrictions to methods -> only the admin and the allowed contracts
    can execute them
    */

    modifier onlyAdminAndSystem() {
        require(
            hasRole(SYSTEM, msg.sender) || hasRole(ADMIN, tx.origin),
            "RoleManager: Function is restricted to ADMIN and SYSTEM."
        );
        _;
    }

    //@dev method that returns the array containing all addresses that have "role" in their roles
    function getAccountsByRole(string memory role)
        public
        view
        onlyAdminAndSystem
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

        _grantRole(SYSTEM, contractAddress);

        _observers.push(contractAddress);
        RoleObserver(contractAddress).setRoles(_ACCOUNTROLES);
    }

    function isSystem(address account) public view returns (bool) {
        return hasRole(SYSTEM, account);
    }

    function isAdmin(address account) public view returns (bool) {
        return hasRole(ADMIN, account);
    }

    function isActive(address account) public view returns (bool) {
        return hasRole(ACTIVE, account);
    }

    function isRole(string calldata role) public view returns (bool) {
        for (uint256 i = 0; i < _ACCOUNTROLES.length; i++) {
            if (_ACCOUNTROLES[i] == keccak256(abi.encodePacked(role))) {
                return true;
            }
        }

        return false;
    }

    //@dev method useful in case the admin wants to add a new role
    function addRole(string calldata name) public onlyAdmin {
        for (uint256 i = 0; i < _ACCOUNTROLES.length; i++) {
            if (_ACCOUNTROLES[i] == keccak256(abi.encodePacked(name))) {
                revert("RoleManager: Account role already exists");
            }
        }
        _ACCOUNTROLES.push(keccak256(abi.encodePacked(name)));

        // Triggering all RoleManager observers state update.
        for (uint256 i = 0; i < _observers.length; i++)
            RoleObserver(_observers[i]).addRole(name);

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
                    UserManager(_observers[j]).deleteRole(name);

                emit RoleIsDeleted(name);
                return;
            }
        }
        revert("RoleManager: Account role hash was not found.");
    }

    function grantRole(bytes32 role, address account) public virtual override {
        if (role == ADMIN) {
            require(
                hasRole(ADMIN, msg.sender),
                "RoleManager: Function is restricted to Admins."
            );
        } else {
            require(
                hasRole(ADMIN, msg.sender) || hasRole(SYSTEM, msg.sender),
                "RoleManager: Function is restricted to ADMIN or SYSTEM."
            );
            /*
            UserManager calls registerAsRoleObserver that in turn calls grantRole,
            this is why hasRole(SYSTEM) was added
            */
        }
        _grantRole(role, account);
    }

    function revokeRole(bytes32 role, address account)
        public
        virtual
        override
        onlyAdminAndSystem
    {
        require(role != ADMIN, "RoleManager: you cannot revoke ADMIN role");
        _revokeRole(role, account);
    }

    // method to reset metatransaction in case of changes in the contract
    /*
    function set_MetaTransaction(address metaTxAddress) public {
        setMetaTransaction(metaTxAddress);
    }
    */
}
