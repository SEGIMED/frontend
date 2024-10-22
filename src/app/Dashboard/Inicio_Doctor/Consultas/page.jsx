"use client";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setSearchTerm } from "@/redux/slices/doctor/allPatients";
import rutas from "@/utils/rutas";
import IconFolder from "@/components/icons/iconFolder";
import Cookies from "js-cookie";
import Link from "next/link";
import { PathnameShow } from "@/components/pathname/path";
import MenuDropDown from "@/components/dropDown/MenuDropDown";
import IconCorazonMini from "@/components/icons/iconCorazon";
import IconPersonalData from "@/components/icons/IconPersonalData";
import ReviewModalApte from "@/components/modal/ReviewModalApte";
import IconOptions from "@/components/icons/IconOptions";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import IconDelete from "@/components/icons/IconDelete";
import { ApiSegimed } from "@/Api/ApiSegimed";
import DynamicTable from "@/components/table/DynamicTable";
import { setSearchBar } from "@/redux/slices/user/searchBar";
import IconCheckBoton from "@/components/icons/iconCheckBoton";
import Elboton from "@/components/Buttons/Elboton";
import IconSignoExclamacion from "@/components/icons/IconSignoExclamacion";
import IconMas from "@/components/icons/iconMas";
import ModalConsultationCalendar from "@/components/modal/ModalDoctor/ModalConsultationCalendar";
import IconClinicalHistory from "@/components/icons/IconClinicalHistory";

export default function HomeDoc() {
  const token = Cookies.get("a");
  const dispatch = useAppDispatch();
  const [scheduledConsultas, setScheduledConsultas] = useState([]);
  const [reload, setReload] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [showModalConsultation, setShowModalConsultation] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(setSearchBar(true));
    return () => {
      dispatch(setSearchBar(false));
    };
  }, [dispatch]);
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

  useEffect(() => {
    try {
      if (reload) getSchedulesByUserId();
      setReload(false);
    } catch (error) {
      console.log(error);
    }
  }, [reload]);

  // Obtener consultas del estado
  const router = useRouter();
  // Obtener pacientes del estado
  const searchTerm = useAppSelector((state) => state.allPatients.searchTerm);
  router.push(`/Dashboard/Inicio_Doctor/Consultas`);

  useEffect(() => {
    dispatch(setSearchTerm(""));
  }, [dispatch]);

  const consultasToAprove = scheduledConsultas.filter(
    (consulta) =>
      consulta.IsApproved === false && consulta.schedulingStatus == 1
  );
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
    Cookies.set("patientId", id);
    Cookies.set("medicalEventId", idEvent);
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
          "Cancelar consulta con el paciente: " +
          patient.patientUser.name +
          " " +
          patient.patientUser.lastname,
        text: "Una vez cancelada no podrás revertir esta acción",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si",
        cancelButtonText: "No",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          // falta agregar el numero 5 de eliminado en el catalogo
          await ApiSegimed.patch(
            `/schedule/${patient.id}`,
            { schedulingStatus: 5 },
            { headers: { token: token } }
          );
          swalWithBootstrapButtons.fire({
            title: "Cancelada!",
            text:
              "La consulta con el paciente: " +
              patient.patientUser.name +
              " " +
              patient.patientUser.lastname +
              " ha sido cancelada.",
            icon: "success",
          });
        }
      });
  };
  const columns = [
    {
      label: "Paciente",
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
                label: "Atender consulta",
                icon: <IconPersonalData />,
                onClick: () =>
                  handleCokiePatient(row.id, row.patient, row.medicalEvent.id),
              },
              {
                label: "Ver historia clínica",
                icon: <IconClinicalHistory />,
                href: `${rutas.Doctor}${rutas.Pacientes}${rutas.Historia_Clinica}/${row.patient}`,
              },
              {
                label: "Dejar Review",
                icon: <IconCorazonMini />,
                onClick: () => handleReviewClick(row),
              },
              {
                label: "Cancelar consulta",
                icon: <IconDelete color="#B2B2B2" />,
                onClick: () => handleDeleteClick(row),
              },
            ],
          },
        ]}
        className={"w-[40px] md:w-full lg:w-fit mx-auto"}
      />
    );
  };

  const PendientComponent = () => (
    <div className="flex flex-row justify-between items-center">
      <div className="flex items-center gap-4 px-1 lg:px-0">
        <IconSignoExclamacion className={"w-8 lg:w-6"} />
        <p className="text-redPrimary text-md lg:text-lg">
          Tienes {consultasToAprove.length} consultas pendientes de aprobación
        </p>
      </div>
      <Elboton
        nombre={"Ver pendientes"}
        href={`${rutas.Doctor}${rutas.Consultas}/Pendientes`}
        className={"border-redPrimary border-1 bg-white"}
        classNameText={"text-redPrimary px-1"}
      />
    </div>
  );

  return (
    <div className="h-full text-[#686868] w-full flex flex-col overflow-y-auto md:overflow-y-hidden">
      <title>{lastSegmentTextToShow}</title>
      <div className="flex flex-col w-full h-full">
        <div className="w-full flex justify-center md:justify-between px-2 items-center border-b gap-3 bg-white border-b-[#cecece] pb-2 pt-2">
          {/* <Ordenar /> */}
          <div></div>

          <h1 className="hidden font-bold md:text-xl md:block">Proximas</h1>
          <div className="flex gap-3 pr-14">
            {/* <Link href={`${rutas.Doctor}${rutas.Historial}${rutas.Teleconsulta}`}>
              <button className="flex px-3 md:px-6 py-2 rounded-lg gap-1 items-center border-solid border-[#487FFA] border-2 bg-white">
                <p className="text-start text-[#487FFA] font-bold text-sm md:text-base leading-5">
                  Teleconsultas
                </p>
              </button>
            </Link> */}
            <button
              onClick={() => setShowModalConsultation(true)}
              className={` bg-white text-bluePrimary  border-bluePrimary md:px-4 md:py-2 py-2 px-2 items-center flex rounded-lg border gap-2 w-fit transition duration-300 ease-in-out`}>
              <IconMas color={"#487ffa"} />
              <p
                className={` text-bluePrimary
                         font-bold `}>
                Nueva consulta
              </p>
            </button>
            <Link href={`${rutas.Doctor}${rutas.Historial}${rutas.Pasadas}`}>
              <button className="flex px-3 md:px-6 py-2 rounded-lg gap-1 items-center border-solid border-[#487FFA] border-2 bg-white">
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
          textError={"No tiene consultas próximas"}
          firstRowComponent={
            consultasToAprove?.length > 0 && <PendientComponent />
          }
          loading={loading}
        />
        {isReviewModalOpen && (
          <ReviewModalApte
            onClose={() => setIsReviewModalOpen(false)}
            id={selectedPatientId}
          />
        )}
        {showModalConsultation && (
          <ModalConsultationCalendar
            setReload={setReload}
            isOpen={showModalConsultation}
            onClose={() => setShowModalConsultation(false)}
          />
        )}
      </div>
    </div>
  );
}
