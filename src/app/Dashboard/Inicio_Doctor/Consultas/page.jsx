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
import IconOptions from "@/components/icons/IconOptions";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import IconDelete from "@/components/icons/IconDelete";
import { ApiSegimed } from "@/Api/ApiSegimed";

export default function HomeDoc() {
  const token = Cookies.get("a");
  const dispatch = useAppDispatch();
  const [scheduledConsultas, setScheduledConsultas] = useState([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const consultas = useAppSelector((state) => state);
  const currentDate = new Date();

  const getSchedulesByUserId = async () => {
    try {
      const response = await ApiSegimed.get("/schedulesByUserId");
      setScheduledConsultas(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    try {
      setLoading(true);
      getSchedulesByUserId();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Obtener consultas del estado
  const myID = Number(Cookies.get("c")); // Obtener myID de las cookies
  const router = useRouter();
  // Obtener pacientes del estado
  const searchTerm = useAppSelector((state) => state.allPatients.searchTerm);
  router.push(`/Dashboard/Inicio_Doctor/Consultas`);

  useEffect(() => {
    dispatch(setSearchTerm(""));
  }, [dispatch]);

  // Filtrar pacientes que tienen consulta programada y aplicar filtro de búsqueda
  const filteredPatients = scheduledConsultas.filter(
    (cita) =>
      cita.patientUser.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cita.patientUser.lastname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //ordenamiento por fecha desde el front por ahora
  const sortedConsultas = [...scheduledConsultas]
    .sort((a, b) => {
      //el que mas se acerca a la fecha actual
      const diffA = Math.abs(new Date(a.scheduledStartTimestamp) - currentDate);
      const diffB = Math.abs(new Date(b.scheduledStartTimestamp) - currentDate);
      return diffA - diffB;
    })
    .filter((cita) => cita.schedulingStatus === 1);

  const lastSegmentTextToShow = PathnameShow();

  const handleReviewClick = (patient) => {
    setIsReviewModalOpen(true);
    setSelectedPatient(patient);
  };
  const handleCokiePatient = (schedule, id) => {
    Cookies.set("patientId", id, { expires: 7 }); // La cookie expirará en 7 días
    router.push(
      `${rutas.Doctor}${rutas.Consultas}/${schedule}?patientId=${id}`
    );
  };
  const handleDeleteClick = (patient) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: true,
    });
    swalWithBootstrapButtons
      .fire({
        title:
          "Eliminar consulta con el paciente: " +
          patient.patientUser.name +
          " " +
          patient.patientUser.lastname,
        text: "Una vez eliminada no podrás recuperar esta informacion!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          // falta agregar el numero 5 de eliminado en el catalogo
          const data = await ApiSegimed.patch(
            `/schedule/${patient.id}`,
            { schedulingStatus: 5 },
            { headers: { token: token } }
          );
          swalWithBootstrapButtons.fire({
            title: "Eliminado!",
            text:
              "La consulta con el paciente: " +
              patient.patientUser.name +
              " " +
              patient.patientUser.lastname +
              " ha sido eliminada.",
            icon: "success",
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelado",
            icon: "error",
          });
        }
      });
  };
  return (
    <div className="h-full text-[#686868] w-full flex flex-col overflow-y-auto md:overflow-y-hidden">
      <title>{lastSegmentTextToShow}</title>
      <div className="flex flex-col w-full h-full">
        <div className="w-full flex justify-center md:justify-between px-2 items-center border-b gap-3 bg-white border-b-[#cecece] pb-2 pt-2">
          {/* <Ordenar /> */}
          <div></div>

          <h1 className="hidden font-bold md:text-xl md:block">Proximas</h1>
          <div className="flex gap-3">
            {/* <Link href={`${rutas.Doctor}${rutas.Historial}${rutas.Teleconsulta}`}>
              <button className="flex px-3 md:px-6 py-2 rounded-xl gap-1 items-center border-solid border-[#487FFA] border-2 bg-white">
                <p className="text-start text-[#487FFA] font-bold text-sm md:text-base leading-5">
                  Teleconsultas
                </p>
              </button>
            </Link> */}
            <Link href={`${rutas.Doctor}${rutas.Historial}${rutas.Pasadas}`}>
              <button className="flex px-3 md:px-6 py-2 rounded-xl gap-1 items-center border-solid border-[#487FFA] border-2 bg-white">
                <IconFolder className="hidden h-6 md:block" />
                <p className="text-start text-[#487FFA] font-bold text-sm md:text-base leading-5">
                  Pasadas
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

          <div className="items-start justify-center w-full md:overflow-y-auto">
            {sortedConsultas.length === 0 && !loading && (
              <NotFound text="No hay consultas" />
            )}
            {loading && <SkeletonList count={9} />}
            {sortedConsultas?.map((consulta) => (
              <PatientCardConsulta1
                key={consulta.id}
                consulta={consulta}
                button={
                  <MenuDropDown
                    label={"Mas"}
                    icon={<IconOptions color="white" />}
                    categories={[
                      {
                        title: "Opciones",
                        icon: <IconOrder />,
                        items: [
                          {
                            label: "Dejar Review",
                            icon: <IconCorazonMini />,
                            onClick: () => handleReviewClick(consulta),
                          },
                          {
                            label: "Ver consultas",
                            icon: <IconPersonalData />,
                            onClick: () =>
                              handleCokiePatient(
                                consulta?.id,
                                consulta?.patient
                              ),
                          },
                          {
                            label: "Eliminar consulta",
                            icon: <IconDelete color="#B2B2B2" />,
                            onClick: () => handleDeleteClick(consulta),
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
      </div>
    </div>
  );
}
