import "@nomiclabs/hardhat-ethers";

require("@nomicfoundation/hardhat-toolbox");
import "@nomicfoundation/hardhat-chai-matchers";




 
// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
require("./tasks/faucet");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
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
      chainId: 13881,
      accounts: [process.env.PRIVATE_KEY],
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
    }
    
  }
};
