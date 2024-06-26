'use client'

import Image from "next/image";


import sendIconSugerencias from '@/components/images/sendIconSugerencias.png'



export default function SugerenciasPte() {

    return (
        <div className="h-full  w-full flex flex-col">

            <div className="flex flex-col items-center justify-start h-full m-auto w-full  px-40">
                <div className='pt-10'>
                    <p className="text-center text-[#333333] font-semibold text-2xl leading-7 mb-7">Envie sus sugerencias a nuestro equipo</p>
                    <p className="text-center text-[#5F5F5F] font-normal text-xl leading-7 mb-10 ">Sus comentarios son importantes para nosotros y cada sugerencia será considerada cuidadosamente para mejorar nuestro sitio web y los servicios que ofrecemos. ¡Gracias por tomarse el tiempo de ayudarnos a mejorar! Asegúrese de proporcionar detalles claros y concisos para que podamos entender y actuar según sus recomendaciones de manera efectiva</p>
                </div>
                <form className="flex flex-col justify-center text-start w-full">
                    <p className="text-start text-[#5F5F5F] font-medium text-lg leading-5 mb-2 ">Ingrese aqui su sugerencia</p>
                    <textarea className='border-2 rounded-md border-[#cecece] outline-none p-2 min-h-40 text-[#5F5F5F]' />
                    <div className=" text-center  flex justify-center mt-5" >
                        <button className="text-white text-center bg-[#70C247] px-10 py-3 rounded-md flex items-center gap-2 justify-center hover:scale-105 active:scale-100 active:translate-y-1 w-fit ">
                            Enviar sugerencias <Image src={sendIconSugerencias} alt="" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}