import '../tail.css'
import { useState, useEffect } from 'react'
import LoanTerms from '../components/LoanTerms'
import Collateral from '../components/Collateral'

const Loan = ({ account }) => {
    const [step, setStep] = useState(0)
    const [nftList, setNftList] = useState([])
    const [collateralElement, setCollateralElement] = useState(null)
    const [images, setImages] = useState([])
    const [collateral, setCollateral] = useState({
        token_id: 0,
        token_address: '',
    })

    useEffect(() => {
        console.log('Account: ', account)
    }, [collateral])

    return (
        <div class="flex flex-col bg-black bg-opacity-50 w-[120rem] mx-auto mt-[5rem] rounded-[2rem] space-y-16 space-y-[8rem] mb-[4rem]">
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

            <LoanTerms step={step} setStep={setStep} nftList={nftList} setNftList={setNftList} account={account} setImages={setImages} />

            <Collateral
                account={account}
                nftList={nftList}
                step={step}
                setStep={setStep}
                setCollateralElement={setCollateralElement}
                collateralElement={collateralElement}
                collateral={collateral}
                setCollateral={setCollateral}
                images={images}
            />
        </div>
    )
}

export default Loan
