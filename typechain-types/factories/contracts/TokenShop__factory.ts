/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { TokenShop, TokenShopInterface } from "../../contracts/TokenShop";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "initialRoleManagerAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "metaTxAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
    ],
    name: "tokensBought",
    type: "event",
  },
  {
    inputs: [],
    name: "ACTIVE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SUSPENDED",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newRoleManagerAddress",
        type: "address",
      },
    ],
    name: "addNewRoleManager",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "roleName",
        type: "string",
      },
    ],
    name: "addRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountToBuy",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "tokensAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "buyerAddress",
        type: "address",
      },
    ],
    name: "buyTokensWithUSDT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "roleName",
        type: "string",
      },
    ],
    name: "deleteRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "metaTxName",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32[]",
        name: "allAccountRoles",
        type: "bytes32[]",
      },
    ],
    name: "setRoles",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "metaTxAddress",
        type: "address",
      },
    ],
    name: "set_MetaTransaction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001eaa38038062001eaa8339818101604052810190620000379190620003c1565b6040518060400160405280600981526020017f546f6b656e53686f7000000000000000000000000000000000000000000000008152506040518060400160405280600581526020017f302e312e310000000000000000000000000000000000000000000000000000008152508160009080519060200190620000bb929190620002a7565b508060019080519060200190620000d4929190620002a7565b505050600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156200011257600080fd5b6200012381620001ee60201b60201c565b81600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555033600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050506200057b565b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508073ffffffffffffffffffffffffffffffffffffffff1663fc83158160006001306040518463ffffffff1660e01b8152600401620002709392919062000530565b600060405180830381600087803b1580156200028b57600080fd5b505af1158015620002a0573d6000803e3d6000fd5b5050505050565b828054620002b59062000437565b90600052602060002090601f016020900481019282620002d9576000855562000325565b82601f10620002f457805160ff191683800117855562000325565b8280016001018555821562000325579182015b828111156200032457825182559160200191906001019062000307565b5b50905062000334919062000338565b5090565b5b808211156200035357600081600090555060010162000339565b5090565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600062000389826200035c565b9050919050565b6200039b816200037c565b8114620003a757600080fd5b50565b600081519050620003bb8162000390565b92915050565b60008060408385031215620003db57620003da62000357565b5b6000620003eb85828601620003aa565b9250506020620003fe85828601620003aa565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200045057607f821691505b6020821081141562000467576200046662000408565b5b50919050565b600082825260208201905092915050565b60008190508160005260206000209050919050565b60008154620004a28162000437565b620004ae81866200046d565b94506001821660008114620004cc5760018114620004df5762000516565b60ff198316865260208601935062000516565b620004ea856200047e565b60005b838110156200050e57815481890152600182019150602081019050620004ed565b808801955050505b50505092915050565b6200052a816200037c565b82525050565b600060608201905081810360008301526200054c818662000493565b9050818103602083015262000562818562000493565b90506200057360408301846200051f565b949350505050565b61191f806200058b6000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c8063691a91c211610071578063691a91c21461013e5780636b9f43861461015a5780638129fc1c14610178578063b22d8bdc14610182578063c90bd0471461019e578063f29f968d146101bc576100a9565b80631b3c8c5a146100ae57806338d11041146100ca5780633e96e868146100e65780635204ef801461010257806354fd4d5014610120575b600080fd5b6100c860048036038101906100c3919061104b565b6101d8565b005b6100e460048036038101906100df91906110b2565b6105f1565b005b61010060048036038101906100fb9190611144565b6107f8565b005b61010a6108ae565b60405161011791906111aa565b60405180910390f35b6101286108d2565b604051610135919061125e565b60405180910390f35b610158600480360381019061015391906112d6565b610960565b005b610162610a29565b60405161016f919061125e565b60405180910390f35b610180610ab7565b005b61019c600480360381019061019791906110b2565b610be9565b005b6101a6610ca9565b6040516101b391906111aa565b60405180910390f35b6101d660048036038101906101d19190611144565b610ccd565b005b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166324d7806c61021e610e25565b6040518263ffffffff1660e01b815260040161023a9190611332565b60206040518083038186803b15801561025257600080fd5b505afa158015610266573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061028a9190611385565b61029357600080fd5b600073c2132d05d31c914a87c6611c10748aeb04b58e8f9050600084905060008173ffffffffffffffffffffffffffffffffffffffff1663903e38b8866040518263ffffffff1660e01b81526004016102ec91906113c1565b60206040518083038186803b15801561030457600080fd5b505afa158015610318573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061033c91906113f1565b9050600083905060008289610351919061144d565b9050888473ffffffffffffffffffffffffffffffffffffffff1662fdd58e8673ffffffffffffffffffffffffffffffffffffffff16638da5cb5b6040518163ffffffff1660e01b815260040160206040518083038186803b1580156103b557600080fd5b505afa1580156103c9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103ed91906114bc565b8a6040518363ffffffff1660e01b815260040161040b9291906114e9565b60206040518083038186803b15801561042357600080fd5b505afa158015610437573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061045b91906113f1565b101561049c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104939061155e565b60405180910390fd5b8173ffffffffffffffffffffffffffffffffffffffff166323b872dd876104c1610e25565b846040518463ffffffff1660e01b81526004016104e09392919061157e565b602060405180830381600087803b1580156104fa57600080fd5b505af115801561050e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105329190611385565b508373ffffffffffffffffffffffffffffffffffffffff1663f242432a610557610e25565b888a8d6040518563ffffffff1660e01b815260040161057994939291906115ec565b600060405180830381600087803b15801561059357600080fd5b505af11580156105a7573d6000803e3d6000fd5b505050507fd4688cea25be9cd3a9e902605b350c40e21317435ac4485eb358262a1f0eeced8888886040516105de93929190611644565b60405180910390a1505050505050505050565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166324d7806c610637610e25565b6040518263ffffffff1660e01b81526004016106539190611332565b60206040518083038186803b15801561066b57600080fd5b505afa15801561067f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106a39190611385565b6106ac57600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156106e657600080fd5b80600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c11b07a9306040518263ffffffff1660e01b81526004016107c39190611332565b600060405180830381600087803b1580156107dd57600080fd5b505af11580156107f1573d6000803e3d6000fd5b5050505050565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16610839610e25565b73ffffffffffffffffffffffffffffffffffffffff161461085957600080fd5b6006828260405160200161086e9291906116ba565b6040516020818303038152906040528051906020012090806001815401808255809150506001900390600052602060002001600090919091909150555050565b7f863e7d3c08cdc8995131a3bb3c18617d09823f8b2f43282bc8b701047af5bb5481565b600180546108df90611702565b80601f016020809104026020016040519081016040528092919081815260200182805461090b90611702565b80156109585780601f1061092d57610100808354040283529160200191610958565b820191906000526020600020905b81548152906001019060200180831161093b57829003601f168201915b505050505081565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166109a1610e25565b73ffffffffffffffffffffffffffffffffffffffff16146109c157600080fd5b60005b82829050811015610a245760068383838181106109e4576109e3611734565b5b9050602002013590806001815401808255809150506001900390600052602060002001600090919091909150558080610a1c90611763565b9150506109c4565b505050565b60008054610a3690611702565b80601f0160208091040260200160405190810160405280929190818152602001828054610a6290611702565b8015610aaf5780601f10610a8457610100808354040283529160200191610aaf565b820191906000526020600020905b815481529060010190602001808311610a9257829003601f168201915b505050505081565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16610af8610e25565b73ffffffffffffffffffffffffffffffffffffffff1614610b1857600080fd5b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c11b07a9306040518263ffffffff1660e01b8152600401610b739190611332565b600060405180830381600087803b158015610b8d57600080fd5b505af1158015610ba1573d6000803e3d6000fd5b505050506000600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166324d7806c336040518263ffffffff1660e01b8152600401610c449190611332565b60206040518083038186803b158015610c5c57600080fd5b505afa158015610c70573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c949190611385565b610c9d57600080fd5b610ca681610ef8565b50565b7fdb6d55a48c634fdfe68da24c01559762c293198f8322e1fed7ca8976fc4ed26081565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16610d0e610e25565b73ffffffffffffffffffffffffffffffffffffffff1614610d2e57600080fd5b60005b600680549050811015610e1f578282604051602001610d519291906116ba565b6040516020818303038152906040528051906020012060068281548110610d7b57610d7a611734565b5b90600052602060002001541415610e0c5760066001600680549050610da091906117ac565b81548110610db157610db0611734565b5b906000526020600020015460068281548110610dd057610dcf611734565b5b90600052602060002001819055506006805480610df057610def6117e0565b5b6001900381819060005260206000200160009055905550610e21565b8080610e1790611763565b915050610d31565b505b5050565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610ef157600080368080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509050600080369050905073ffffffffffffffffffffffffffffffffffffffff818301511692505050610ef5565b3390505b90565b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508073ffffffffffffffffffffffffffffffffffffffff1663fc83158160006001306040518463ffffffff1660e01b8152600401610f78939291906118a4565b600060405180830381600087803b158015610f9257600080fd5b505af1158015610fa6573d6000803e3d6000fd5b5050505050565b600080fd5b600080fd5b6000819050919050565b610fca81610fb7565b8114610fd557600080fd5b50565b600081359050610fe781610fc1565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061101882610fed565b9050919050565b6110288161100d565b811461103357600080fd5b50565b6000813590506110458161101f565b92915050565b6000806000806080858703121561106557611064610fad565b5b600061107387828801610fd8565b945050602061108487828801611036565b935050604061109587828801610fd8565b92505060606110a687828801611036565b91505092959194509250565b6000602082840312156110c8576110c7610fad565b5b60006110d684828501611036565b91505092915050565b600080fd5b600080fd5b600080fd5b60008083601f840112611104576111036110df565b5b8235905067ffffffffffffffff811115611121576111206110e4565b5b60208301915083600182028301111561113d5761113c6110e9565b5b9250929050565b6000806020838503121561115b5761115a610fad565b5b600083013567ffffffffffffffff81111561117957611178610fb2565b5b611185858286016110ee565b92509250509250929050565b6000819050919050565b6111a481611191565b82525050565b60006020820190506111bf600083018461119b565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b838110156111ff5780820151818401526020810190506111e4565b8381111561120e576000848401525b50505050565b6000601f19601f8301169050919050565b6000611230826111c5565b61123a81856111d0565b935061124a8185602086016111e1565b61125381611214565b840191505092915050565b600060208201905081810360008301526112788184611225565b905092915050565b60008083601f840112611296576112956110df565b5b8235905067ffffffffffffffff8111156112b3576112b26110e4565b5b6020830191508360208202830111156112cf576112ce6110e9565b5b9250929050565b600080602083850312156112ed576112ec610fad565b5b600083013567ffffffffffffffff81111561130b5761130a610fb2565b5b61131785828601611280565b92509250509250929050565b61132c8161100d565b82525050565b60006020820190506113476000830184611323565b92915050565b60008115159050919050565b6113628161134d565b811461136d57600080fd5b50565b60008151905061137f81611359565b92915050565b60006020828403121561139b5761139a610fad565b5b60006113a984828501611370565b91505092915050565b6113bb81610fb7565b82525050565b60006020820190506113d660008301846113b2565b92915050565b6000815190506113eb81610fc1565b92915050565b60006020828403121561140757611406610fad565b5b6000611415848285016113dc565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061145882610fb7565b915061146383610fb7565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161561149c5761149b61141e565b5b828202905092915050565b6000815190506114b68161101f565b92915050565b6000602082840312156114d2576114d1610fad565b5b60006114e0848285016114a7565b91505092915050565b60006040820190506114fe6000830185611323565b61150b60208301846113b2565b9392505050565b7f746f6b656e20616d6f756e74206e6f7420617661696c61626c65000000000000600082015250565b6000611548601a836111d0565b915061155382611512565b602082019050919050565b600060208201905081810360008301526115778161153b565b9050919050565b60006060820190506115936000830186611323565b6115a06020830185611323565b6115ad60408301846113b2565b949350505050565b600082825260208201905092915050565b50565b60006115d66000836115b5565b91506115e1826115c6565b600082019050919050565b600060a0820190506116016000830187611323565b61160e6020830186611323565b61161b60408301856113b2565b61162860608301846113b2565b8181036080830152611639816115c9565b905095945050505050565b60006060820190506116596000830186611323565b61166660208301856113b2565b6116736040830184611323565b949350505050565b600081905092915050565b82818337600083830152505050565b60006116a1838561167b565b93506116ae838584611686565b82840190509392505050565b60006116c7828486611695565b91508190509392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061171a57607f821691505b6020821081141561172e5761172d6116d3565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600061176e82610fb7565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8214156117a1576117a061141e565b5b600182019050919050565b60006117b782610fb7565b91506117c283610fb7565b9250828210156117d5576117d461141e565b5b828203905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fd5b60008190508160005260206000209050919050565b6000815461183181611702565b61183b81866111d0565b9450600182166000811461185657600181146118685761189b565b60ff198316865260208601935061189b565b6118718561180f565b60005b8381101561189357815481890152600182019150602081019050611874565b808801955050505b50505092915050565b600060608201905081810360008301526118be8186611824565b905081810360208301526118d28185611824565b90506118e16040830184611323565b94935050505056fea2646970667358221220d27ce6a46b9cb983d4c7fd0f53ba704ad0e18e047ea0e920360dac268402b8ac64736f6c63430008090033";

type TokenShopConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TokenShopConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TokenShop__factory extends ContractFactory {
  constructor(...args: TokenShopConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    initialRoleManagerAddress: PromiseOrValue<string>,
    metaTxAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<TokenShop> {
    return super.deploy(
      initialRoleManagerAddress,
      metaTxAddress,
      overrides || {}
    ) as Promise<TokenShop>;
  }
  override getDeployTransaction(
    initialRoleManagerAddress: PromiseOrValue<string>,
    metaTxAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      initialRoleManagerAddress,
      metaTxAddress,
      overrides || {}
    );
  }
  override attach(address: string): TokenShop {
    return super.attach(address) as TokenShop;
  }
  override connect(signer: Signer): TokenShop__factory {
    return super.connect(signer) as TokenShop__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TokenShopInterface {
    return new utils.Interface(_abi) as TokenShopInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TokenShop {
    return new Contract(address, _abi, signerOrProvider) as TokenShop;
  }
}
