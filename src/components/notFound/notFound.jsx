
import IconNotFound from "../icons/ImageNotFound";



export default function NotFound({ text }) {
    return (
        <div className="flex flex-col h-[90%]   items-center justify-center space-x-0">

            <div className='flex flex-col items-center justify-center  gap-8 md:gap-6 '>

                <IconNotFound />

                <p className='text-bluePrimary  leading-10 text-2xl md:text-4xl  font-normal  justify-center flex text-center  '>{text}</p>

            </div>
        </div>
    );
}