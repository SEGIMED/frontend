"use client"
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import rutas from '@/utils/rutas';
import { setSearchTerm1 } from '@/redux/slices/doctor/allDoctores'; 
import FiltroDocPacientes from '@/components/Buttons/FiltrosDocPacientes';
import IconOrder from '@/components/icons/IconOrder';

import Cookies from 'js-cookie';

import MensajeSkeleton from '@/components/skeletons/MensajeSkeleton';

import Ver from '@/components/Buttons/optPreconsulta';
import DoctorCardConsultaT from '@/components/card/docCardConsultaT';

export default function HomePte() {
    const dispatch = useAppDispatch();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSorted, setIsSorted] = useState(false);
   
    // Obtener consultas del estado
    const consultas = useAppSelector(state => state.schedules);
    const myID = Number(Cookies.get("c")); 

    // Obtener docs del estado
    const listaDocs = useAppSelector(state => state.doctores.doctores);
    const searchTerm1 = useAppSelector(state => state.doctores.searchTerm1);
   
    
    useEffect(() => {
        dispatch(setSearchTerm1(''));
    }, [dispatch]);

    // Filtrar consultas con schedulingStatus = 1 y paciente = myID, y extraer los IDs de los docs
    const scheduledConsultas = consultas.filter(
        consulta => consulta.schedulingStatus === 1 && consulta.patient === myID
    );

    // Filtrar docs que tienen consulta programada y aplicar filtro de búsqueda
    const filteredDocs = listaDocs?.filter(doc =>
        scheduledConsultas.some(consulta => consulta.physician === doc.id) &&
        (doc.name.toLowerCase().includes(searchTerm1.toLowerCase()) ||
            doc.lastname.toLowerCase().includes(searchTerm1.toLowerCase()))
    );

   //asociar consulta a doc
    const docWithConsultas = filteredDocs.map(doc => {
        const consulta = scheduledConsultas.find(consulta => consulta.physician === doc.id && consulta.typeOfMedicalConsultation === 2);
        return { ...doc, consulta };
    });

   
   
    const sortedDocs = isSorted
        ? [...docWithConsultas].sort((a, b) => a.name.localeCompare(b.name))
        : docWithConsultas;
    
    const handleSortClick = () => {
        setIsSorted(!isSorted);
    };

   

    const toggleFilterMenu = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    if (filteredDocs.length === 0) {
        return <MensajeSkeleton />;
    }

    return (
        <div className="h-full text-[#686868] w-full flex flex-col">
            <div className="flex justify-between border-b border-b-[#cecece] px-6 py-2">
                <button
                    className="flex px-6 py-2 rounded-xl gap-1 items-center bg-[#487FFA]"
                    onClick={handleSortClick}>
                    <p className="text-start text-white font-bold text-base leading-5">Ordenar</p>
                    <IconOrder />
                </button>
                <button
                    className="flex px-6 py-2 rounded-xl gap-1 items-center bg-[#487FFA]"
                    onClick={handleSortClick}>
                    <p className="text-start text-white font-bold text-base leading-5">Teleconsulta</p>
                    
                </button>
                <FiltroDocPacientes
                    onClickSort={handleSortClick}
                    
                    isOpen={isFilterOpen}
                    toggleMenu={toggleFilterMenu}
                />
            </div>
            <div className="flex flex-col items-start justify-center w-full">
                {sortedDocs?.map(doc => (
                    <DoctorCardConsultaT key={doc.id} doctor={doc} consulta={doc.consulta} button={<Ver id={doc.id} 
                    ruta={`${rutas.PacienteDash}${rutas.Preconsulta}/Teleconsulta/${doc.id}`}/>} />
                ))}
            </div>
        </div>
    );
}