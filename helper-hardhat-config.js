const { ethers } = require("hardhat");

const networkConfig = {
  5: {
    name: "goerli",
    callBackGasLimit: "500000",
    interval: "30",
  },
  31337: {
    name: "hardhat",
    callBackGasLimit: "500000",
    interval: "30",
  },
  1337: {
    name: "ganache",
    callBackGasLimit: "500000",
    interval: "30",
  },
};

const developmentChains = ["hardhat", "localhost", "ganache"];

module.exports = { networkConfig, developmentChains };
