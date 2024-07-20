"use client"
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { setSearchTerm1 } from '@/redux/slices/doctor/allDoctores'; 
import FiltroDocPacientes from '@/components/Buttons/FiltrosDocPacientes';
import IconOrder from '@/components/icons/IconOrder';

import Cookies from 'js-cookie';
import rutas from '@/utils/rutas';
import MensajeSkeleton from '@/components/skeletons/MensajeSkeleton';

import Ver from '@/components/Buttons/optPreconsulta';
import DoctorCardConsultaT from '@/components/card/docCardConsultaT';
import Elboton from '@/components/Buttons/Elboton';
import IconRegresar from '@/components/icons/iconRegresar';
import DoctorCardConsulta from '@/components/card/docCardConsulta';

export default function HomePte() {
    const dispatch = useAppDispatch();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSorted, setIsSorted] = useState(false);
    const router= useRouter()
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
        consulta => consulta.schedulingStatus === 1 && consulta.patient === myID && consulta.typeOfMedicalConsultation === 2
    );

    // Filtrar docs que tienen consulta programada y aplicar filtro de búsqueda
    // const filteredDocs = listaDocs?.filter(doc =>
    //     scheduledConsultas.some(consulta => consulta.physician === doc.id) &&
    //     (doc.name.toLowerCase().includes(searchTerm1.toLowerCase()) ||
    //         doc.lastname.toLowerCase().includes(searchTerm1.toLowerCase()))
    // );

   //asociar consulta a doc
    // const docWithConsultas = filteredDocs.map(doc => {
    //     const consulta = scheduledConsultas.find(consulta => consulta.physician === doc.id && consulta.typeOfMedicalConsultation === 2);
    //     return { ...doc, consulta };
    // });

   
   
    // const sortedDocs = isSorted
    //     ? [...docWithConsultas].sort((a, b) => a.name.localeCompare(b.name))
    //     : docWithConsultas;
    
    const handleSortClick = () => {
        setIsSorted(!isSorted);
    };

   

    const toggleFilterMenu = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    if (scheduledConsultas.length === 0) {
        return <MensajeSkeleton />;
    }

    return (
        <div className="h-full text-[#686868] w-full flex flex-col">
            <div className="flex justify-between border-b border-b-[#cecece] px-6 py-2">
              
              <Elboton size={"md"} onPress={() => router.push(`${rutas.PacienteDash}${rutas.Preconsulta}`)}  
              nombre={"Regresar"} icon={<IconRegresar/>} className=" font-bold"/>
             
                <FiltroDocPacientes
                    onClickSort={handleSortClick}
                    
                    isOpen={isFilterOpen}
                    toggleMenu={toggleFilterMenu}
                />
            </div>
            <div className="grid grid-cols-4 md:grid-cols-6 items-center border-b border-b-[#cecece] text-center md:text-start p-2 bg-white static md:sticky top-14 z-10 md:z-4 ">
                <p className="font-bold text-[#5F5F5F] ml-1 md:ml-10">Fecha</p>
                <p className="font-bold text-[#5F5F5F]">Hora</p>
                <p className="font-bold text-[#5F5F5F]">Medico</p>
                <p className="font-bold text-[#5F5F5F] hidden md:block">Centro de atención</p>
                <p className="font-bold text-[#5F5F5F] hidden md:block">Motivo de consulta</p>
            </div>
             <div className="overflow-auto h-full">
                {scheduledConsultas?.map(doc => (
                    <DoctorCardConsulta key={doc.id} doctor={doc}  button={<Ver id={doc.id} 
                    ruta={`${rutas.PacienteDash}${rutas.Preconsulta}/Teleconsulta/${doc.id}`}/>} />
                ))}
            </div>
        </div>
    );
}