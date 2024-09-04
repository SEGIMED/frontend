import IconMiniArrowNext from "../icons/iconMiniArrowNext"
import Link from "next/link"
import rutas from "@/utils/rutas"


export default function TratamientoPteCard({ id }) {
    return (
        <>
            <Link href={`${rutas.PacienteDash}${rutas.Tratamientos}/${id}`} >
                <button className="flex px-6 py-2  text-white bg-[#487FFA]  rounded-lg gap-1 items-center ">
                    <p className="text-start text-white font-bold text-base leading-5">Ver Tratamientos</p>
                    <IconMiniArrowNext />

                </button>
            </Link>
        </>
    )
}