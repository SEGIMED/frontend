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
import IconArrowLeft from "@/components/icons/IconArrowLeft";
import ModalConsultation from "@/components/modal/ModalDoctor/ModalConsultation";

export default function Page() {
  const token = Cookies.get("a");
  const dispatch = useAppDispatch();
  const [scheduledConsultas, setScheduledConsultas] = useState([]);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [selectedConsulta, setSelectedConsulta] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(setSearchBar(true));
    return () => {
      dispatch(setSearchBar(false));
    };
  }, [dispatch]);
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

  useEffect(() => {
    dispatch(setSearchTerm(""));
  }, [dispatch]);
  const handleCloseModal = async () => {
    setIsConsultationModalOpen(false);
    await getSchedulesByUserId();
  };
  //ordenamiento por fecha desde el front por ahora
  const sortedConsultas = [...scheduledConsultas]
    .sort((a, b) => {
      //el que mas se acerca a la fecha actual
      const diffA = Math.abs(new Date(a.scheduledStartTimestamp) - currentDate);
      const diffB = Math.abs(new Date(b.scheduledStartTimestamp) - currentDate);
      return diffA - diffB;
    })
    .filter((cita) => cita.schedulingStatus === 1 && cita.IsApproved === false);

  const lastSegmentTextToShow = PathnameShow();

  const handleShowConsultaModal = (consulta) => {
    console.log(consulta);
    setIsConsultationModalOpen(true);
    setSelectedConsulta(consulta);
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
                label: "Ver detalles",
                icon: <IconPersonalData />,
                onClick: () => handleShowConsultaModal(row),
              },
            ],
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
          <Elboton
            nombre={"Regresar"}
            onPress={() => router.back()}
            icon={<IconArrowLeft iconColor={"white"} />}
          />
          <h1 className="hidden font-bold md:text-xl md:block">Pendientes</h1>
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
        <DynamicTable
          columns={columns}
          rows={sortedConsultas}
          renderDropDown={renderDropDown}
          showRisks={true}
          loading={loading}
          textError={"No tiene consultas pendientes"}
        />
      </div>
      {isConsultationModalOpen && (
        <ModalConsultation
          isOpen={isConsultationModalOpen}
          readOnly={true}
          consulta={selectedConsulta}
          onClose={handleCloseModal}
          approveButtons={true}
        />
      )}
    </div>
  );
}
