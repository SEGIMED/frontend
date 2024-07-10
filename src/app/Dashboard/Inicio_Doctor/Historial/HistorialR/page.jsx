"use client";

import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setSearchTerm } from "@/redux/slices/doctor/allPatients";
import OptPteHistorial from "@/components/Buttons/optPteHistorial";

import FiltroDocPacientes from "@/components/Buttons/FiltrosDocPacientes";
import IconOrder from "@/components/icons/IconOrder";

import IconRegresar from "@/components/icons/iconRegresar";
import Link from "next/link";
import rutas from "@/utils/rutas";
import MensajeSkeleton from "@/components/skeletons/MensajeSkeleton";
import PatientCardConsulta from "@/components/card/PatientCardConsulta";
import Cookies from "js-cookie";

export default function HomeDocAll() {
  const dispatch = useAppDispatch();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [riskFilter, setRiskFilter] = useState("");
  const [isSorted, setIsSorted] = useState(false);
  const myID = Number(Cookies.get("c"));

  // Obtener consultas del estado
  const consultas = useAppSelector((state) => state.schedules);

  // Obtener pacientes del estado
  const listaPacientes = useAppSelector((state) => state.allPatients.patients);
  const searchTerm = useAppSelector((state) => state.allPatients.searchTerm);

  useEffect(() => {
    dispatch(setSearchTerm(""));
  }, [dispatch]);

  // Filtrar consultas con schedulingStatus diferente de 1, y extraer los IDs de los pacientes
  const scheduledPatientIds = consultas
    .filter((consulta) => consulta.schedulingStatus !== 1)
    .map((consulta) => consulta.patient);

  const scheduledConsultas = consultas.filter(
    (consulta) => consulta.schedulingStatus !== 1 && consulta.physician === myID
  );

  // Filtrar pacientes que tienen consulta programada y aplicar filtro de búsqueda
  const filteredPatients = listaPacientes?.filter(
    (paciente) =>
      scheduledPatientIds.includes(paciente.id) &&
      (paciente.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paciente.lastname.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (riskFilter ? paciente.risk === riskFilter : true)
  );

  // Ordenar pacientes si es necesario
  const sortedPatients = isSorted
    ? [...filteredPatients].sort((a, b) => a.name.localeCompare(b.name))
    : filteredPatients;

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
  console.log(scheduledPatientIds);

  return (
    <div className="h-full text-[#686868] w-full flex flex-col overflow-y-auto md:overflow-y-hidden">
      <div className="flex justify-between border-b border-b-[#cecece] px-6 py-2">
        {/* <button 
                    className="flex px-6 py-2 rounded-xl gap-1 items-center bg-[#487FFA]" 
                    onClick={handleSortClick}>
                    <p className="text-start text-white font-bold text-base leading-5">Ordenar</p>
                    <IconOrder />
                </button> */}
        <div></div>
        <Link href={`${rutas.Doctor}${rutas.Historial}`}>
          <button className="flex px-6 py-2 rounded-xl gap-1 items-center bg-[#487FFA]">
            <IconRegresar />
            <p className="text-start text-white font-bold text-base leading-5">
              Regresar
            </p>
          </button>
        </Link>
        {/* <FiltroDocPacientes
                    onClickSort={handleSortClick}
                    onClickFilter={handleRiskFilterClick}
                    isOpen={isFilterOpen}
                    toggleMenu={toggleFilterMenu}                
                /> */}
        <div></div>
      </div>
      <div className="flex flex-col items-start justify-center w-full md:overflow-y-auto">
        {scheduledConsultas?.map((paciente) => (
          <PatientCardConsulta
            key={paciente.id}
            paciente={paciente}
            button={
              <OptPteHistorial
                id={paciente.patient}
                ruta={`${rutas.Doctor}${rutas.Pacientes}${rutas.Historia_Clinica}/${paciente.patient}/${rutas.Consultas}`}
              />
            }
          />
        ))}
      </div>
    </div>
  );
}
