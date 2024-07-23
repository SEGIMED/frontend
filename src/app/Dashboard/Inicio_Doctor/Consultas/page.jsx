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
import { PathnameShow } from "@/components/pathname/path";
import MenuDropDown from "@/components/dropDown/MenuDropDown";
import IconCorazonMini from "@/components/icons/iconCorazon";
import IconPersonalData from "@/components/icons/IconPersonalData";
import ReviewModalApte from "@/components/modal/ReviewModalApte";

export default function HomeDoc() {
  const dispatch = useAppDispatch();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [riskFilter, setRiskFilter] = useState("");
  const [isSorted, setIsSorted] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  // Obtener consultas del estado
  const consultas = useAppSelector((state) => state.schedules);
  const myID = Number(Cookies.get("c")); // Obtener myID de las cookies

  // Obtener pacientes del estado
  // const listaPacientes = useAppSelector((state) => state.allPatients.patients);
  const searchTerm = useAppSelector((state) => state.allPatients.searchTerm);

  useEffect(() => {
    dispatch(setSearchTerm(""));
  }, [dispatch]);

  // Filtrar consultas con schedulingStatus = 1 y physician = myID, y extraer los IDs de los pacientes
  const scheduledConsultas = consultas.filter(
    (consulta) => consulta.schedulingStatus === 1 && consulta.physician === myID
  );

  // Filtrar pacientes que tienen consulta programada y aplicar filtro de búsqueda
  const filteredPatients = scheduledConsultas.filter(
    (cita) =>
      cita.patientUser.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cita.patientUser.lastname.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Asociar consultas a los pacientes
  // const patientsWithConsultas = filteredPatients.map((paciente) => {
  //     const consulta = scheduledConsultas.find(
  //         (consulta) =>
  //             consulta.patient === paciente.id &&
  //             consulta.typeOfMedicalConsultation === 1
  //     );
  //     return { ...paciente, consulta };
  // });

  // Ordenar pacientes si es necesario
  const sortedPatients = isSorted
    ? [...scheduledConsultas].sort((a, b) => a.name.localeCompare(b.name))
    : scheduledConsultas;

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

  if (consultas.length === 0) {
    if (scheduledConsultas.length === 0) {
      return "No existen consultas registradas";
    }
    return <MensajeSkeleton />;
  }
  const handleReviewClick = (patient) => {
    setIsReviewModalOpen(true);
    setSelectedPatient(patient);
  };
  console.log(scheduledConsultas);

  return (
    <div className="h-full text-[#686868] w-full flex flex-col overflow-y-auto md:overflow-y-hidden">
      <title>{lastSegmentTextToShow}</title>
      <div className="flex justify-between items-center border-b border-b-[#cecece] px-4 py-2">
        {/* <button
                    className="flex px-6 py-2 rounded-xl gap-1 items-center bg-[#487FFA]"
                    onClick={handleSortClick}>
                    <p className="text-base font-bold leading-5 text-white text-start">Ordenar</p>
                    <IconOrder />
                </button> */}

        <Link href={`${rutas.Doctor}${rutas.Consultas}${rutas.Teleconsulta}`}>
          <button className="flex px-3 md:px-6 py-2 rounded-xl gap-1 items-center bg-[#487FFA]">
            <p className="text-sm font-bold leading-5 text-white text-start md:text-base">
              Teleconsultas
            </p>
          </button>
        </Link>
        <h1 className="font-bold md:text-xl">Consultas</h1>
        <Link href={`${rutas.Doctor}${rutas.Consultas}${rutas.Historial}R`}>
          <button className="flex px-3 md:px-6 py-1 rounded-xl gap-1 items-center border-solid border-[#487FFA] border-2 bg-white">
            <IconFolder className="h-6" />
            <p className="text-start text-[#487FFA] font-bold text-sm md:text-base leading-5">
              Pasadas
            </p>
          </button>
        </Link>
        {/* <FiltroDocPacientes
                    onClickSort={handleSortClick}
                    onClickFilter={handleRiskFilterClick}
                    isOpen={isFilterOpen}
                    toggleMenu={toggleFilterMenu}
                /> */}
      </div>
      <div className="items-start justify-center w-full md:overflow-y-auto">
        {filteredPatients?.map((paciente) => (
          <PatientCardConsulta
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
                        label: "Realizar consulta",
                        icon: <IconPersonalData />,
                        href: `${rutas.Doctor}${rutas.Consultas}/${paciente.patient}`,
                      },
                    ],
                  },
                ]}
              />
            }
          />
        ))}
      </div>
      {isReviewModalOpen && (
        <ReviewModalApte
          onClose={() => setIsReviewModalOpen(false)}
          id={selectedPatient.id}
        />
      )}
    </div>
  );
}

// {filteredPatients?.map(paciente => (
//     <div key={paciente.id} className="flex justify-between w-full border-b border-b-[#cecece] px-6 py-2 items-center " >
//         <div className="flex items-center gap-3">
//             {/* <Image
//                 src={
//                     paciente.risk === 'alto' ? riesgoRojo :
//                         paciente.risk === 'medio' ? riesgoAmarillo :
//                             paciente.risk === 'bajo' ? riesgoVerde :
//                                 ""
//                 }
//                 alt="Punto de color"
//             /> */}
//             <div className="flex items-center justify-center w-12 h-12">
//                 <img src={paciente.avatar} alt="" className="object-cover w-12 h-12 rounded-3xl " />
//             </div>
//             <p className="text-start text-[#686868] font-normal text-base leading-6">{paciente.name} {paciente.lastname}</p>
//             {/* Aquí puedes agregar más elementos del paciente */}
//             <Image src={ruteActual} alt="" />
//             <p className="text-start text-[#686868] font-normal text-base leading-6">{paciente.last_login}</p>
//         </div>
//         <details className="relative">
//             <summary className="flex px-6 py-2  text-white bg-[#487FFA] rounded-xl gap-1 items-center cursor-pointer">
//                 <Image src={opciones} alt="Opciones" />
//                 <p className="text-base font-bold leading-5 text-white text-start">Opciones</p>
//             </summary>
//             <ul className="absolute bg-white z-50 p-2 text-start text-[#686868] font-normal text-base leading-6 w-64 right-0 border-2 border-[#D7D7D7] rounded-lg gap-4 mt-2 shadow-lg">
//                 <li className='flex items-center gap-2 ml-6 text-base font-normal leading-8'>
//                     <Link className='flex items-center gap-2' href={`${rutas.Doctor}${rutas.Pacientes}/${paciente.id}`}>
//                         Dejar review
//                     </Link>
//                 </li>
//                 <li className='flex items-center gap-2 ml-6 text-base font-normal leading-8'>
//                     <Link className='flex items-center gap-2' href={`${rutas.Doctor}${rutas.Historial}/${paciente.id}`}>
//                         Ver  consultas
//                     </Link>
//                 </li>
//             </ul>
//         </details>
//     </div>

// ))}
