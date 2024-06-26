'use client'

import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import Link from 'next/link';

import { useState, useEffect } from 'react';
import { setSearchTerm } from '@/redux/slices/doctor/allPatients';


import rutas from '@/utils/rutas';
import Elboton from '@/components/Buttons/Elboton';
import IconMensajeBoton from '@/components/icons/IconMensajeBoton';

import { socket } from '@/utils/socketio';
import MensajeSkeleton from '@/components/skeletons/MensajeSkeleton';
import IconOrder from '@/components/icons/IconOrder';
import IconRegresar from '@/components/icons/iconRegresar';
import PatientCard from '@/components/card/PatientCard';

export default function DoctoresPte() {
    
    const [isSorted, setIsSorted] = useState(false);
    const listaPacientes = useAppSelector(state => state.allPatients.patients)
    const isLoading = useAppSelector(state => state.allPatients.patients.length === 0);
    const searchTerm = useAppSelector((state) => state.allPatients.searchTerm);

    const dispatch = useAppDispatch();

    useEffect(() => {
    dispatch(setSearchTerm(""));
    }, [dispatch]);

    const filteredPatients = listaPacientes?.filter(
        (paciente) =>
          (paciente.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            paciente.lastname.toLowerCase().includes(searchTerm.toLowerCase())) 
      );
    
      const sortedPatients = isSorted
        ? [...filteredPatients].sort((a, b) => a.name.localeCompare(b.name))
        : filteredPatients;
    
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
                <Link href={`${rutas.Doctor}${rutas.Mensajes}`}>
                <Elboton nombre={"Regresar"} size={"lg"} icon={<IconRegresar/>} />
                </Link>
            </div>
            <div className="flex flex-col items-start w-full overflow-y-auto ">
                {sortedPatients?.map(paciente => (
                    <PatientCard
                        key={paciente.id} 
                        paciente={paciente}
                        button={
                         <Link href={`${rutas.Doctor}${rutas.Mensajes}/${paciente.id}`}>  
                        <Elboton nombre={"Enviar Mensaje"} icon={<IconMensajeBoton/>} size={"md"} onPress={crearChat(paciente.id)}/>
                        </Link> 
                    } 
                    />
                ))}
            </div>
            
        </div>
    );
}
