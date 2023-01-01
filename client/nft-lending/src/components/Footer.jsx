import '../tail.css'
import body8 from '../images/body_8.png'

const Footer = () => {
    return (
        <div class="bg-[#191918] h-[30rem] w-full">
            <div class="grid grid-cols-4 w-[120rem] mx-auto">
                <div class="mt-[5rem] ml-[3rem]">
                    <img src={body8} alt="body7" class="w-[20rem]" />
                </div>
                <div class="flex flex-col">
                    <p class="text-white text-4xl mt-20 "> Company </p>
                    <ol>
                        <li class="text-white text-2xl mt-[3rem]"> About </li>
                        <li class="text-white text-2xl mt-[3rem]"> How it Work </li>
                        <li class="text-white text-2xl mt-[3rem]"> Team </li>
                    </ol>
                </div>
                <div class="flex flex-col">
                    <p class="text-white text-4xl mt-20 "> Resources </p>
                    <ol>
                        <li class="text-white text-2xl mt-[3rem]"> Whitepaper </li>
                        <li class="text-white text-2xl mt-[3rem]"> Docs </li>
                        <li class="text-white text-2xl mt-[3rem]"> FAQ </li>
                    </ol>
                </div>
                <div class="flex flex-col">
                    <p class="text-white text-4xl mt-20 "> Contact </p>
                    <ol>
                        <li class="text-white text-2xl mt-[3rem]"> cartcurt@spnx.xyz </li>
                    </ol>
                </div>
            </div>

        </div>
    )
}

export default Footer