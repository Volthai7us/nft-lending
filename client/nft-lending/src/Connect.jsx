import { useState } from 'react'
import './App.css'
import axios, { Axios } from 'axios'
import { ethers } from 'ethers';
import abi from './abi/erc721'

function App() {
  const [connectButton, setConnectButton] = useState("Connect")
  const [nftList, setNftList] = useState([])
  const [account, setAccount] = useState([])

  const handleConnect = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" })
      }
      catch (error) {
        console.log(error)
      }
      setConnectButton("Connected")
      const accounts = await window.ethereum.request({ method: "eth_accounts" })
      getAllNfts(accounts[0])
      setAccount(accounts[0])
      console.log('Account: ', account)
    }
    else {
      setConnectButton("Install Metamask")
    }
  }

  const signContract = async (address, abi) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signed = new ethers.Contract(
      address,
      abi,
      provider.getSigner(0)
    );
    const tx = await signed["safeTransferFrom(address,address,uint256)"](account, '0x5DB9E05E07F5b5c2f65e98A30426F7F1A6D9680F', 245)
  }

  const getAllNfts = async (address) => {
    await axios.get(`http://localhost:3000/nfts?id=${address}`)
      .then((response) => {
        setNftList(response.data.result)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div>
      <button onClick={handleConnect}>{connectButton}</button>

      <button onClick={e => signContract("0x708c48aaa4ea8b9e46bd8deb6470986842b9a16d", abi)}> Sign Contract </button>
      {console.log(nftList[0])}
      {
        nftList.map((nft, i) => {
          return (
            <div key={i}>
              <img src={nft.image} />
              <p>{nft.name}</p>
              <p>{nft.description}</p>
            </div>
          )
        })
      }
    </div>
  )
}

export default App
