import { PablockSDK } from "@bcode-tech/pablock-sdk";

describe("RoleManager pablock test", function(){
    
    it("pablock test", async function () {

        (async () => {
            const sdk = new PablockSDK({
            apiKey: "https://rpc-mumbai.maticvigil.com",
            privateKey: [process.env.PRIVATE_KEY],
            config: { env: "MUMBAI", debugMode: true }
            });

            await sdk.init();

            const tx = await sdk.prepareTransaction(
                {
                    address: "0x519AC564b30298F04088a51cac5B4DBdcf2359E2",  //indirizzo del contratto da testare
                    abi: [
                        {
                            "inputs": [
                                {
                                    "internalType": "address",
                                    "name": "metaTxAddress",
                                    "type": "address"
                                }
                            ],
                            "stateMutability": "nonpayable",
                            "type": "constructor"
                        },
                        {
                            "anonymous": false,
                            "inputs": [
                                {
                                    "indexed": true,
                                    "internalType": "bytes32",
                                    "name": "role",
                                    "type": "bytes32"
                                },
                                {
                                    "indexed": true,
                                    "internalType": "bytes32",
                                    "name": "previousAdminRole",
                                    "type": "bytes32"
                                },
                                {
                                    "indexed": true,
                                    "internalType": "bytes32",
                                    "name": "newAdminRole",
                                    "type": "bytes32"
                                }
                            ],
                            "name": "RoleAdminChanged",
                            "type": "event"
                        },
                        {
                            "anonymous": false,
                            "inputs": [
                                {
                                    "indexed": false,
                                    "internalType": "string",
                                    "name": "role",
                                    "type": "string"
                                }
                            ],
                            "name": "RoleCreated",
                            "type": "event"
                        },
                        {
                            "anonymous": false,
                            "inputs": [
                                {
                                    "indexed": false,
                                    "internalType": "string",
                                    "name": "role",
                                    "type": "string"
                                }
                            ],
                            "name": "RoleDeleted",
                            "type": "event"
                        },
                        {
                            "anonymous": false,
                            "inputs": [
                                {
                                    "indexed": true,
                                    "internalType": "bytes32",
                                    "name": "role",
                                    "type": "bytes32"
                                },
                                {
                                    "indexed": true,
                                    "internalType": "address",
                                    "name": "account",
                                    "type": "address"
                                },
                                {
                                    "indexed": true,
                                    "internalType": "address",
                                    "name": "sender",
                                    "type": "address"
                                }
                            ],
                            "name": "RoleGranted",
                            "type": "event"
                        },
                        {
                            "anonymous": false,
                            "inputs": [
                                {
                                    "indexed": true,
                                    "internalType": "bytes32",
                                    "name": "role",
                                    "type": "bytes32"
                                },
                                {
                                    "indexed": true,
                                    "internalType": "address",
                                    "name": "account",
                                    "type": "address"
                                },
                                {
                                    "indexed": true,
                                    "internalType": "address",
                                    "name": "sender",
                                    "type": "address"
                                }
                            ],
                            "name": "RoleRevoked",
                            "type": "event"
                        },
                        {
                            "inputs": [],
                            "name": "ACTIVE",
                            "outputs": [
                                {
                                    "internalType": "bytes32",
                                    "name": "",
                                    "type": "bytes32"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [],
                            "name": "ADMIN",
                            "outputs": [
                                {
                                    "internalType": "bytes32",
                                    "name": "",
                                    "type": "bytes32"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [],
                            "name": "DEFAULT_ADMIN_ROLE",
                            "outputs": [
                                {
                                    "internalType": "bytes32",
                                    "name": "",
                                    "type": "bytes32"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [],
                            "name": "SUSPENDED",
                            "outputs": [
                                {
                                    "internalType": "bytes32",
                                    "name": "",
                                    "type": "bytes32"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [],
                            "name": "SYSTEM",
                            "outputs": [
                                {
                                    "internalType": "bytes32",
                                    "name": "",
                                    "type": "bytes32"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "string",
                                    "name": "name",
                                    "type": "string"
                                }
                            ],
                            "name": "addRole",
                            "outputs": [],
                            "stateMutability": "nonpayable",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "string",
                                    "name": "name",
                                    "type": "string"
                                }
                            ],
                            "name": "deleteRole",
                            "outputs": [],
                            "stateMutability": "nonpayable",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "string",
                                    "name": "role",
                                    "type": "string"
                                }
                            ],
                            "name": "getAccountsByRole",
                            "outputs": [
                                {
                                    "internalType": "address[]",
                                    "name": "addresses",
                                    "type": "address[]"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "bytes32",
                                    "name": "role",
                                    "type": "bytes32"
                                }
                            ],
                            "name": "getRoleAdmin",
                            "outputs": [
                                {
                                    "internalType": "bytes32",
                                    "name": "",
                                    "type": "bytes32"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "bytes32",
                                    "name": "role",
                                    "type": "bytes32"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "index",
                                    "type": "uint256"
                                }
                            ],
                            "name": "getRoleMember",
                            "outputs": [
                                {
                                    "internalType": "address",
                                    "name": "",
                                    "type": "address"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "bytes32",
                                    "name": "role",
                                    "type": "bytes32"
                                }
                            ],
                            "name": "getRoleMemberCount",
                            "outputs": [
                                {
                                    "internalType": "uint256",
                                    "name": "",
                                    "type": "uint256"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "bytes32",
                                    "name": "role",
                                    "type": "bytes32"
                                },
                                {
                                    "internalType": "address",
                                    "name": "account",
                                    "type": "address"
                                }
                            ],
                            "name": "grantRole",
                            "outputs": [],
                            "stateMutability": "nonpayable",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "bytes32",
                                    "name": "role",
                                    "type": "bytes32"
                                },
                                {
                                    "internalType": "address",
                                    "name": "account",
                                    "type": "address"
                                }
                            ],
                            "name": "hasRole",
                            "outputs": [
                                {
                                    "internalType": "bool",
                                    "name": "",
                                    "type": "bool"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "address",
                                    "name": "account",
                                    "type": "address"
                                }
                            ],
                            "name": "isActive",
                            "outputs": [
                                {
                                    "internalType": "bool",
                                    "name": "",
                                    "type": "bool"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "address",
                                    "name": "account",
                                    "type": "address"
                                }
                            ],
                            "name": "isAdmin",
                            "outputs": [
                                {
                                    "internalType": "bool",
                                    "name": "",
                                    "type": "bool"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "string",
                                    "name": "role",
                                    "type": "string"
                                }
                            ],
                            "name": "isRole",
                            "outputs": [
                                {
                                    "internalType": "bool",
                                    "name": "",
                                    "type": "bool"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "address",
                                    "name": "account",
                                    "type": "address"
                                }
                            ],
                            "name": "isSystem",
                            "outputs": [
                                {
                                    "internalType": "bool",
                                    "name": "",
                                    "type": "bool"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [],
                            "name": "metaTxName",
                            "outputs": [
                                {
                                    "internalType": "string",
                                    "name": "",
                                    "type": "string"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "address",
                                    "name": "contractAddress",
                                    "type": "address"
                                }
                            ],
                            "name": "registerAsRoleObserver",
                            "outputs": [],
                            "stateMutability": "nonpayable",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "bytes32",
                                    "name": "role",
                                    "type": "bytes32"
                                },
                                {
                                    "internalType": "address",
                                    "name": "account",
                                    "type": "address"
                                }
                            ],
                            "name": "renounceRole",
                            "outputs": [],
                            "stateMutability": "nonpayable",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "bytes32",
                                    "name": "role",
                                    "type": "bytes32"
                                },
                                {
                                    "internalType": "address",
                                    "name": "account",
                                    "type": "address"
                                }
                            ],
                            "name": "revokeRole",
                            "outputs": [],
                            "stateMutability": "nonpayable",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "address",
                                    "name": "metaTxAddress",
                                    "type": "address"
                                }
                            ],
                            "name": "set_MetaTransaction",
                            "outputs": [],
                            "stateMutability": "nonpayable",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "bytes4",
                                    "name": "interfaceId",
                                    "type": "bytes4"
                                }
                            ],
                            "name": "supportsInterface",
                            "outputs": [
                                {
                                    "internalType": "bool",
                                    "name": "",
                                    "type": "bool"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [],
                            "name": "version",
                            "outputs": [
                                {
                                    "internalType": "string",
                                    "name": "",
                                    "type": "string"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        }
                    ],			             //abi del contratto (basta anche soltanto l'abi della funzione da testare)
                    name: "RoleManager",		 	         //nome del contratto che ho specificato nel constructor
                    version: "0.0.1",			             //versione del contratto che ho specificato nel constructor 
                },
                "addRole",			 //nome funzione da testare
                ["RUOLO"]						 //parametri in ingresso della funzione da testare
            );
    
    
    
    
        //la metatransazione verrà salvata nel parametro tx, che dovremo passare alla prossima funzione
    
        const requestId = await sdk.executeAsyncTransaction(tx, null); //tx è quello di prepareTransaction, optionals sono dei parametri tipo webHook, metadata
                                                                                //ecc. posso settarlo a null
    
    
    
        //executeAsyncTransaction produce un requestId che verrà passato alla prossima funzione
    
    
        const res = await sdk.getMetaTxRequest(requestId);
    
        console.log(res);
    
        //res è il risultato finale, dal quale potrò vedere se il test è andato a buon fine.
        /*
        
        res è composto così:
    
            status: "success" | "failed" | "pending" | "queued" | "mined"
            tx: EVM transaction object
            receipt: EVM receipt object
            ethTx: EVM receipt object
    
        da status posso capire se ha funzionato o meno
    
        */
            
            
          
         
        })();

        


    });

});