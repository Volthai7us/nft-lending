import '../tail.css'
import body1 from '../images/body_1.png'

const Riddles = () => {
    return (
        <div class="grid grid-cols-2 bg-[#191920] rounded-[8.25rem] w-[80rem] mx-auto mt-[1rem] overflow-hidden">
            <div class="col-start-1 col-span-1">
                <img src={body1} alt="body1" />
            </div>
            <div class="col-start-2 col-span-1 ml-[3rem] flex flex-col space-y-10">
                <p class="text-left text-[#F2F2F2] text-5xl ml-0 mr-auto font-bold text-center mt-20 text-[#EAD1B9]"> Riddles </p>
                <p class="text-white mr-[10rem] text-2xl leading-[40px]">
                    This thing is both a blessing and a curse, It can bring happiness or greed and regret.
                    It can give you the things you want, but it can also bring stress and conflict. It is something you can hold in your hand,
                    but it is not a tangible object. What is it?
                </p>
                <a href="#" class="border-black border-2 w-1/4 mr-auto ml-auto px-4 p-1 text-white bg-[#BD896C] rounded-full text-xl text-center"> HINT? </a>
            </div>
        </div>
    )
}

export default Riddles
