const Moralis = require('moralis').default
const { EvmChain } = require('@moralisweb3/common-evm-utils')
require('dotenv').config()

const MORALIS_API_KEY = process.env.MORALIS_API_KEY

const getAllNfts = async (address) => {
    await Moralis.start({
        apiKey: MORALIS_API_KEY,
    })

    const chain = EvmChain.GOERLI

    const response = await Moralis.EvmApi.nft.getWalletNFTs({
        address,
        chain,
    })

    console.log(response.toJSON())
}

getAllNfts('0x93FD393C1F9d1124f294403af06eD96443C48966')
