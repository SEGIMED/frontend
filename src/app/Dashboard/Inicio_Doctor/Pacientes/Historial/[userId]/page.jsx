'use client';

import { useAppSelector } from '@/redux/hooks';
import Image from "next/image";
import filtrar from '@/components/images/filtrar.png';
import ordenar from '@/components/images/ordenar.png';
import opciones from '@/components/images/opciones.png';

import ruteActual from '@/components/images/ruteActual.png';
import IconInfo from '@/components/icons/IconInfo';
import Link from 'next/link';
import rutas from '@/utils/rutas';


export default function HistorialDeCitas(userId) {
    const pacientes = useAppSelector(state => state.allPatients.patients);
    const id = userId.params.userId;

    if (!userId) {
        return <div>Cargando...</div>;
    }



    const getPacienteById = (userId) => {
        return pacientes.find((paciente) => paciente.id === parseInt(userId));
    };

    const paciente = getPacienteById(id);


    return (
        <div className="h-full w-full flex flex-col">
            <div className="flex justify-between border-b border-b-[#cecece] px-6 py-2">
                <button className="flex px-6 py-2 text-white bg-[#487FFA]  rounded-lg gap-1 items-center  ">
                    <Image src={filtrar} alt="" />
                    <p className="text-start font-bold text-base leading-5">Filtrar</p>
                </button>
                <button className="flex px-6 py-2 text-white bg-[#487FFA]  rounded-lg gap-1 items-center ">
                    <p className="text-start  font-bold text-base leading-5">Ordenar</p>
                    <Image src={ordenar} alt="" />
                </button>
            </div>
            <div className="flex flex-col items-start justify-center w-full">
                <div key={paciente.id} className="flex justify-between w-full border-b border-b-[#cecece] px-6 py-2 items-center " >
                    <div className="flex gap-3 items-center">
                        <div className="w-12 h-12 flex justify-center items-center">
                            <Image src={ruteActual} alt="" />
                        </div>
                        <p className="text-start text-[#686868] font-normal text-base leading-6">{paciente.name} {paciente.lastname}</p>
                        <Image src={ruteActual} alt="" />
                        <p className="text-start text-[#686868] font-normal text-base leading-6">{paciente.last_login}</p>
                    </div>
                    <details className="dropdown ">
                        <summary className="flex px-6 py-2  text-white bg-[#487FFA]  rounded-lg gap-1 items-center cursor-pointer ">
                            <Image src={opciones} alt="" />
                            <p className="text-start font-bold text-base leading-5 ">Opciones</p>
                        </summary>
                        <ul className="absolute bg-white z-20  p-2 text-start text-[#686868] font-normal text-base leading-6 w-56 right-4 border-2 border-[#D7D7D7] rounded-lg gap-4">
                            <li className='flex items-center gap-2 font-medium text-sm leading-4'><IconInfo />Informacion</li>
                            <li className='font-normal text-base leading-8 ml-5 flex items-center gap-2'>
                                <Link href={`${rutas.Doctor}${rutas.Pacientes}/${paciente.id}`}>
                                    Ver datos Personales
                                </Link>
                            </li>
                            <li className='font-normal text-base leading-8 ml-5 flex items-center gap-2'>
                                Ver datos de consulta
                            </li>
                        </ul>
                    </details>
                </div>
            </div>
        </div>
    );
}
