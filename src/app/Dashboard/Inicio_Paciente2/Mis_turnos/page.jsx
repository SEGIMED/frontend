"use client"
import { useRouter } from "next/navigation";
import ButtonBlancoBorde from "@/components/Buttons/ButtonBlancoBorder";
import { useAppSelector } from "@/redux/hooks";
import TableTurnos from "@/components/misTurnos/TableTurnos";

export default function MisTurnosPte() {
    const consulta = useAppSelector(state => state.schedules);
    const router = useRouter();
    
    
    const filterConsultas = consulta.filter(cons => cons.scheduling_status === 1);

  
    
    return (
        <div className="h-full flex flex-col overflow-y-auto md:overflow-y-hidden">
            <div className="flex items-center justify-between border-b border-b-[#cecece] pl-5 pr-6 py-2 bg-white static md:sticky top-0 z-20 md:z-50">
                <ButtonBlancoBorde text={"Ordenar"}  />
                <ButtonBlancoBorde text={"Pasadas"} />
            </div>
            <div className="grid grid-cols-5 md:grid-cols-7 items-center border-b border-b-[#cecece] text-center md:text-start p-2 bg-white static md:sticky top-14 z-10 md:z-4">
                <div className="flex">
                    <span className="font-bold text-[#5F5F5F] hidden md:block mr-8"></span>
                    <p className="font-bold text-[#5F5F5F] ml-4">Fecha</p>
                </div>
                <p className="font-bold text-[#5F5F5F]">Hora</p>
                <p className="font-bold text-[#5F5F5F]">Medico</p>
                <p className="font-bold text-[#5F5F5F] hidden md:block">Centro de atencion</p>
                <p className="font-bold text-[#5F5F5F] hidden md:block">Motivo de consulta</p>
                <p className="font-bold text-[#5F5F5F]">Atencion</p>
                <p></p>
            </div>
            <div className="md:overflow-auto h-full">
                <TableTurnos consultas={filterConsultas} />
            </div>
        </div>
    );
}
