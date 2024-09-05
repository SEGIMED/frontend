import Link from "next/link"
import Image from "next/image"
import mensaje2 from '@/components/images/mensaje2.png'
import rutas from "@/utils/rutas"


export default function MensajeDocCard(id) {
    return (
        <>
            <Link href={`${rutas.PacienteDash}${rutas.Mensajes}/${id}`}>
                <button className="flex px-6 py-2 bg-[#487FFA] rounded-lg gap-1 items-center ">
                    <Image src={mensaje2} alt="" />
                    <p className="text-start text-white font-bold text-base leading-5">Ver mensajes</p>
                </button>
            </Link>
        </>
    )
}