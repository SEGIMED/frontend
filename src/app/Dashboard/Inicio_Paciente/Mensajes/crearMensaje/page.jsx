'use client'

import { useAppSelector } from '@/redux/hooks';
import Link from 'next/link';

import DoctorCard from '@/components/card/doctorCard';


import rutas from '@/utils/rutas';
import Elboton from '@/components/Buttons/Elboton';
import IconMensajeBoton from '@/components/icons/IconMensajeBoton';

import { socket } from '@/utils/socketio';
import MensajeSkeleton from '@/components/skeletons/MensajeSkeleton';
import IconOrder from '@/components/icons/IconOrder';
import IconRegresar from '@/components/icons/iconRegresar';

export default function DoctoresPte() {
    
    const doctores = useAppSelector(state => state.doctores.doctores);
    const isLoading = useAppSelector(state => state.doctores.doctores.length === 0);
    
    if (isLoading) {
        return <MensajeSkeleton/>;
    }

    const crearChat = (id) => {
        socket.emit("createChat", { id }, (response) => {
            
           
        });
    };

    return (
        <div className="h-full w-full flex flex-col">
            <div className="flex justify-between border-b border-b-[#cecece] px-6 py-2">
                <Elboton nombre={"Ordenar"} size={"lg"} icon={<IconOrder/>} />
                <Link href={`${rutas.PacienteDash}${rutas.Mensajes}`}>
                <Elboton nombre={"Regresar"} size={"lg"} icon={<IconRegresar/>} />
                </Link>
            </div>
            <div className=" items-start w-full overflow-y-auto ">
                {doctores?.map(doctor => (
                    <DoctorCard 
                        key={doctor.id} 
                        doctor={doctor}
                        button={
                         <Link href={`${rutas.PacienteDash}${rutas.Mensajes}/${doctor.id}`}>  
                        <Elboton nombre={"Enviar Mensaje"} icon={<IconMensajeBoton/>} size={"md"} onPress={crearChat(doctor.id)}/>
                        </Link> 
                    } 
                    />
                ))}
            </div>
            
        </div>
    );
}
