const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const Moralis = require('moralis').default
const { EvmChain } = require('@moralisweb3/common-evm-utils')
require('dotenv').config()

const getAllNfts = async (address) => {
    const chain = EvmChain.MUMBAI

    const response = await Moralis.EvmApi.nft.getWalletNFTs({
        address,
        chain,
    })

    return response.toJSON()
}

app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, async () => {
    console.log(`Example app listening at http://localhost:${port}`)
    await Moralis.start({
        apiKey: process.env.MORALIS_API_KEY,
    })
})

app.get('/nfts', async (req, res) => {
    res.json(await getAllNfts(req.query.id))
})
