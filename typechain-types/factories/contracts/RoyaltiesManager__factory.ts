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
    ],
    name: "royaltiesDistributed",
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
        internalType: "uint256",
        name: "valueInUSDT",
        type: "uint256",
      },
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
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "distributeRoyalties",
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
  "0x60806040523480156200001157600080fd5b50604051620021e6380380620021e68339818101604052810190620000379190620003c1565b6040518060400160405280601081526020017f526f79616c746965734d616e61676572000000000000000000000000000000008152506040518060400160405280600581526020017f302e312e310000000000000000000000000000000000000000000000000000008152508160009080519060200190620000bb929190620002a7565b508060019080519060200190620000d4929190620002a7565b505050600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156200011257600080fd5b6200012381620001ee60201b60201c565b81600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555033600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050506200057b565b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508073ffffffffffffffffffffffffffffffffffffffff1663fc83158160006001306040518463ffffffff1660e01b8152600401620002709392919062000530565b600060405180830381600087803b1580156200028b57600080fd5b505af1158015620002a0573d6000803e3d6000fd5b5050505050565b828054620002b59062000437565b90600052602060002090601f016020900481019282620002d9576000855562000325565b82601f10620002f457805160ff191683800117855562000325565b8280016001018555821562000325579182015b828111156200032457825182559160200191906001019062000307565b5b50905062000334919062000338565b5090565b5b808211156200035357600081600090555060010162000339565b5090565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600062000389826200035c565b9050919050565b6200039b816200037c565b8114620003a757600080fd5b50565b600081519050620003bb8162000390565b92915050565b60008060408385031215620003db57620003da62000357565b5b6000620003eb85828601620003aa565b9250506020620003fe85828601620003aa565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200045057607f821691505b6020821081141562000467576200046662000408565b5b50919050565b600082825260208201905092915050565b60008190508160005260206000209050919050565b60008154620004a28162000437565b620004ae81866200046d565b94506001821660008114620004cc5760018114620004df5762000516565b60ff198316865260208601935062000516565b620004ea856200047e565b60005b838110156200050e57815481890152600182019150602081019050620004ed565b808801955050505b50505092915050565b6200052a816200037c565b82525050565b600060608201905081810360008301526200054c818662000493565b9050818103602083015262000562818562000493565b90506200057360408301846200051f565b949350505050565b611c5b806200058b6000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c80636b9f4386116100715780636b9f43861461013e5780638129fc1c1461015c5780638b05c4c814610166578063b22d8bdc14610182578063c90bd0471461019e578063f29f968d146101bc576100a9565b806338d11041146100ae5780633e96e868146100ca5780635204ef80146100e657806354fd4d5014610104578063691a91c214610122575b600080fd5b6100c860048036038101906100c39190611145565b6101d8565b005b6100e460048036038101906100df91906111d7565b6103df565b005b6100ee610495565b6040516100fb919061123d565b60405180910390f35b61010c6104b9565b60405161011991906112f1565b60405180910390f35b61013c60048036038101906101379190611369565b610547565b005b610146610610565b60405161015391906112f1565b60405180910390f35b61016461069e565b005b610180600480360381019061017b919061152a565b6107d0565b005b61019c60048036038101906101979190611145565b610d0f565b005b6101a6610dcf565b6040516101b3919061123d565b60405180910390f35b6101d660048036038101906101d191906111d7565b610df3565b005b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166324d7806c61021e610f4b565b6040518263ffffffff1660e01b815260040161023a91906115bc565b60206040518083038186803b15801561025257600080fd5b505afa158015610266573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061028a919061160f565b61029357600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156102cd57600080fd5b80600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c11b07a9306040518263ffffffff1660e01b81526004016103aa91906115bc565b600060405180830381600087803b1580156103c457600080fd5b505af11580156103d8573d6000803e3d6000fd5b5050505050565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16610420610f4b565b73ffffffffffffffffffffffffffffffffffffffff161461044057600080fd5b6006828260405160200161045592919061167b565b6040516020818303038152906040528051906020012090806001815401808255809150506001900390600052602060002001600090919091909150555050565b7f863e7d3c08cdc8995131a3bb3c18617d09823f8b2f43282bc8b701047af5bb5481565b600180546104c6906116c3565b80601f01602080910402602001604051908101604052809291908181526020018280546104f2906116c3565b801561053f5780601f106105145761010080835404028352916020019161053f565b820191906000526020600020905b81548152906001019060200180831161052257829003601f168201915b505050505081565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16610588610f4b565b73ffffffffffffffffffffffffffffffffffffffff16146105a857600080fd5b60005b8282905081101561060b5760068383838181106105cb576105ca6116f5565b5b905060200201359080600181540180825580915050600190039060005260206000200160009091909190915055808061060390611753565b9150506105ab565b505050565b6000805461061d906116c3565b80601f0160208091040260200160405190810160405280929190818152602001828054610649906116c3565b80156106965780601f1061066b57610100808354040283529160200191610696565b820191906000526020600020905b81548152906001019060200180831161067957829003601f168201915b505050505081565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166106df610f4b565b73ffffffffffffffffffffffffffffffffffffffff16146106ff57600080fd5b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c11b07a9306040518263ffffffff1660e01b815260040161075a91906115bc565b600060405180830381600087803b15801561077457600080fd5b505af1158015610788573d6000803e3d6000fd5b505050506000600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166324d7806c610816610f4b565b6040518263ffffffff1660e01b815260040161083291906115bc565b60206040518083038186803b15801561084a57600080fd5b505afa15801561085e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610882919061160f565b61088b57600080fd5b6000839050600073c2132d05d31c914a87c6611c10748aeb04b58e8f9050600081905060008373ffffffffffffffffffffffffffffffffffffffff1663bd85b039866040518263ffffffff1660e01b81526004016108e991906117ab565b60206040518083038186803b15801561090157600080fd5b505afa158015610915573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061093991906117db565b90506000805b8751811015610af25760008673ffffffffffffffffffffffffffffffffffffffff1662fdd58e8a8481518110610978576109776116f5565b5b60200260200101518a6040518363ffffffff1660e01b815260040161099e929190611808565b60206040518083038186803b1580156109b657600080fd5b505afa1580156109ca573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109ee91906117db565b11610a2e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a25906118c9565b60405180910390fd5b8573ffffffffffffffffffffffffffffffffffffffff1662fdd58e898381518110610a5c57610a5b6116f5565b5b6020026020010151896040518363ffffffff1660e01b8152600401610a82929190611808565b60206040518083038186803b158015610a9a57600080fd5b505afa158015610aae573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ad291906117db565b82610add91906118e9565b91508080610aea90611753565b91505061093f565b50818114610b35576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b2c906119d7565b60405180910390fd5b60005b8751811015610cca5760008a8773ffffffffffffffffffffffffffffffffffffffff1662fdd58e8b8581518110610b7257610b716116f5565b5b60200260200101518b6040518363ffffffff1660e01b8152600401610b98929190611808565b60206040518083038186803b158015610bb057600080fd5b505afa158015610bc4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610be891906117db565b610bf291906119f7565b905060008482610c029190611a80565b90508573ffffffffffffffffffffffffffffffffffffffff166323b872dd610c28610f4b565b8c8681518110610c3b57610c3a6116f5565b5b6020026020010151846040518463ffffffff1660e01b8152600401610c6293929190611ab1565b602060405180830381600087803b158015610c7c57600080fd5b505af1158015610c90573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cb4919061160f565b5050508080610cc290611753565b915050610b38565b507f7d66218f98ce4b685a52dd0aa8eebf72c6fa3ab16ddf180b95423b1a49eee9ae8887604051610cfc929190611808565b60405180910390a1505050505050505050565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166324d7806c336040518263ffffffff1660e01b8152600401610d6a91906115bc565b60206040518083038186803b158015610d8257600080fd5b505afa158015610d96573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610dba919061160f565b610dc357600080fd5b610dcc8161101e565b50565b7fdb6d55a48c634fdfe68da24c01559762c293198f8322e1fed7ca8976fc4ed26081565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16610e34610f4b565b73ffffffffffffffffffffffffffffffffffffffff1614610e5457600080fd5b60005b600680549050811015610f45578282604051602001610e7792919061167b565b6040516020818303038152906040528051906020012060068281548110610ea157610ea06116f5565b5b90600052602060002001541415610f325760066001600680549050610ec69190611ae8565b81548110610ed757610ed66116f5565b5b906000526020600020015460068281548110610ef657610ef56116f5565b5b90600052602060002001819055506006805480610f1657610f15611b1c565b5b6001900381819060005260206000200160009055905550610f47565b8080610f3d90611753565b915050610e57565b505b5050565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561101757600080368080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509050600080369050905073ffffffffffffffffffffffffffffffffffffffff81830151169250505061101b565b3390505b90565b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508073ffffffffffffffffffffffffffffffffffffffff1663fc83158160006001306040518463ffffffff1660e01b815260040161109e93929190611be0565b600060405180830381600087803b1580156110b857600080fd5b505af11580156110cc573d6000803e3d6000fd5b5050505050565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611112826110e7565b9050919050565b61112281611107565b811461112d57600080fd5b50565b60008135905061113f81611119565b92915050565b60006020828403121561115b5761115a6110dd565b5b600061116984828501611130565b91505092915050565b600080fd5b600080fd5b600080fd5b60008083601f84011261119757611196611172565b5b8235905067ffffffffffffffff8111156111b4576111b3611177565b5b6020830191508360018202830111156111d0576111cf61117c565b5b9250929050565b600080602083850312156111ee576111ed6110dd565b5b600083013567ffffffffffffffff81111561120c5761120b6110e2565b5b61121885828601611181565b92509250509250929050565b6000819050919050565b61123781611224565b82525050565b6000602082019050611252600083018461122e565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015611292578082015181840152602081019050611277565b838111156112a1576000848401525b50505050565b6000601f19601f8301169050919050565b60006112c382611258565b6112cd8185611263565b93506112dd818560208601611274565b6112e6816112a7565b840191505092915050565b6000602082019050818103600083015261130b81846112b8565b905092915050565b60008083601f84011261132957611328611172565b5b8235905067ffffffffffffffff81111561134657611345611177565b5b6020830191508360208202830111156113625761136161117c565b5b9250929050565b600080602083850312156113805761137f6110dd565b5b600083013567ffffffffffffffff81111561139e5761139d6110e2565b5b6113aa85828601611313565b92509250509250929050565b6000819050919050565b6113c9816113b6565b81146113d457600080fd5b50565b6000813590506113e6816113c0565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b611424826112a7565b810181811067ffffffffffffffff82111715611443576114426113ec565b5b80604052505050565b60006114566110d3565b9050611462828261141b565b919050565b600067ffffffffffffffff821115611482576114816113ec565b5b602082029050602081019050919050565b60006114a66114a184611467565b61144c565b905080838252602082019050602084028301858111156114c9576114c861117c565b5b835b818110156114f257806114de8882611130565b8452602084019350506020810190506114cb565b5050509392505050565b600082601f83011261151157611510611172565b5b8135611521848260208601611493565b91505092915050565b60008060008060808587031215611544576115436110dd565b5b6000611552878288016113d7565b945050602061156387828801611130565b935050604085013567ffffffffffffffff811115611584576115836110e2565b5b611590878288016114fc565b92505060606115a1878288016113d7565b91505092959194509250565b6115b681611107565b82525050565b60006020820190506115d160008301846115ad565b92915050565b60008115159050919050565b6115ec816115d7565b81146115f757600080fd5b50565b600081519050611609816115e3565b92915050565b600060208284031215611625576116246110dd565b5b6000611633848285016115fa565b91505092915050565b600081905092915050565b82818337600083830152505050565b6000611662838561163c565b935061166f838584611647565b82840190509392505050565b6000611688828486611656565b91508190509392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806116db57607f821691505b602082108114156116ef576116ee611694565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061175e826113b6565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82141561179157611790611724565b5b600182019050919050565b6117a5816113b6565b82525050565b60006020820190506117c0600083018461179c565b92915050565b6000815190506117d5816113c0565b92915050565b6000602082840312156117f1576117f06110dd565b5b60006117ff848285016117c6565b91505092915050565b600060408201905061181d60008301856115ad565b61182a602083018461179c565b9392505050565b7f526f79616c746965734d616e616765723a20796f7520706173736564206f6e6560008201527f206f72206d6f72652061646472657373657320776974686f75742062616c616e60208201527f6365000000000000000000000000000000000000000000000000000000000000604082015250565b60006118b3604283611263565b91506118be82611831565b606082019050919050565b600060208201905081810360008301526118e2816118a6565b9050919050565b60006118f4826113b6565b91506118ff836113b6565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561193457611933611724565b5b828201905092915050565b7f526f79616c746965734d616e616765723a20746865206172726179206f66206160008201527f646472657373657320796f7520706173736564206973206e6f7420746865206560208201527f78616374206172726179206f66206f776e657273000000000000000000000000604082015250565b60006119c1605483611263565b91506119cc8261193f565b606082019050919050565b600060208201905081810360008301526119f0816119b4565b9050919050565b6000611a02826113b6565b9150611a0d836113b6565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615611a4657611a45611724565b5b828202905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000611a8b826113b6565b9150611a96836113b6565b925082611aa657611aa5611a51565b5b828204905092915050565b6000606082019050611ac660008301866115ad565b611ad360208301856115ad565b611ae0604083018461179c565b949350505050565b6000611af3826113b6565b9150611afe836113b6565b925082821015611b1157611b10611724565b5b828203905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fd5b60008190508160005260206000209050919050565b60008154611b6d816116c3565b611b778186611263565b94506001821660008114611b925760018114611ba457611bd7565b60ff1983168652602086019350611bd7565b611bad85611b4b565b60005b83811015611bcf57815481890152600182019150602081019050611bb0565b808801955050505b50505092915050565b60006060820190508181036000830152611bfa8186611b60565b90508181036020830152611c0e8185611b60565b9050611c1d60408301846115ad565b94935050505056fea2646970667358221220ac2ea6796115c04d350af27a342a6ae47cd589f2c31b20f11e4c3ce60bfafbf964736f6c63430008090033";

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
    metaTxAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<RoyaltiesManager> {
    return super.deploy(
      initialRoleManagerAddress,
      metaTxAddress,
      overrides || {}
    ) as Promise<RoyaltiesManager>;
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
