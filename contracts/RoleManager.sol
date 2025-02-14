pragma solidity >=0.4.22 <0.9.0;

//SPDX-License-Identifier: UNLICENSED

import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "./RoleObserver.sol";
import "./UserManager.sol";
import "pablock-smart-contracts/contracts/PablockMetaTxReceiver.sol";

/*
@dev -> Purpose of the contract: implement a role-based logic that allows to handle roles and accounts 
status. In particular it can be used to distinguish CONSUMER, ARTIST, ADMIN and SYSTEM(smart contracts)
roles, ACTIVE and SUSPENDED account status (in order to ban and unban users). All this logic allows,
for the MVP version of the platform, the possibility to have functions executable only by the ADMIN of 
the platform (through an observer pattern that allows the executive smart contracts to be updated
with the RoleManager's status and always be aware of who is the ADMIN).

This logic allows, for the future, to implement in the platform the possibility to add, remove, update,
ban and unban users (UserManager), add and remove roles, add and remove ADMINs except the MasterAdmin 
(RoleManager) directly on chain.

Furthermore, it is built as a starting point for a potential integration of Gnosis Safe, a multisignature
protocol useful to enhance the security of the platform from the Admin perspective.
*/

contract RoleManager is AccessControlEnumerable, PablockMetaTxReceiver {
    // @dev Proposal: adding roles
    // Roles are referred to by their `bytes32` identifier.

    bytes32[] internal _ACCOUNTROLES;

    bytes32 public constant ADMIN = keccak256("ADMIN");
    bytes32 public constant ACTIVE = keccak256("ACTIVE");
    bytes32 public constant SUSPENDED = keccak256("SUSPENDED");
    bytes32 public constant SYSTEM = keccak256("SYSTEM");

    address[] private _observers;

    //the master admin has a non deletable role (instead of other admins that can be deleted)
    address private masterAdmin;

    event RoleCreated(string role);
    event RoleDeleted(string role);

    constructor(address metaTxAddress)
        PablockMetaTxReceiver("RoleManager", "0.1.1")
    {
        //lets the contract enable notarizzazione.cloud metatransactions
        setMetaTransaction(metaTxAddress);

        // Grant the contract deployer the default admin role: it will be able
        // to grant and revoke any roles.
        _ACCOUNTROLES.push(keccak256("CONSUMER"));
        _ACCOUNTROLES.push(keccak256("ARTIST"));
        _ACCOUNTROLES.push(keccak256("ADMIN"));
        _ACCOUNTROLES.push(keccak256("SYSTEM"));

        _setupRole(ADMIN, msg.sender);
        grantRole(ACTIVE, msg.sender);
        _grantRole(ADMIN, msg.sender);

        masterAdmin = msg.sender;

        _grantRole(SYSTEM, address(this));
    }

    //@dev modifier to set restrictions to methods -> only the admin can execute them

    modifier onlyAdmin() {
        require(
            hasRole(ADMIN, msgSender()),
            "Role Manager: Function is restricted to ADMIN."
        );
        _;
    }

    //useful because if metxTx doesn't work it would be impossible to use pablock msgSender()
    modifier onlyAdminNoMetaTx() {
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
            hasRole(SYSTEM, msgSender()) || hasRole(ADMIN, tx.origin),
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

        emit RoleCreated(name);
    }

    //@dev method for the admin useful to delete an existing role (role ADMIN cannot be deleted)
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

                emit RoleDeleted(name);
                return;
            }
        }
        revert("RoleManager: Account role hash was not found.");
    }

    function grantRole(bytes32 role, address account) public virtual override {
        if (role == ADMIN) {
            require(
                hasRole(ADMIN, msgSender()),
                "RoleManager: Function is restricted to Admins."
            );
        } else {
            require(
                hasRole(ADMIN, msgSender()) || hasRole(SYSTEM, msgSender()),
                "RoleManager: Function is restricted to ADMIN or SYSTEM."
            );
            /*
            UserManager calls registerAsRoleObserver that in turn calls grantRole,
            this is why hasRole(SYSTEM) was added
            */
        }
        _grantRole(role, account);
    }

    // @dev: method used to revoke a role to an account (impossible with MasterAdmin's ADMIN role)
    function revokeRole(bytes32 role, address account)
        public
        virtual
        override
        onlyAdminAndSystem
    {
        if (role == ADMIN) {
            require(
                account != masterAdmin,
                "RoleManager: you cannot eliminate the Master Admin from his role"
            );
        }
        _revokeRole(role, account);
    }

    // method to reset metatransaction address in case of changes in the contract

    function set_MetaTransaction(address metaTxAddress)
        public
        onlyAdminNoMetaTx
    {
        setMetaTransaction(metaTxAddress);
    }
}
