/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export interface RoyaltiesManagerInterface extends utils.Interface {
  functions: {
    "ACTIVE()": FunctionFragment;
    "SUSPENDED()": FunctionFragment;
    "addNewRoleManager(address)": FunctionFragment;
    "addRole(string)": FunctionFragment;
    "deleteRole(string)": FunctionFragment;
    "distributeRoyalties(uint256,address,address[],uint256)": FunctionFragment;
    "initialize()": FunctionFragment;
    "metaTxName()": FunctionFragment;
    "setRoles(bytes32[])": FunctionFragment;
    "set_MetaTransaction(address)": FunctionFragment;
    "version()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "ACTIVE"
      | "SUSPENDED"
      | "addNewRoleManager"
      | "addRole"
      | "deleteRole"
      | "distributeRoyalties"
      | "initialize"
      | "metaTxName"
      | "setRoles"
      | "set_MetaTransaction"
      | "version"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "ACTIVE", values?: undefined): string;
  encodeFunctionData(functionFragment: "SUSPENDED", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "addNewRoleManager",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "addRole",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "deleteRole",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "distributeRoyalties",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>[],
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "metaTxName",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setRoles",
    values: [PromiseOrValue<BytesLike>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "set_MetaTransaction",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "version", values?: undefined): string;

  decodeFunctionResult(functionFragment: "ACTIVE", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "SUSPENDED", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "addNewRoleManager",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "addRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deleteRole", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "distributeRoyalties",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "metaTxName", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setRoles", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "set_MetaTransaction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "version", data: BytesLike): Result;

  events: {
    "royaltiesDistributed(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "royaltiesDistributed"): EventFragment;
}

export interface royaltiesDistributedEventObject {
  tokenAddress: string;
  tokenId: BigNumber;
}
export type royaltiesDistributedEvent = TypedEvent<
  [string, BigNumber],
  royaltiesDistributedEventObject
>;

export type royaltiesDistributedEventFilter =
  TypedEventFilter<royaltiesDistributedEvent>;

export interface RoyaltiesManager extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: RoyaltiesManagerInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    ACTIVE(overrides?: CallOverrides): Promise<[string]>;

    SUSPENDED(overrides?: CallOverrides): Promise<[string]>;

    addNewRoleManager(
      newRoleManagerAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    addRole(
      roleName: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    deleteRole(
      roleName: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    distributeRoyalties(
      valueInUSDT: PromiseOrValue<BigNumberish>,
      sharesContractAddress: PromiseOrValue<string>,
      owners: PromiseOrValue<string>[],
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    initialize(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    metaTxName(overrides?: CallOverrides): Promise<[string]>;

    setRoles(
      allAccountRoles: PromiseOrValue<BytesLike>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    set_MetaTransaction(
      metaTxAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    version(overrides?: CallOverrides): Promise<[string]>;
  };

  ACTIVE(overrides?: CallOverrides): Promise<string>;

  SUSPENDED(overrides?: CallOverrides): Promise<string>;

  addNewRoleManager(
    newRoleManagerAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  addRole(
    roleName: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  deleteRole(
    roleName: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  distributeRoyalties(
    valueInUSDT: PromiseOrValue<BigNumberish>,
    sharesContractAddress: PromiseOrValue<string>,
    owners: PromiseOrValue<string>[],
    tokenId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  initialize(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  metaTxName(overrides?: CallOverrides): Promise<string>;

  setRoles(
    allAccountRoles: PromiseOrValue<BytesLike>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  set_MetaTransaction(
    metaTxAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  version(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    ACTIVE(overrides?: CallOverrides): Promise<string>;

    SUSPENDED(overrides?: CallOverrides): Promise<string>;

    addNewRoleManager(
      newRoleManagerAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    addRole(
      roleName: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    deleteRole(
      roleName: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    distributeRoyalties(
      valueInUSDT: PromiseOrValue<BigNumberish>,
      sharesContractAddress: PromiseOrValue<string>,
      owners: PromiseOrValue<string>[],
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    initialize(overrides?: CallOverrides): Promise<void>;

    metaTxName(overrides?: CallOverrides): Promise<string>;

    setRoles(
      allAccountRoles: PromiseOrValue<BytesLike>[],
      overrides?: CallOverrides
    ): Promise<void>;

    set_MetaTransaction(
      metaTxAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    version(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "royaltiesDistributed(address,uint256)"(
      tokenAddress?: null,
      tokenId?: null
    ): royaltiesDistributedEventFilter;
    royaltiesDistributed(
      tokenAddress?: null,
      tokenId?: null
    ): royaltiesDistributedEventFilter;
  };

  estimateGas: {
    ACTIVE(overrides?: CallOverrides): Promise<BigNumber>;

    SUSPENDED(overrides?: CallOverrides): Promise<BigNumber>;

    addNewRoleManager(
      newRoleManagerAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    addRole(
      roleName: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    deleteRole(
      roleName: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    distributeRoyalties(
      valueInUSDT: PromiseOrValue<BigNumberish>,
      sharesContractAddress: PromiseOrValue<string>,
      owners: PromiseOrValue<string>[],
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    initialize(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    metaTxName(overrides?: CallOverrides): Promise<BigNumber>;

    setRoles(
      allAccountRoles: PromiseOrValue<BytesLike>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    set_MetaTransaction(
      metaTxAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    version(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    ACTIVE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    SUSPENDED(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    addNewRoleManager(
      newRoleManagerAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    addRole(
      roleName: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    deleteRole(
      roleName: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    distributeRoyalties(
      valueInUSDT: PromiseOrValue<BigNumberish>,
      sharesContractAddress: PromiseOrValue<string>,
      owners: PromiseOrValue<string>[],
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    initialize(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    metaTxName(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setRoles(
      allAccountRoles: PromiseOrValue<BytesLike>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    set_MetaTransaction(
      metaTxAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    version(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
