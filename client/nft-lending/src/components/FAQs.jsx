import '../tail.css'
import body6 from '../images/body_6.png'
import body7 from '../images/body_7.png'

const FAQs = () => {
    return (
        <div class="relative h-[70rem] bg-black bg-opacity-80 mt-[5rem] flex flex-col z-20">
            <div class="mx-auto flex flex-col">
                <p class="text-white mx-auto text-5xl font-bold mt-20 "> FAQS </p>
                <p class="text-white mx-auto text-5xl mt-[3rem] leading-10"> ˙∆˚<span>&lt;</span>•––––––––––––––––––––––––––––––––––––•<span>&gt;</span>˚∆˙ </p>
            </div>
            <div class="mx-auto relative">
                <lo>
                    <li class="text-white text-4xl w-3/4 mx-auto mt-[3rem]">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </li>
                    <li class="text-white text-4xl w-3/4 mx-auto mt-[3rem]">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </li>
                    <li class="text-white text-4xl w-3/4 mx-auto mt-[3rem]">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </li>
                </lo>
                <div class="absolute -right-[20rem] top-0 w-[40rem] mx-auto">
                    <img src={body7} alt="body6" class="opacity-50" />
                </div>
            </div>
            <div class="absolute bottom-0 w-full mx-auto">
                <img src={body6} alt="body6" class="mx-auto w-full max-w-[200rem] z-0" />
            </div>

        </div>
    )
}

export default FAQs