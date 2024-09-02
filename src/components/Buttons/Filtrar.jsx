"use client"
import Image from 'next/image';

import filtrar from '@/components/images/filtrar.png';


export default function Filtrar() {
    return (
        <button className="flex px-6 py-2 bg-[#487FFA] rounded-lg gap-1 items-center">
            <Image src={filtrar} alt="Filtrar" />
            <p className="text-start text-white font-bold text-base leading-5">Filtrar</p>
        </button>
    )
}