'use client'

import IconCircle from "../icons/IconCircle";

export default function InputInterconsulta({ name, title }) {
    return (
        <div className="flex flex-col gap-2 px-6 md:py-2 py-4 border-b border-b-[#cecece]">
            <label className="text-start text-[#686868] font-medium text-base leading-4 flex gap-2 items-center">
                <IconCircle className='w-4' />
                {title}
            </label>

            <textarea className="w-full h-20 text-start text-[#686868] font-normal text-base leading-6 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg px-4 py-1 outline-[#a8a8a8]" placeholder="Describa toda la información posible"
            //  {...register("inputSubsistema")} 
            />

        </div>
    );
}
