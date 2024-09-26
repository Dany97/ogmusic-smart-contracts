import "@nomiclabs/hardhat-ethers";

require("@nomicfoundation/hardhat-toolbox");
import "@nomicfoundation/hardhat-chai-matchers";
import "hardhat-contract-sizer";

import * as dotenv from 'dotenv';




dotenv.config();
 
// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
require("./tasks/faucet");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.4.17",
      },
      {
        version: "0.8.9",
        settings: {},
      },
    ],
  },
  optimizer: {
    enabled: true,
    runs: 200
  },
  networks: {
    hardhat: {
      chainId: 1337, // We set 1337 to make interacting with MetaMask simpler
      allowUnlimitedContractSize: true
      
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      chainId: 80001,
      accounts: [process.env.OG_PRIVATE_KEY],
      timeout: 60000,
      gas: 2100000,
      gasPrice: 8000000000,
      allowUnlimitedContractSize: true
    },

    rinkeby: {
      url: "https://rinkeby.infura.io/v3/387c4f9146f74886a4079f690fc13898",
      chainId: 4,
      accounts: [process.env.PRIVATE_KEY],
      timeout: 60000,
      gas: 2100000,
      gasPrice: 8000000000,
      allowUnlimitedContractSize: true
    },

    polygon: {
      url: "https://polygon-mainnet.g.alchemy.com/v2/bGl9RcQMz08-oXKzlBCxyFwlrgidtKdE",
      chainId: 137,
      accounts: [process.env.OG_PRIVATE_KEY],
      timeout: 60000
    }
    
  }

  
};
