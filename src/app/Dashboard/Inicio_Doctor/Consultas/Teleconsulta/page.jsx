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

  // Obtener pacientes del estado
  const listaPacientes = useAppSelector((state) => state.allPatients.patients);
  const searchTerm = useAppSelector((state) => state.allPatients.searchTerm);

  useEffect(() => {
    dispatch(setSearchTerm(""));
  }, [dispatch]);

  // Filtrar consultas con schedulingStatus = 1 y physician = myID, y extraer los IDs de los pacientes
  const scheduledConsultas = consultas.filter(
    (consulta) => consulta.schedulingStatus === 2 && consulta.physician === myID
  );

  // Filtrar pacientes que tienen consulta programada y aplicar filtro de búsqueda
  const filteredPatients = listaPacientes?.filter(
    (paciente) =>
      scheduledConsultas.some((consulta) => consulta.patient === paciente.id) &&
      (paciente.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paciente.lastname.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (riskFilter ? paciente.risk === riskFilter : true)
  );

  // Asociar consultas a los pacientes
  const patientsWithConsultas = filteredPatients.map((paciente) => {
    const consulta = scheduledConsultas.find(
      (consulta) =>
        consulta.patient === paciente.id &&
        consulta.typeOfMedicalConsultation === 2
    );
    return { ...paciente, consulta };
  });

  // Ordenar pacientes si es necesario
  const sortedPatients = isSorted
    ? [...patientsWithConsultas].sort((a, b) => a.name.localeCompare(b.name))
    : patientsWithConsultas;

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

  return (
    <div className="h-full text-[#686868] w-full flex flex-col">
      <div className="flex justify-between items-center border-b border-b-[#cecece] px-6 py-2">
        <button
          className="flex px-2 md:px-6 py-2 rounded-lg gap-1 items-center bg-[#487FFA]"
          onClick={handleSortClick}>
          <p className="text-start text-white font-bold text-base leading-5">
            Ordenar
          </p>
          <IconOrder />
        </button>
        <h1 className="font-bold">Teleconsultas</h1>
        {/* <Link href={`${rutas.Doctor}${rutas.Historial}${rutas.Historial}R`}>
          <button className="flex px-2 md:px-6 py-2 rounded-lg gap-1 items-center border-solid border-[#487FFA] border-2 bg-white">
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
          <button className="flex px-6 py-2 rounded-lg gap-1 items-center bg-[#487FFA]">
            <IconRegresar />
            <p className="text-start text-white font-bold text-base leading-5">
              Regresar
            </p>
          </button>
        </Link>
      </div>
      <div className="flex flex-col items-start justify-center w-full">
        {sortedPatients?.map((paciente) => (
          <PatientCardConsulta
            key={paciente.id}
            paciente={paciente}
            consulta={paciente.consulta}
            button={
              <OptPteHistorial
                id={paciente.id}
                ruta={`${rutas.Doctor}${rutas.Historial}${rutas.Teleconsulta}/${paciente.id}`}
              />
            }
          />
        ))}
      </div>
    </div>
  );
}
