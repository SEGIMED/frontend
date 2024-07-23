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
import PatientCardConsulta1 from "@/components/card/PatientCardNew";
import { PathnameShow } from "@/components/pathname/path";
import MenuDropDown from "@/components/dropDown/MenuDropDown";
import IconCorazonMini from "@/components/icons/iconCorazon";
import IconPersonalData from "@/components/icons/IconPersonalData";
import ReviewModalApte from "@/components/modal/ReviewModalApte";
import Ordenar from "@/components/Buttons/Ordenar";
import NotFound from "@/components/notFound/notFound";
import SkeletonList from "@/components/skeletons/HistorialSkeleton";
import IconRegresar from "@/components/icons/iconRegresar";

export default function HomeDoc() {
  const dispatch = useAppDispatch();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [riskFilter, setRiskFilter] = useState("");
  const [isSorted, setIsSorted] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  const consultas = useAppSelector((state) => state.schedules);
  // Obtener consultas del estado
  const myID = Number(Cookies.get("c")); // Obtener myID de las cookies

  // Obtener pacientes del estado
  const searchTerm = useAppSelector((state) => state.allPatients.searchTerm);

  useEffect(() => {
    dispatch(setSearchTerm(""));
  }, [dispatch]);

  useEffect(() => {
    // Actualizar isLoading según la llegada de consultas
    if (consultas.length > 0) {
      setIsLoading(false);
    }
  }, [consultas]);


  // Filtrar consultas con schedulingStatus = 1 y physician = myID, y extraer los IDs de los pacientes
  const scheduledConsultas = consultas.filter(
    (consulta) => consulta.schedulingStatus !== 1 && consulta.physician === myID
  );

  // Filtrar pacientes que tienen consulta programada y aplicar filtro de búsqueda
  const filteredPatients = scheduledConsultas.filter(
    (cita) =>
      cita.patientUser.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cita.patientUser.lastname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Ordenar pacientes si es necesario
  const sortedPatients = isSorted
    ? [...filteredPatients].sort((a, b) => a.patientUser.name.localeCompare(b.patientUser.name))
    : filteredPatients;

  const handleSortClick = () => {
    setIsSorted(!isSorted);
  };

  const lastSegmentTextToShow = PathnameShow();

  const handleRiskFilterClick = (risk) => {
    setRiskFilter(risk);
  };

  const toggleFilterMenu = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleReviewClick = (patient) => {
    setIsReviewModalOpen(true);
    setSelectedPatient(patient);
  };

  return (
    <div className="h-full text-[#686868] w-full flex flex-col overflow-y-auto md:overflow-y-hidden">
      <title>{lastSegmentTextToShow}</title>
      <div className="h-full w-full flex flex-col">
        <div className="w-full flex justify-between px-2 items-center border-b gap-3 bg-white border-b-[#cecece] pb-2 pt-2">
          <Ordenar />

          <h1 className="font-bold md:text-xl hidden md:block">Pasadas</h1>
          <div className="flex gap-3">
            <Link href={`${rutas.Doctor}${rutas.Historial}${rutas.Teleconsulta}`}>
              <button className="flex px-3 md:px-6 py-2 rounded-xl gap-1 items-center border-solid border-[#487FFA] border-2 bg-white">
                <p className="text-start text-[#487FFA] font-bold text-sm md:text-base leading-5">
                  Teleconsultas
                </p>
              </button>
            </Link>
            <Link href={`${rutas.Doctor}${rutas.Historial}`}>
              <button className="flex px-3 md:px-6 py-2 rounded-xl gap-1 items-center border-solid bg-[#487FFA] border-2 ">
                <IconRegresar />
                <p className="text-start text-white font-bold text-sm md:text-base leading-5">
                  Regresar
                </p>
              </button>
            </Link>
          </div>
        </div>
        <div className="md:overflow-y-auto h-full">
          <div className="w-[100%] bg-white border-b border-b-[#cecece] flex">
            <div className="w-[10%] md:w-[5%] md:block"></div>
            <div className="grid w-[70%] md:w-[75%] text-center items-center leading-6 text-base font-normal gap-3 grid-cols-3 md:text-start md:grid-cols-5 py-2 z-10">
              <p className="text-[#5F5F5F]">Nombre</p>
              <p className="text-[#5F5F5F] hidden md:block">Dx Principal</p>
              <p className="text-[#5F5F5F]">Grupo HTP</p>
              <p className="text-[#5F5F5F]">Fecha de consulta</p>
              <p className="text-[#5F5F5F] hidden md:block">Localidad</p>
            </div>
          </div>
          {isLoading ? (
            <SkeletonList count={9} />
          ) : filteredPatients.length === 0 ? (
            <NotFound text="No hay historial de consultas." sizeText="w-[100%]" />
          ) : (
            <div className="items-start justify-center w-full md:overflow-y-auto">
              {sortedPatients?.map((paciente) => (
                <PatientCardConsulta1
                  key={paciente.id}
                  paciente={paciente}
                  consulta={paciente.consulta}
                  button={
                    <MenuDropDown
                      label={"Mas"}
                      categories={[
                        {
                          title: "Opciones",
                          items: [
                            {
                              label: "Dejar Review",
                              icon: <IconCorazonMini />,
                              onClick: () => handleReviewClick(paciente),
                            },
                            {
                              label: "Ver consultas",
                              icon: <IconPersonalData />,
                              href: `${rutas.Doctor}${rutas.Historial}/${paciente.patient}`,
                            },
                          ],
                        },
                      ]}
                    />
                  }
                />
              ))}
            </div>
          )}
          {isReviewModalOpen && (
            <ReviewModalApte
              onClose={() => setIsReviewModalOpen(false)}
              id={selectedPatient.id}
            />
          )}
        </div>
      </div>
    </div>
  );
}
