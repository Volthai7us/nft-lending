const lendingAddress = '0x93a50B4AFd72FA41deC97BC2DFE80712f281924E'
const lendingAbi = [
    {
        stateMutability: 'payable',
        type: 'fallback',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'contractAddress',
                type: 'address',
            },
        ],
        name: 'balanceOf',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'contractAddress',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'nftId',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'duration',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'APR',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
        ],
        name: 'borrow',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'contractAddress',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'nftId',
                type: 'uint256',
            },
        ],
        name: 'getBackNft',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
            },
        ],
        name: 'getLend',
        outputs: [
            {
                components: [
                    {
                        internalType: 'uint256',
                        name: 'lendId',
                        type: 'uint256',
                    },
                    {
                        internalType: 'address',
                        name: 'owner',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'contractAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256',
                        name: 'nftId',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'duration',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'APR',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'amount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'yesVote',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'noVote',
                        type: 'uint256',
                    },
                ],
                internalType: 'struct Lending.Lend',
                name: '',
                type: 'tuple',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'lendCount',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        name: 'lendings',
        outputs: [
            {
                internalType: 'uint256',
                name: 'lendId',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'contractAddress',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'nftId',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'duration',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'APR',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'yesVote',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'noVote',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        name: 'lends',
        outputs: [
            {
                internalType: 'uint256',
                name: 'lendId',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'contractAddress',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'nftId',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'duration',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'APR',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'yesVote',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'noVote',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'duration',
                type: 'uint256',
            },
        ],
        name: 'lock',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        name: 'lockCount',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        name: 'locks',
        outputs: [
            {
                internalType: 'uint256',
                name: 'lockingTime',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'duration',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'contractAddress',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'nftId',
                type: 'uint256',
            },
        ],
        name: 'ownerOf',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'lockId',
                type: 'uint256',
            },
        ],
        name: 'withdraw',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        stateMutability: 'payable',
        type: 'receive',
    },
]

export { lendingAddress, lendingAbi }
