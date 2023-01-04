import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import { lendingAddress, lendingAbi } from '../abi/lending'

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
        },
    ])
    const [loading, setLoading] = useState(true)

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
                currentLendings.push({
                    apr: lend.APR.toString(),
                    amount: lend.amount.toString(),
                    duration: lend.duration.toString(),
                    lendId: lend.lendId.toString(),
                    nftId: lend.nftId.toString(),
                    noVote: lend.noVote.toString(),
                    yesVote: lend.yesVote.toString(),
                    owner: lend.owner,
                })
            }
            setLendings(currentLendings)
            setLoading(false)
            console.log(lendings)
        }
        getAllLending()
    }, [setLendings])

    if (loading) return <div class="text-5xl text-white text-center">Loading...</div>

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
                    </tr>
                </thead>
                <tbody>
                    {lendings.map((lending, i) => {
                        return (
                            <tr key={i}>
                                <td class="px-6 py-3">{lending.lendId}</td>
                                <td class="px-6 py-3">{lending.nftId}</td>
                                <td class="px-6 py-3">{lending.amount}</td>
                                <td class="px-6 py-3">{lending.duration}</td>
                                <td class="px-6 py-3">{lending.apr}</td>
                                <td class="px-6 py-3">{lending.yesVote}</td>
                                <td class="px-6 py-3">{lending.noVote}</td>
                                <td class="px-6 py-3">{lending.owner}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Dashboard
