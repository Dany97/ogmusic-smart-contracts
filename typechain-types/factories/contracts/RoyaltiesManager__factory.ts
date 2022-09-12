/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  RoyaltiesManager,
  RoyaltiesManagerInterface,
} from "../../contracts/RoyaltiesManager";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "initialRoleManagerAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
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
    inputs: [
      {
        internalType: "address",
        name: "sharesContractAddress",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "owners",
        type: "address[]",
      },
    ],
    name: "distributeRoyalties",
    outputs: [],
    stateMutability: "payable",
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
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001858380380620018588339818101604052810190620000379190620001a5565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156200007257600080fd5b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050620001d7565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006200016d8262000140565b9050919050565b6200017f8162000160565b81146200018b57600080fd5b50565b6000815190506200019f8162000174565b92915050565b600060208284031215620001be57620001bd6200013b565b5b6000620001ce848285016200018e565b91505092915050565b61167180620001e76000396000f3fe60806040526004361061007b5760003560e01c8063691a91c21161004e578063691a91c2146101195780638129fc1c14610142578063c90bd04714610159578063f29f968d146101845761007b565b806338d11041146100805780633e96e868146100a95780635204ef80146100d257806355d81869146100fd575b600080fd5b34801561008c57600080fd5b506100a760048036038101906100a29190610d89565b6101ad565b005b3480156100b557600080fd5b506100d060048036038101906100cb9190610e1b565b6103ad565b005b3480156100de57600080fd5b506100e761045c565b6040516100f49190610e81565b60405180910390f35b61011760048036038101906101129190610feb565b610480565b005b34801561012557600080fd5b50610140600480360381019061013b919061109d565b61095a565b005b34801561014e57600080fd5b50610157610a1c565b005b34801561016557600080fd5b5061016e610ba2565b60405161017b9190610e81565b60405180910390f35b34801561019057600080fd5b506101ab60048036038101906101a69190610e1b565b610bc6565b005b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166324d7806c336040518263ffffffff1660e01b815260040161020891906110f9565b60206040518083038186803b15801561022057600080fd5b505afa158015610234573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610258919061114c565b61026157600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141561029b57600080fd5b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c11b07a9306040518263ffffffff1660e01b815260040161037891906110f9565b600060405180830381600087803b15801561039257600080fd5b505af11580156103a6573d6000803e3d6000fd5b5050505050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461040757600080fd5b6003828260405160200161041c9291906111b8565b6040516020818303038152906040528051906020012090806001815401808255809150506001900390600052602060002001600090919091909150555050565b7f863e7d3c08cdc8995131a3bb3c18617d09823f8b2f43282bc8b701047af5bb5481565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166324d7806c336040518263ffffffff1660e01b81526004016104db91906110f9565b60206040518083038186803b1580156104f357600080fd5b505afa158015610507573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061052b919061114c565b61053457600080fd5b600082905060008173ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff1660e01b815260040160206040518083038186803b15801561058157600080fd5b505afa158015610595573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105b99190611207565b90506000343373ffffffffffffffffffffffffffffffffffffffff16311015610617576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161060e90611291565b60405180910390fd5b60005b84518110156107cb5760008473ffffffffffffffffffffffffffffffffffffffff166370a08231878481518110610654576106536112b1565b5b60200260200101516040518263ffffffff1660e01b815260040161067891906110f9565b60206040518083038186803b15801561069057600080fd5b505afa1580156106a4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106c89190611207565b11610708576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106ff90611378565b60405180910390fd5b8373ffffffffffffffffffffffffffffffffffffffff166370a08231868381518110610737576107366112b1565b5b60200260200101516040518263ffffffff1660e01b815260040161075b91906110f9565b60206040518083038186803b15801561077357600080fd5b505afa158015610787573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107ab9190611207565b826107b691906113c7565b915080806107c39061141d565b91505061061a565b5081811461080e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610805906114fe565b60405180910390fd5b60005b8451811015610952576000348573ffffffffffffffffffffffffffffffffffffffff166370a0823188858151811061084c5761084b6112b1565b5b60200260200101516040518263ffffffff1660e01b815260040161087091906110f9565b60206040518083038186803b15801561088857600080fd5b505afa15801561089c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108c09190611207565b6108ca919061151e565b9050600084826108da91906115a7565b90508683815181106108ef576108ee6112b1565b5b602002602001015173ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f1935050505015801561093c573d6000803e3d6000fd5b505050808061094a9061141d565b915050610811565b505050505050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146109b457600080fd5b60005b82829050811015610a175760038383838181106109d7576109d66112b1565b5b9050602002013590806001815401808255809150506001900390600052602060002001600090919091909150558080610a0f9061141d565b9150506109b7565b505050565b600073ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610acd5760008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610ac857600080fd5b610ad2565b600080fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c11b07a9306040518263ffffffff1660e01b8152600401610b2d91906110f9565b600060405180830381600087803b158015610b4757600080fd5b505af1158015610b5b573d6000803e3d6000fd5b5050505060008060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b7fdb6d55a48c634fdfe68da24c01559762c293198f8322e1fed7ca8976fc4ed26081565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610c2057600080fd5b60005b600380549050811015610d11578282604051602001610c439291906111b8565b6040516020818303038152906040528051906020012060038281548110610c6d57610c6c6112b1565b5b90600052602060002001541415610cfe5760036001600380549050610c9291906115d8565b81548110610ca357610ca26112b1565b5b906000526020600020015460038281548110610cc257610cc16112b1565b5b90600052602060002001819055506003805480610ce257610ce161160c565b5b6001900381819060005260206000200160009055905550610d13565b8080610d099061141d565b915050610c23565b505b5050565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610d5682610d2b565b9050919050565b610d6681610d4b565b8114610d7157600080fd5b50565b600081359050610d8381610d5d565b92915050565b600060208284031215610d9f57610d9e610d21565b5b6000610dad84828501610d74565b91505092915050565b600080fd5b600080fd5b600080fd5b60008083601f840112610ddb57610dda610db6565b5b8235905067ffffffffffffffff811115610df857610df7610dbb565b5b602083019150836001820283011115610e1457610e13610dc0565b5b9250929050565b60008060208385031215610e3257610e31610d21565b5b600083013567ffffffffffffffff811115610e5057610e4f610d26565b5b610e5c85828601610dc5565b92509250509250929050565b6000819050919050565b610e7b81610e68565b82525050565b6000602082019050610e966000830184610e72565b92915050565b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610ee582610e9c565b810181811067ffffffffffffffff82111715610f0457610f03610ead565b5b80604052505050565b6000610f17610d17565b9050610f238282610edc565b919050565b600067ffffffffffffffff821115610f4357610f42610ead565b5b602082029050602081019050919050565b6000610f67610f6284610f28565b610f0d565b90508083825260208201905060208402830185811115610f8a57610f89610dc0565b5b835b81811015610fb35780610f9f8882610d74565b845260208401935050602081019050610f8c565b5050509392505050565b600082601f830112610fd257610fd1610db6565b5b8135610fe2848260208601610f54565b91505092915050565b6000806040838503121561100257611001610d21565b5b600061101085828601610d74565b925050602083013567ffffffffffffffff81111561103157611030610d26565b5b61103d85828601610fbd565b9150509250929050565b60008083601f84011261105d5761105c610db6565b5b8235905067ffffffffffffffff81111561107a57611079610dbb565b5b60208301915083602082028301111561109657611095610dc0565b5b9250929050565b600080602083850312156110b4576110b3610d21565b5b600083013567ffffffffffffffff8111156110d2576110d1610d26565b5b6110de85828601611047565b92509250509250929050565b6110f381610d4b565b82525050565b600060208201905061110e60008301846110ea565b92915050565b60008115159050919050565b61112981611114565b811461113457600080fd5b50565b60008151905061114681611120565b92915050565b60006020828403121561116257611161610d21565b5b600061117084828501611137565b91505092915050565b600081905092915050565b82818337600083830152505050565b600061119f8385611179565b93506111ac838584611184565b82840190509392505050565b60006111c5828486611193565b91508190509392505050565b6000819050919050565b6111e4816111d1565b81146111ef57600080fd5b50565b600081519050611201816111db565b92915050565b60006020828403121561121d5761121c610d21565b5b600061122b848285016111f2565b91505092915050565b600082825260208201905092915050565b7f596f7520646f6e2774206861766520656e6f7567682062616c616e6365000000600082015250565b600061127b601d83611234565b915061128682611245565b602082019050919050565b600060208201905081810360008301526112aa8161126e565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f526f79616c746965734d616e616765723a20796f7520706173736564206f6e6560008201527f206f72206d6f72652061646472657373657320776974686f75742062616c616e60208201527f6365000000000000000000000000000000000000000000000000000000000000604082015250565b6000611362604283611234565b915061136d826112e0565b606082019050919050565b6000602082019050818103600083015261139181611355565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006113d2826111d1565b91506113dd836111d1565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561141257611411611398565b5b828201905092915050565b6000611428826111d1565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82141561145b5761145a611398565b5b600182019050919050565b7f526f79616c746965734d616e616765723a20746865206172726179206f66206160008201527f646472657373657320796f7520706173736564206973206e6f7420746865206560208201527f78616374206172726179206f66206f776e657273000000000000000000000000604082015250565b60006114e8605483611234565b91506114f382611466565b606082019050919050565b60006020820190508181036000830152611517816114db565b9050919050565b6000611529826111d1565b9150611534836111d1565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161561156d5761156c611398565b5b828202905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b60006115b2826111d1565b91506115bd836111d1565b9250826115cd576115cc611578565b5b828204905092915050565b60006115e3826111d1565b91506115ee836111d1565b92508282101561160157611600611398565b5b828203905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fdfea2646970667358221220669a667e8645decca691df89e1194ef4d6c0928bd8d23a2232655a9f0bffde2064736f6c63430008090033";

type RoyaltiesManagerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: RoyaltiesManagerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class RoyaltiesManager__factory extends ContractFactory {
  constructor(...args: RoyaltiesManagerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    initialRoleManagerAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<RoyaltiesManager> {
    return super.deploy(
      initialRoleManagerAddress,
      overrides || {}
    ) as Promise<RoyaltiesManager>;
  }
  override getDeployTransaction(
    initialRoleManagerAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      initialRoleManagerAddress,
      overrides || {}
    );
  }
  override attach(address: string): RoyaltiesManager {
    return super.attach(address) as RoyaltiesManager;
  }
  override connect(signer: Signer): RoyaltiesManager__factory {
    return super.connect(signer) as RoyaltiesManager__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RoyaltiesManagerInterface {
    return new utils.Interface(_abi) as RoyaltiesManagerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): RoyaltiesManager {
    return new Contract(address, _abi, signerOrProvider) as RoyaltiesManager;
  }
}
