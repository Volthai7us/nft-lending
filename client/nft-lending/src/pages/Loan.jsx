import '../tail.css'
import { useState } from 'react'
import axios from 'axios'

const Loan = ({ account }) => {
    const [step, setStep] = useState(0)
    const [nftList, setNftList] = useState([])

    const confirmTerms = () => {
        setStep(1)
        getAllNfts(account)
    }

    const confirmCollateral = () => {
        setStep(2)
    }

    const getAllNfts = async (address) => {
        await axios
            .get(`http://localhost:3000/nfts?id=${address}`)
            .then((response) => {
                console.log(response.data.result.map((nft) => nft))
                setNftList(response.data.result)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div class="flex flex-col space-y-[8rem] mb-[4rem]">
            <div class="flex flex-col bg-black bg-opacity-50 w-[120rem] mx-auto mt-[5rem] rounded-[2rem] space-y-16">
                <div class="flex flex-row bg-black bg-opacity-50 w-[120rem] h-[5rem] mx-auto rounded-[2rem]">
                    <p class="text-[#E5C091] text-4xl my-auto ml-[4rem]">Choose loan terms</p>
                    <p class="text-white text-4xl ml-auto mr-[4rem] align-baseline my-auto">
                        <span class={`${step === 0 ? 'text-[#54B1BC]' : 'text-white'}`}>1. Loan terms</span>
                        <span>&gt;</span>
                        <span class={`${step === 1 ? 'text-[#54B1BC]' : 'text-white'}`}>2. Collateral</span>
                        <span>&gt;</span>
                        <span class={`${step === 2 ? 'text-[#54B1BC]' : 'text-white'}`}>3. Submit loan request</span>
                    </p>
                </div>

                <div class={`mt-[1rem]`}>
                    <p class="text-[#E5C091] text-3xl h-[5rem] ml-[4rem]">
                        {step === 0 ? (
                            <span>
                                <span class="text-white">Please specify the asset you want to borrow and the loan duration.</span>
                                <br />
                                <br />
                                The asset type and amount you choose are only the desired terms. They might differ based on the offers you choose to accept.
                            </span>
                        ) : step === 1 ? (
                            'Please choose an asset or multiple assets that you would like to use as collateral for your loan'
                        ) : (
                            'Submit the loan request'
                        )}
                    </p>
                </div>
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
                <div class={`flex flex-col bg-black bg-opacity-50 w-[118rem] min-h-[40rem] mx-auto mb-[1rem] mt-auto rounded-[2rem] ${step === 1 ? 'visible' : 'hidden'}`}>
                    <div class="flex flex-col px-[7rem]">
                        <input
                            type="text"
                            placeholder="Search asset name"
                            class="col-span-2 placeholder-white px-8 bg-[#58504C] bg-opacity-60 text-white w-full mx-auto mt-[2rem] rounded-xl block py-2.5"
                        ></input>
                        <div class="flex flex-row justify-between px-[10rem] pt-[3rem]">
                            <span class="col-start-2 col-span-2 text-white text-3xl"> NFTs </span>
                            {/* <span class="col-start-2 col-span-1 text-white text-3xl"> Coins </span> */}
                        </div>
                        <div class="flex flex-row justify-between pt-[3rem]">
                            <span class="text-white text-4xl"> name </span>
                            <span class="text-white text-4xl"> symbol </span>
                            <span class="text-white text-4xl"> token_id </span>
                            <span class="text-white text-4xl"> contract_type </span>
                        </div>
                        {nftList.map((nft) => {
                            return (
                                <div class="flex flex-row justify-between pt-[3rem]">
                                    <span class="text-white text-xl"> {nft.name} </span>
                                    <span class="text-white text-xl"> {nft.symbol} </span>
                                    <span class="text-white text-xl"> {nft.token_id} </span>
                                    <span class="text-white text-xl"> {nft.contract_type} </span>
                                </div>
                            )
                        })}
                    </div>
                    <div class="flex flex-row col-start-3 ml-auto mr-0 mt-[3rem] mb-[1rem]">
                        <button onClick={confirmCollateral} class="text-white text-2xl w-[10rem] h-[3rem] mr-[2rem] bg-[#54B1BC] rounded-2xl ">
                            Accept
                        </button>
                        <button onClick={confirmTerms} class="text-white text-2xl w-[10rem] h-[3rem] mr-[2rem] bg-[#54B1BC] rounded-2xl ">
                            Decline
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loan
