import '../tail.css'
import body3 from '../images/body_3.png'
import body4 from '../images/body_4.png'
import body5 from '../images/body_5.png'


const How = () => {
    return (
        <div class="flex flex-col space-y-[8rem] mb-[4rem]">
            <div class="flex flex-row mx-auto space-x-[10rem]">
                <div class="rounded-[12rem] h-[40rem] w-[40rem] overflow-hidden mt-[4rem]">
                    <img src={body3} alt="body3" />
                </div>
                <div class="w-[40rem]">
                    <p class="text-5xl text-white text-bold"> WHAT WE DO? </p>
                    <p class="text-4xl text-white mt-[4rem]">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        It has survived not only five centuries, but also the leap into electronic typesetting,
                        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
                        sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.s standard dummy text ever since the 1500s,
                    </p>
                </div>
            </div>

            <div class="flex flex-row mx-auto space-x-[10rem]">
                <div class="px-16 rounded-[12rem] bg-black bg-opacity-70 w-[40rem] h-[40rem]">
                    <p class="text-3xl text-white mt-[6rem]">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        It has survived not only five centuries, but also the leap into electronic typesetting,
                        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
                    </p>
                </div>
                <div class="px-16 rounded-[12rem] bg-black bg-opacity-70 w-[40rem] h-[40rem]">
                    <p class="text-3xl text-white mt-[6rem]">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        It has survived not only five centuries, but also the leap into electronic typesetting,
                        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
                    </p>
                </div>
            </div>
        </div>
    )
}

export default How