'use client'

import IconCurrentRouteNav from "../icons/IconCurrentRouteNav";



export default function InputInfo({ info, title }) {
    return (
        <div
            className="flex flex-col gap-2 px-6 md:py-2 py-4 border-b border-b-[#cecece]">
            <label className="text-start text-[#686868] font-medium text-base leading-4 flex gap-2 items-center">
                <IconCurrentRouteNav className='w-4' />
                {title}
            </label>
            <p className="w-full h-20 text-start text-[#686868] font-normal text-base leading-6 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg px-4 py-1">
                {info}
            </p>
        </div>

    );
}