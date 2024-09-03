"use client";

import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setSearchTerm } from "@/redux/slices/doctor/allPatients";
import rutas from "@/utils/rutas";
import Cookies from "js-cookie";
import Link from "next/link";
import { PathnameShow } from "@/components/pathname/path";
import MenuDropDown from "@/components/dropDown/MenuDropDown";
import IconCorazonMini from "@/components/icons/iconCorazon";
import IconPersonalData from "@/components/icons/IconPersonalData";
import ReviewModalApte from "@/components/modal/ReviewModalApte";
import IconRegresar from "@/components/icons/iconRegresar";
import IconOptions from "@/components/icons/IconOptions";
import IconDelete from "@/components/icons/IconDelete";
import Swal from "sweetalert2";
import { ApiSegimed } from "@/Api/ApiSegimed";
import { setSearchBar } from "@/redux/slices/user/searchBar";
import { useRouter } from "next/navigation";
import DynamicTable from "@/components/table/DynamicTable";

export default function HomeDoc() {
  const token = Cookies.get("a");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [riskFilter, setRiskFilter] = useState("");
  const [isSorted, setIsSorted] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [consultas, setConsultas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const currentDate = new Date();
  // Obtener consultas
  const getSchedulesByUserId = async () => {
    try {
      const response = await ApiSegimed.get("/schedulesByUserId");
      setConsultas(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    try {
      setIsLoading(true);
      getSchedulesByUserId();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Obtener pacientes del estado
  const searchTerm = useAppSelector((state) => state.allPatients.searchTerm);

  useEffect(() => {
    dispatch(setSearchBar(true));
    return () => {
      dispatch(setSearchBar(false));
    };
  }, [dispatch]);

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
    (consulta) => consulta.schedulingStatus !== 1
  );
  const sortedConsultas = [...scheduledConsultas]
    .sort((a, b) => {
      //el que mas se acerca a la fecha actual
      const diffA = Math.abs(new Date(a.scheduledStartTimestamp) - currentDate);
      const diffB = Math.abs(new Date(b.scheduledStartTimestamp) - currentDate);
      return diffA - diffB;
    })
    .filter((cita) => cita.schedulingStatus === 2 && cita.IsApproved == true);

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
    const consultationDate = new Date(timestamp);
    const differenceInHours = (currentDate - consultationDate) / 1000 / 3600;
    return differenceInHours < 24;
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
        text: "Una vez emilinada no podras recuperar esta informacion!",
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
          console.log(data);
          swalWithBootstrapButtons.fire({
            title: "Eliminada!",
            icon: "success",
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Concelado!",
            icon: "error",
          });
        }
      });
  };
  const handleCokiePatient = (schedule, id, idEvent) => {
    Cookies.set("patientId", id, { expires: 7 });
    Cookies.set("medicalEventId", idEvent, { expires: 7 });
    router.push(`${rutas.Doctor}${rutas.Consultas}/${schedule}`);
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
  const PasadasDropdown = (row) => {
    return (
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
                onClick: () => handleReviewClick(row),
              },
              isLessThan24HoursAgo(row.scheduledEndTimestamp) && {
                label: "Ver consultas",
                icon: <IconPersonalData />,
                onClick: () =>
                  handleCokiePatient(row.id, row.patient, row.medicalEvent.id),
              },
              isLessThan24HoursAgo(row?.scheduledEndTimestamp) && {
                label: "Eliminar consulta",
                icon: <IconDelete color="#B2B2B2" />,
                onClick: () => handleDeleteClick(row),
              },
            ], // Elimina los valores nulos
          },
        ]}
      />
    );
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
        <DynamicTable
          columns={columns}
          rows={sortedConsultas}
          renderDropDown={PasadasDropdown}
          showRisks={true}
        />
        {isReviewModalOpen && (
          <ReviewModalApte
            onClose={() => setIsReviewModalOpen(false)}
            id={selectedPatient.id}
          />
        )}
      </div>
    </div>
  );
}
