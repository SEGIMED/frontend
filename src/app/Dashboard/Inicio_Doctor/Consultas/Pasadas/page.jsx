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
import IconOptions from "@/components/icons/IconOptions";
import IconDelete from "@/components/icons/IconDelete";
import Swal from "sweetalert2";
import { ApiSegimed } from "@/Api/ApiSegimed";

export default function HomeDoc() {
  const token = Cookies.get("a");
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
  /*const sortedPatients = isSorted
    ? [...filteredPatients].sort((a, b) =>
        a.patientUser.name.localeCompare(b.patientUser.name)
      )
    : filteredPatients;*/ // dejo este codigo pero no lo uso - ordeno a los pacientes por fecha

    const sortedPatients = filteredPatients.sort((a, b) => 
      new Date(b.scheduledEndTimestamp) - new Date(a.scheduledEndTimestamp)
    );
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
  const isLessThan24HoursAgo = (timestamp) => {
    const currentDate = new Date();
    const consultationDate = new Date(timestamp);
    const differenceInHours = (currentDate - consultationDate) / 1000 / 3600;
    return differenceInHours < 24;
  };

  const handleDeleteClick = (patient) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: true
    });
    swalWithBootstrapButtons.fire({
      title: "Eliminar consulta con el paciente: " + patient.patientUser.name + " " + patient.patientUser.lastname,
      text: "Una vez emilinada no podras recuperar esta informacion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "No, cancelar!",
      reverseButtons: true
    }).then(async(result) => {
      if (result.isConfirmed) {
        // falta agregar el numero 5 de eliminado en el catalogo
        const data = await ApiSegimed.patch(`/schedule/${patient.id}`, { schedulingStatus: 5 }, { headers: { token: token } });
        console.log(data);
        swalWithBootstrapButtons.fire({
          title: "Eliminada!",
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Concelado!",
          icon: "error"
        });
      }
    });
  };

  return (
    <div className="h-full text-[#686868] w-full flex flex-col overflow-y-auto md:overflow-y-hidden">
      <title>{lastSegmentTextToShow}</title>
      <div className="flex flex-col w-full h-full">
        <div className="w-full flex justify-between px-2 items-center border-b gap-3 bg-white border-b-[#cecece] pb-2 pt-2">
          {/* <Ordenar /> */}
          <div></div>
          <h1 className="hidden font-bold md:text-xl md:block">Pasadas</h1>
          <div className="flex gap-3">
            {/* <Link href={`${rutas.Doctor}${rutas.Historial}${rutas.Teleconsulta}`}>
              <button className="flex px-3 md:px-6 py-2 rounded-xl gap-1 items-center border-solid border-[#487FFA] border-2 bg-white">
                <p className="text-start text-[#487FFA] font-bold text-sm md:text-base leading-5">
                  Teleconsultas
                </p>
              </button>
            </Link> */}
            <Link href={`${rutas.Doctor}${rutas.Historial}`}>
              <button className="flex px-3 md:px-6 py-2 rounded-xl gap-1 items-center border-solid bg-[#487FFA] border-2 ">
                <IconRegresar />
                <p className="text-sm font-bold leading-5 text-white text-start md:text-base">
                  Regresar
                </p>
              </button>
            </Link>
          </div>
        </div>
        <div className="h-full md:overflow-y-auto">
          <div className="w-[100%] bg-white border-b border-b-[#cecece] flex">
            <div className="w-[10%] md:w-[5%] md:block"></div>
            <div className="grid w-[70%] md:w-[75%] text-center items-center leading-6 text-base font-normal gap-3 grid-cols-3 md:text-start md:grid-cols-4 py-2 z-10">
              <p className="text-[#5F5F5F]">Nombre</p>
              <p className="text-[#5F5F5F]">Fecha </p>
              {/* <p className="text-[#5F5F5F] hidden md:block">Grupo HTP</p> */}
              <p className="text-[#5F5F5F] ">Centro de atencion</p>
              <p className="text-[#5F5F5F] hidden md:block">
                Motivo de consulta
              </p>
            </div>
          </div>
          {isLoading ? (
            <SkeletonList count={9} />
          ) : filteredPatients.length === 0 ? (
            <NotFound
              text="No hay historial de consultas."
              sizeText="w-[100%]"
            />
          ) : (
            <div className="items-start justify-center w-full md:overflow-y-auto">
              {sortedPatients?.map((paciente) => (
                console.log(paciente),
                <PatientCardConsulta1
                  key={paciente.id}
                  paciente={paciente}
                  consulta={paciente.consulta}
                  button={
                    <MenuDropDown
                      label={"Mas"}
                      icon={<IconOptions color="white" />}
                      categories={[
                        {
                          title: "Opciones",
                          items: [
                            {
                              label: "Dejar Review",
                              icon: <IconCorazonMini />,
                              onClick: () => handleReviewClick(paciente),
                            },
                            isLessThan24HoursAgo(paciente.scheduledEndTimestamp) && {
                              label: "Ver consultas",
                              icon: <IconPersonalData />,
                              href: `${rutas.Doctor}${rutas.Historial}/${paciente.patient}`,
                            },
                            isLessThan24HoursAgo(paciente.scheduledEndTimestamp) && {
                              label: "Eliminar consulta",
                              icon: <IconDelete color="#B2B2B2"/>,
                              onClick: () => handleDeleteClick(paciente),
                            },
                          ].filter(Boolean), // Elimina los valores nulos
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
