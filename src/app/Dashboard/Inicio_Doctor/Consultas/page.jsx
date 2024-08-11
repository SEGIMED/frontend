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
import DynamicTable from "@/components/table/DynamicTable";
import IconConsulta from "@/components/icons/IconConsulta";
import IconAccion from "@/components/icons/IconAccion";

export default function HomeDoc() {
  const token = Cookies.get("a");
  const dispatch = useAppDispatch();
  const [scheduledConsultas, setScheduledConsultas] = useState([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
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
  const router = useRouter();
  // Obtener pacientes del estado
  const searchTerm = useAppSelector((state) => state.allPatients.searchTerm);
  router.push(`/Dashboard/Inicio_Doctor/Consultas`);

  useEffect(() => {
    dispatch(setSearchTerm(""));
  }, [dispatch]);

  //ordenamiento por fecha desde el front por ahora
  const sortedConsultas = [...scheduledConsultas]
    .sort((a, b) => {
      //el que mas se acerca a la fecha actual
      const diffA = Math.abs(new Date(a.scheduledStartTimestamp) - currentDate);
      const diffB = Math.abs(new Date(b.scheduledStartTimestamp) - currentDate);
      return diffA - diffB;
    })
    .filter((cita) => cita.schedulingStatus === 1 && cita.IsApproved === true);

  const lastSegmentTextToShow = PathnameShow();

  const handleReviewClick = (consulta) => {
    setIsReviewModalOpen(true);
    setSelectedPatientId(consulta?.patient);
  };
  const handleCokiePatient = (schedule, id, idEvent) => {
    Cookies.set("patientId", id, { expires: 7 });
    Cookies.set("medicalEventId", idEvent, { expires: 7 });
    router.push(`${rutas.Doctor}${rutas.Consultas}/${schedule}`);
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
  const columns = [
    {
      label: "Nombre",
      key: "patientUser.name",
      showMobile: true,
      width: "w-8",
    },
    {
      label: "Fecha",
      key: "scheduledStartTimestamp",
      showMobile: true,
      width: "w-8",
    },
    {
      label: "Centro de atencion",
      key: "healthCenter",
      showMobile: true,
      width: "w-16",
    },
    {
      label: "Motivo de consulta",
      key: "reasonForConsultation",
      showMobile: false,
      width: "w-16",
    },
  ];
  const renderDropDown = (row) => {
    return (
      <MenuDropDown
        label="Mas"
        icon={<IconOptions color="white" />}
        categories={[
          {
            title: "Opciones",
            items: [
              {
                label: "Dejar Review",
                icon: <IconCorazonMini />,
                onClick: () => handleReviewClick(row),
              },
              {
                label: "Ver consultas",
                icon: <IconPersonalData />,
                onClick: () =>
                  handleCokiePatient(row.id, row.patient, row.medicalEvent.id),
              },
              {
                label: "Eliminar consulta",
                icon: <IconDelete color="#B2B2B2" />,
                onClick: () => handleDeleteClick(row),
              },
            ].filter(Boolean),
          },
        ]}
        className={"w-[40px] md:w-full lg:w-fit mx-auto"}
      />
    );
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
            <Link href={`${rutas.Doctor}${rutas.Historial}${rutas.Teleconsulta}`}>
              <button className="flex px-3 md:px-6 py-2 rounded-xl gap-1 items-center border-solid border-[#487FFA] border-2 bg-white">
                <p className="text-start text-[#487FFA] font-bold text-sm md:text-base leading-5">
                  Teleconsultas
                </p>
              </button>
            </Link>
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
        <DynamicTable
          columns={columns}
          rows={sortedConsultas}
          renderDropDown={renderDropDown}
          showRisks={true}
        />
        {isReviewModalOpen && (
          <ReviewModalApte
            onClose={() => setIsReviewModalOpen(false)}
            id={selectedPatientId}
          />
        )}
      </div>
    </div>
  );
}
