"use client";

import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setSearchTerm } from "@/redux/slices/doctor/allPatients";
import rutas from "@/utils/rutas";
import OptPteHistorial from "@/components/Buttons/optPteHistorial";

import FiltroDocPacientes from "@/components/Buttons/FiltrosDocPacientes";
import IconOrder from "@/components/icons/IconOrder";
import IconFolder from "@/components/icons/iconFolder";
import Cookies from "js-cookie";
import Link from "next/link";
import MensajeSkeleton from "@/components/skeletons/MensajeSkeleton";
import PatientCardConsulta from "@/components/card/PatientCardConsulta";
import IconRegresar from "@/components/icons/iconRegresar";

export default function HomeDoc() {
  const dispatch = useAppDispatch();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [riskFilter, setRiskFilter] = useState("");
  const [isSorted, setIsSorted] = useState(false);

  // Obtener consultas del estado
  const consultas = useAppSelector((state) => state.schedules);
  const myID = Number(Cookies.get("c")); // Obtener myID de las cookies
  console.log(consultas)
  // Obtener pacientes del estado
  const listaPacientes = useAppSelector((state) => state.allPatients.patients);
  const searchTerm = useAppSelector((state) => state.allPatients.searchTerm);

  useEffect(() => {
    dispatch(setSearchTerm(""));
  }, [dispatch]);

  // Filtrar consultas con schedulingStatus = 1 y physician = myID, y extraer los IDs de los pacientes
 
  const scheduledConsultas = consultas.filter(
    (consulta) => {
      
      return consulta.typeOfMedicalConsultation  === 2 && consulta.physician === myID

    }
  );
  
  
  // Filtrar pacientes que tienen consulta programada y aplicar filtro de búsqueda

  // Ordenar pacientes si es necesario
  const sortedPatients = isSorted
    ? [...scheduledConsultas].sort((a, b) => a.name.localeCompare(b.name))
    : scheduledConsultas;

  const handleSortClick = () => {
    setIsSorted(!isSorted);
  };

  const handleRiskFilterClick = (risk) => {
    setRiskFilter(risk);
  };

  const toggleFilterMenu = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  if (listaPacientes.length === 0) {
    if (sortedPatients.length === 0) {
      return "No existen consultas registradas";
    }
    return <MensajeSkeleton />;
  }
  console.log(sortedPatients)
  return (
    <div className="h-full text-[#686868] w-full flex flex-col">
      <div className="flex justify-between items-center border-b border-b-[#cecece] px-6 py-2">
        <button
          className="flex px-2 md:px-6 py-2 rounded-xl gap-1 items-center bg-[#487FFA]"
          onClick={handleSortClick}>
          <p className="text-start text-white font-bold text-base leading-5">
            Ordenar
          </p>
          <IconOrder />
        </button>
        <h1 className="font-bold">Teleconsultas</h1>
        {/* <Link href={`${rutas.Doctor}${rutas.Historial}${rutas.Historial}R`}>
          <button className="flex px-2 md:px-6 py-2 rounded-xl gap-1 items-center border-solid border-[#487FFA] border-2 bg-white">
            <IconFolder className="h-6" />
            <p className="text-start text-[#487FFA] font-bold text-base leading-5">
              Pasadas
            </p>
          </button>
        </Link> */}
        {/* <FiltroDocPacientes
          onClickSort={handleSortClick}
          onClickFilter={handleRiskFilterClick}
          isOpen={isFilterOpen}
          toggleMenu={toggleFilterMenu}
        /> */}
        <Link href={`${rutas.Doctor}${rutas.Historial}`}>
          <button className="flex px-6 py-2 rounded-xl gap-1 items-center bg-[#487FFA]">
            <IconRegresar />
            <p className="text-start text-white font-bold text-base leading-5">
              Regresar
            </p>
          </button>
        </Link>
      </div>
      <div className="flex flex-col items-start justify-center w-full">
        {sortedPatients?.map((consulta) => (
          <PatientCardConsulta
            key={consulta.id}
            paciente={consulta}
            button={
              <OptPteHistorial
                id={consulta.id}
                ruta={`${rutas.Doctor}${rutas.Historial}${rutas.Teleconsulta}/${consulta.id}`}
              />
            }
          />
        ))}
      </div>
    </div>
  );
}
