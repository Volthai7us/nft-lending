import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import { lendingAddress, lendingAbi } from '../abi/lending'
import abi from '../abi/erc721'

const Dashboard = ({ account }) => {
    const [lendings, setLendings] = useState([
        {
            apr: 0,
            amount: 0,
            duration: 0,
            lendId: 0,
            nftId: 0,
            noVote: 0,
            yesVote: 0,
            owner: '',
            over: false,
        },
    ])
    const [loading, setLoading] = useState(true)
    const [daoMember, setDaoMember] = useState(false)

    useEffect(() => {
        const getAllLending = async () => {
            setLoading(true)
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner(account)
            let lending = new ethers.Contract(lendingAddress, lendingAbi, signer)
            let count = await lending.lendCount()
            const currentLendings = []
            for (let i = 0; i < count; i++) {
                let lend = await lending.lends(i)
                let isOver = await lending.IsVoteOver(i)
                currentLendings.push({
                    contractAddress: lend.contractAddress.toString(),
                    apr: lend.APR.toString(),
                    amount: lend.amount.toString(),
                    duration: lend.duration.toString(),
                    lendId: lend.lendId.toString(),
                    nftId: lend.nftId.toString(),
                    noVote: lend.noVote.toString(),
                    yesVote: lend.yesVote.toString(),
                    owner: lend.owner,
                    over: isOver,
                })
            }
            setLendings(currentLendings)
            setLoading(false)
        }

        const isDaoMember = async (account) => {
            setLoading(true)
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            let lending = new ethers.Contract(lendingAddress, lendingAbi, signer)
            let isMember = await lending.GetMember(account)
            setDaoMember(isMember)
            setLoading(false)
        }
        getAllLending()
        isDaoMember(account)
    }, [setLendings, setDaoMember])

    const vote = async (lendId, vote) => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner(account)
        let lending = new ethers.Contract(lendingAddress, lendingAbi, signer)
        let tx = await lending.Vote(lendId, vote)
        await tx.wait()
        window.location.reload()
    }

    const borrow = async (lendId) => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner(account)
        let lending = new ethers.Contract(lendingAddress, lendingAbi, signer)
        let tx = await lending.Borrow(lendId)
        await tx.wait()
        window.location.reload()
    }

    const sendNft = async (contractAddress, tokenId) => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner(account)
        let nft = new ethers.Contract(contractAddress, abi, signer)
        let tx = await nft['safeTransferFrom(address,address,uint256)'](account, lendingAddress, tokenId, {
            gasLimit: 1000000,
        })
        await tx.wait()
    }

    if (loading) return <div class="text-5xl text-black mt-[5rem] text-center">Loading...</div>

    return (
        <div class="flex flex-col w-[110rem] min-h-[30rem] bg-[#191920] bg-opacity-80 rounded-[2rem] px-[5rem] mx-auto my-[2rem] ">
            <table class="table-auto w-[100rem] text-left text-gray-300 mx-auto my-[4rem]">
                <thead>
                    <tr class="text-white text-3xl">
                        <th class="px-6 py-3">Lend Id</th>
                        <th class="px-6 py-3">Nft Id</th>
                        <th class="px-6 py-3">Amount</th>
                        <th class="px-6 py-3">Duration</th>
                        <th class="px-6 py-3">Apr</th>
                        <th class="px-6 py-3">Yes Vote</th>
                        <th class="px-6 py-3">No Vote</th>
                        <th class="px-6 py-3">Owner</th>
                        {!daoMember ? <></> : <th class="px-6 py-3">Vote</th>}
                    </tr>
                </thead>
                <tbody>
                    {lendings.map((lending, i) => {
                        return (
                            <tr class="border bg-opacity-20 my-1" key={i}>
                                <td class="px-6 py-3">{lending.lendId}</td>
                                <td class="px-6 py-3">{lending.nftId}</td>
                                <td class="px-6 py-3">{lending.amount}</td>
                                <td class="px-6 py-3">{lending.duration}</td>
                                <td class="px-6 py-3">{lending.apr}</td>
                                <td class="px-6 py-3">{lending.yesVote}</td>
                                <td class="px-6 py-3">{lending.noVote}</td>
                                {lending.owner.toUpperCase() === account.toUpperCase() ? (
                                    <td class="px-6 py-3">
                                        {lending.over ? (
                                            <div class="space-x-4">
                                                <button
                                                    class="px-6 py-3 bg-[#191920] text-white rounded-[1rem] px-[1rem] py-[0.5rem]"
                                                    onClick={() => sendNft(lending.contractAddress, lending.nftId)}
                                                >
                                                    1. Send NFT
                                                </button>
                                                <button class="px-6 py-3 bg-[#191920] text-white rounded-[1rem] px-[1rem] py-[0.5rem]" onClick={(e) => borrow(lending.lendId)}>
                                                    2. Borrow
                                                </button>
                                            </div>
                                        ) : (
                                            <span class="text-white text-2xl "> Vote is not over </span>
                                        )}
                                    </td>
                                ) : (
                                    <td class="px-6 py-3">{lending.owner}</td>
                                )}
                                {!daoMember ? (
                                    <></>
                                ) : (
                                    <td class="px-6 py-3 flex space-x-4">
                                        <button class="bg-[#191920] text-white rounded-[1rem] px-[1rem] py-[0.5rem]" onClick={(e) => vote(lending.lendId, true)}>
                                            Yes
                                        </button>
                                        <button class="bg-[#191920] text-white rounded-[1rem] px-[1rem] py-[0.5rem]" onClick={(e) => vote(lending.lendId, false)}>
                                            No
                                        </button>
                                    </td>
                                )}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Dashboard
