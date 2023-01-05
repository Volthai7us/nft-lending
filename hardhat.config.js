require('@nomicfoundation/hardhat-toolbox')
require('dotenv').config()
require('hardhat-gas-reporter')
require('@nomiclabs/hardhat-etherscan')
require('dotenv').config()
require('solidity-coverage')
require('hardhat-deploy')

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const GANACHE_PRIVATE_KEY = process.env.GANACHE_PRIVATE_KEY
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const MUMBAI_RPC_URL = process.env.MUMBAI_RPC_URL

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: {
        compilers: [
            {
                version: '0.7.5',
            },
            {
                version: '0.8.7',
            },
        ],
    },

    defaultNetwork: 'hardhat',
    networks: {
        goerli: {
            chainId: 5,
            blockConfirmations: 3,
            url: GOERLI_RPC_URL,
            accounts: [PRIVATE_KEY],
        },
        ganache: {
            chainId: 1337,
            blockConfirmations: 3,
            url: 'http://172.24.176.1:3434',
            accounts: [GANACHE_PRIVATE_KEY],
        },
        mumbai: {
            chainId: 80001,
            blockConfirmations: 3,
            url: MUMBAI_RPC_URL,
            accounts: [PRIVATE_KEY],
        },
    },
    namedAccounts: {
        deployer: {
            default: 0,
            1: 0,
        },
    },
}
