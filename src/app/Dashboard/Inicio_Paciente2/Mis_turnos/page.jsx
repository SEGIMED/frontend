"use client"
import { useRouter} from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import ButtonBlancoBorde from "@/components/Buttons/ButtonBlancoBorder2";
import TableTurnos from "@/components/misTurnos/TableTurnos";
import rutas from "@/utils/rutas";
import IconFolderButton from "@/components/icons/iconFolderButton";
import MisTurnos from "@/components/misTurnos/misTurnos";


export default function MisTurnosPte() {
    
    const consulta = useAppSelector(state => state.schedules);
    const router = useRouter();
 
    
    const filterConsultas = consulta.filter(cons => cons.scheduling_status === 1);

    
    return (
        <div className="h-full flex flex-col overflow-y-auto md:overflow-y-hidden">
            <div className="flex items-center justify-between border-b border-b-[#cecece] pl-5 pr-6 py-2 bg-white static md:sticky top-0 z-20 md:z-20">
                <ButtonBlancoBorde text={"Ordenar"} />
               
                <ButtonBlancoBorde iconLeft={<IconFolderButton color="#487FFA"/>}text={"Pasadas"} funcion={() => {router.push(`${rutas.PacienteDash2}${rutas.Mis_turnos}${rutas.Pasadas}`)}} />
                
            </div>
            <MisTurnos/>
            <div className="md:overflow-auto h-full">
                <TableTurnos consultas={filterConsultas} />
            </div>
        </div>
    );
}
