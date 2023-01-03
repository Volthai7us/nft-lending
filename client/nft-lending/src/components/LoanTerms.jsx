import '../tail.css'
import axios from 'axios'
import { useState, useEffect } from 'react'

const LoanTerms = ({ step, setStep, setNftList, account, setImages }) => {
    const getAllNfts = async (address) => {
        await axios
            .get(`http://localhost:3000/nfts?id=${address}`)
            .then(async (response) => {
                await setNftList(response.data.result)
                const images = []

                console.log('NFT List: ', response.data.result.length)

                for (let i = 0; i < response.data.result.length; i++) {
                    console.log('Token URI: ', response.data.result[i].token_uri)
                    const uri = response.data.result[i].token_uri
                    getJSON(uri).then((data) => {
                        images.push(data.image)
                    })
                }

                await setImages(images)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getAllNfts(account)
    }, [account])

    const confirmTerms = async () => {
        setStep(1)
    }

    const getJSON = async (url) => {
        const response = await fetch(url)
        if (!response.ok) {
        }

        const data = await response.json()
        return data
    }

    return (
        <div class={`flex flex-col bg-black bg-opacity-50 w-[118rem] h-[20rem] mx-auto mb-[1rem] mt-auto rounded-[2rem] ${step === 0 ? 'visible' : 'hidden'}`}>
            <div class="grid grid-cols-3 px-[7rem]">
                <div class="flex flex-col">
                    <p class="text-white text-3xl mt-[2rem] ml-[4rem]">Asset type</p>
                    <select class="bg-[#58504C] bg-opacity-60 text-white w-[8rem] ml-[5rem] mt-[2rem] rounded-lg block py-2.5">
                        <option class="text-white" value="Eth">
                            Ethereum
                        </option>
                        <option value="E">EmirCoin</option>
                    </select>
                </div>
                <div class="flex flex-col">
                    <p class="text-white text-3xl mt-[2rem] ml-[4rem]">Loan amount</p>
                    <input
                        type="text"
                        placeholder="0"
                        class="placeholder-white px-8 bg-[#58504C] bg-opacity-60 text-white w-[8rem] ml-[5rem] mt-[2rem] rounded-lg block py-2.5"
                    ></input>
                </div>
                <div class="flex flex-col">
                    <p class="text-white text-3xl mt-[2rem] ml-[4rem]">Loan duration</p>
                    <input
                        type="text"
                        placeholder="45 days"
                        class="placeholder-white px-8 bg-[#58504C] bg-opacity-60 text-white w-[8rem] ml-[5rem] mt-[2rem] rounded-lg block py-2.5"
                    ></input>
                </div>
            </div>
            <button onClick={confirmTerms} class="text-white text-2xl w-[16rem] h-[4rem] mr-[2rem] ml-auto mb-[1rem] mt-auto col-start-3 bg-[#54B1BC] rounded-2xl ">
                Confirm loan terms
            </button>
        </div>
    )
}

export default LoanTerms
