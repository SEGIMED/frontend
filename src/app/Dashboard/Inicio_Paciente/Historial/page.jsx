'use client'

import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { setSearchTerm1 } from '@/redux/slices/doctor/allDoctores';

import FiltroDocPacientes from '@/components/Buttons/FiltrosDocPacientes';
import IconOrder from '@/components/icons/IconOrder';


import MensajeSkeleton from '@/components/skeletons/MensajeSkeleton';

import OptDocCardHistorial from '@/components/Buttons/optDocCardHistorial';
import DoctorCardConsulta from '@/components/card/docCardConsulta';

export default function HomeDocAll() {
    const dispatch = useAppDispatch();
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const [isSorted, setIsSorted] = useState(false);



    const consultas = useAppSelector(state => state.schedules);


    const listaDocs = useAppSelector(state => state.doctores.doctores);
    const searchTerm1 = useAppSelector(state => state.doctores.searchTerm1);

    useEffect(() => {
        dispatch(setSearchTerm1(''));
    }, [dispatch]);

    // Filtrar consultas con schedulingStatus diferente de 1, y extraer los IDs 
    const scheduledPatientIds = consultas
        .filter(consulta => consulta.schedulingStatus !== 1)
        .map(consulta => consulta.physician);


    const filteredDocs = listaDocs?.filter(doc =>
        scheduledPatientIds.includes(doc.id) &&
        (doc.name.toLowerCase().includes(searchTerm1.toLowerCase()) ||
            doc.lastname.toLowerCase().includes(searchTerm1.toLowerCase()))

    );

    // Ordenar pacientes si es necesario
    const sortedDocs = isSorted
        ? [...filteredDocs].sort((a, b) => a.name.localeCompare(b.name))
        : filteredDocs;

    const handleSortClick = () => {
        setIsSorted(!isSorted);
    };



    const toggleFilterMenu = () => {
        setIsFilterOpen(!isFilterOpen);
    }

    if (filteredDocs.length === 0) {
        return <MensajeSkeleton />
    }

    return (
        <div className="h-full text-[#686868] w-full flex flex-col">
            <div className="flex justify-between border-b border-b-[#cecece] px-6 py-2">
                {/* <button 
                    className="flex px-6 py-2 rounded-xl gap-1 items-center bg-[#487FFA]" 
                    onClick={handleSortClick}>
                    <p className="text-start text-white font-bold text-base leading-5">Ordenar</p>
                    <IconOrder />
                </button> */}
                <div></div>
                <div>Historial de consultas</div>
                <div></div>

                {/* <FiltroDocPacientes
                    onClickSort={handleSortClick}
                    isOpen={isFilterOpen}
                    toggleMenu={toggleFilterMenu}                
                /> */}
            </div>
            <div className="flex flex-col items-start justify-center w-full">
                {sortedDocs?.map(doc => (
                    <DoctorCardConsulta key={doc.id} doctor={doc} consulta={doc.consulta} button={<OptDocCardHistorial id={doc.id} />} />
                ))}
            </div>
        </div>
    );
}
