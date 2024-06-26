
"use client"
export default function DashHomeButtons({ icon, name }) {
    return (
        <div className="bg-gradient-to-br from-[#729EFF] via-[#2060ED] to-[#729EFF] flex justify-center items-center gap-3 text-white text-xl rounded-3xl w-60 h-24">
                        {icon}
                        <div className="flex flex-col">
                           {name}
                        </div>
                    </div>
    )
}