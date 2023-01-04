import '../tail.css'
import { useState, useEffect } from 'react'

const Collateral = ({ account, nftList, setStep, step, setCollateralElement, collateralElement, collateral, setCollateral, images }) => {
    const selectCollateral = (id, nft) => {
        if (collateralElement) {
            collateralElement.classList.toggle('border-black')
            collateralElement.classList.toggle('border-4')
            collateralElement.classList.toggle('border-[#54B1BC]')
            collateralElement.classList.toggle('border-8')
        }
        id.classList.toggle('border-black')
        id.classList.toggle('border-4')
        id.classList.toggle('border-[#54B1BC]')
        id.classList.toggle('border-8')

        setCollateralElement(id)
        setCollateral({
            token_id: nft.token_id,
            token_address: nft.token_address,
        })
    }

    const confirmCollateral = () => {
        setStep(2)
    }

    const declineCollateral = () => {
        setStep(0)
    }

    useEffect(() => {}, [images])

    return (
        step === 1 && (
            <div class="flex flex-col bg-black bg-opacity-50 w-[118rem] min-h-[20rem] mx-auto mb-[1rem] mt-auto rounded-[2rem]">
                <div class="flex flex-col px-[7rem]">
                    <input
                        type="text"
                        placeholder="Search asset name"
                        class="col-span-2 placeholder-white px-8 bg-[#58504C] bg-opacity-60 text-white w-full mx-auto mt-[2rem] rounded-xl block py-2.5"
                    ></input>
                    <span class="col-start-2 col-span-2 text-white text-3xl mx-auto py-[2rem]"> NFTs </span>
                    <div class="grid grid-cols-5 gap-4">
                        {nftList.map((nft, i) => {
                            return (
                                <div
                                    class="flex flex-col pt-[3rem] bg-white bg-opacity-50 w-[20rem] min-h-[20rem] border-4 border-black hover:bg-gray-700 hover:cursor-pointer"
                                    onClick={(e) => selectCollateral(e.currentTarget, nft)}
                                    key={i}
                                >
                                    <div class="text-center flex flex-col space-y-4">
                                        <span class="text-white text-xl"> {nft.name} </span>
                                        <span class="text-white text-xl"> {nft.symbol} </span>
                                        <span class="text-white text-xl"> {nft.token_id} </span>
                                        <span class="text-white text-xl"> {nft.contract_type} </span>
                                    </div>
                                    {images[i] ? (
                                        <img class="mx-auto" src={images[i]} alt="nft" />
                                    ) : (
                                        <span class="m-auto text-center text-white text-2xl text-bold"> This NFT has no image available </span>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div class="flex flex-row col-start-3 ml-auto mr-0 mt-[1rem] mb-[1rem]">
                    <button onClick={confirmCollateral} class="text-white text-2xl w-[10rem] h-[3rem] mr-[2rem] bg-[#54B1BC] rounded-2xl ">
                        Accept
                    </button>
                    <button onClick={declineCollateral} class="text-white text-2xl w-[10rem] h-[3rem] mr-[2rem] bg-[#54B1BC] rounded-2xl ">
                        Decline
                    </button>
                </div>
            </div>
        )
    )
}

export default Collateral
