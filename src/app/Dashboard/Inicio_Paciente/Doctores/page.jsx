"use client";
import OpcionesDocCard from "@/components/Buttons/opcionesDocCard";
import DoctorCard from "@/components/card/doctorCard";
import ModalDetailDoctor from "@/components/modal/ModalPatient/ModalDetailDoctor";
import ModalConsultation from "@/components/modal/ModalDoctor/ModalConsultation";
import { useState, useEffect } from "react";
import config from "@/components/localData/localdata";
import MensajeSkeleton from "@/components/skeletons/MensajeSkeleton";
import { setSearchTerm1 } from "@/redux/slices/doctor/allDoctores";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Cookies from "js-cookie";
import { ApiSegimed } from "@/Api/ApiSegimed.js";
import IconPrev from "@/components/icons/IconPrev";
import IconNext from "@/components/icons/IconNext";
import FiltrosPaciente from "@/components/Buttons/FiltrosPaciente";
import Ordenar from "@/components/Buttons/Ordenar";
import MenuDropDown from "@/components/dropDown/MenuDropDown";
import IconMiniCalendar from "@/components/icons/IconMiniCalendar";
import IconPersonalData from "@/components/icons/IconPersonalData";
import IconMessages from "@/components/icons/IconMessages";
import rutas from "@/utils/rutas";
import ModalModularizado from "@/components/modal/ModalPatient/ModalModurizado";
import DoctorAsociado from "@/components/modal/ModalPatient/modalDoctorAsociation";
import IconOptions from "@/components/icons/IconOptions";

export default function DoctoresPte() {
  const searchTerm1 = useAppSelector((state) => state.doctores.searchTerm1);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(
    (state) => state.doctores.doctores.length === 0
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [isSorted, setIsSorted] = useState(false);
  const [selectedDoctorName, setSelectedDoctorName] = useState("");
  const patientId = config.c;
  const [pagination, setPagination] = useState({
    totalUsers: 0,
    totalPages: 0,
    currentPage: 1,
  });

  const token = Cookies.get("a");

  useEffect(() => {
    dispatch(setSearchTerm1(""));
  }, [dispatch]);

  const fetchDoctors = async (searchTerm = "") => {
    try {
      const response = await ApiSegimed.get(
        `/all-physicians?page=${pagination.currentPage}&limit=7&name=${searchTerm}`,
        { headers: { token: token } }
      );
      if (response.data) {
        setDoctors(response.data.user);
        setPagination((prev) => ({
          ...prev,
          totalUsers: response.data.totalUsers,
          totalPages: response.data.totalPages,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDoctors();
    }
  }, [pagination.currentPage, token]);

  useEffect(() => {
    if (token) {
      fetchDoctors(searchTerm1);
      setPagination((prev) => ({
        ...prev,
        currentPage: 1,
      }));
    }
  }, [searchTerm1, token]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({
        ...prev,
        currentPage: newPage,
      }));
    }
  };

  const openModal = (doctorId, type, doctorName) => {
    setSelectedDoctorId(doctorId);
    setSelectedDoctorName(doctorName);
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDoctorId(null);
    setSelectedDoctorName("");
    setModalType(null);
    setIsModalOpen(false);
  };

  const handleConsultationClick = (doctorId) => {
    openModal(doctorId, "consultation");
  };

  const handleAssociateClick = (doctorId, doctorName, doctorLastname) => {
    openModal(doctorId, "associate", `${doctorName} ${doctorLastname}`);
  };

  const handleViewDetail = (doctorId) => {
    openModal(doctorId, "detail");
  };

  const toggleFilterMenu = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleSortClick = () => {
    setIsSorted(!isSorted);
  };

  if (isLoading) {
    return <MensajeSkeleton />;
  }

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex md:h-[8%] h-[5%] items-center justify-center border-b border-b-[#cecece] px-6">
        <div className="text-xl font-bold">Lista de Doctores</div>
        <div></div>
      </div>
      <div className="md:h-[92%] h-[95%] w-full overflow-y-auto">
        {doctors?.map((doctor) => (
          <DoctorCard
           
            key={doctor.id}
            doctor={doctor}
            button={
              <MenuDropDown
                icon={<IconOptions color="white"/>}
                label="Opciones"
                categories={[
                  {
                    title: "Acciones",
                    items: [
                      {
                        label: "Solicitar asociarse",
                        icon: <IconMiniCalendar />,
                        onClick: () =>
                          handleAssociateClick(
                            doctor.id,
                            doctor.name,
                            doctor.lastname
                          ),
                      },
                      {
                        label: "Solicitar Consulta",
                        icon: <IconMiniCalendar />,
                        onClick: () =>
                          handleConsultationClick(
                            doctor.id
                          ),
                      },
                    ],
                  },
                  {
                    title: "Información",
                    items: [
                      {
                        label: "Ver Detalles",
                        icon: <IconPersonalData />,
                        onClick: () =>
                          handleViewDetail(
                            doctor.id
                          ),
                      },
                      {
                        label: "Ver Mensajes",
                        icon: <IconMessages />,
                        href: `${rutas.PacienteDash}${rutas.Mensajes}`,
                      },
                    ],
                  },
                ]}
              />
            }
          />
        ))}
      </div>
      <div className="flex justify-center items-center gap-5 p-3 bg-[#FAFAFC] font-bold">
        <button
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          disabled={pagination.currentPage === 1}
          className="w-36 h-10 bg-white border border-[#D7D7D7] rounded-xl flex items-center justify-center gap-4 transition duration-300 ease-in-out transform active:scale-100 disabled:opacity-60">
          <IconPrev /> Anterior
        </button>
        <p className=" w-14">
          {pagination.currentPage} de {pagination.totalPages}
        </p>
        <button
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={pagination.currentPage === pagination.totalPages}
          className="w-36 h-10 bg-white border border-[#D7D7D7] rounded-xl flex items-center justify-center gap-4 transition duration-300 ease-in transform active:scale-100 disabled:opacity-60">
          Siguiente
          <IconNext />
        </button>
      </div>
      {isModalOpen && modalType === "detail" && (
        <ModalDetailDoctor
          isOpen={isModalOpen}
          onClose={closeModal}
          doctorId={selectedDoctorId}
        />
      )}
      {isModalOpen && modalType === "consultation" && (
        <ModalConsultation
          isOpen={isModalOpen}
          onClose={closeModal}
          patientId={patientId}
          doctorId={selectedDoctorId}
        />
      )}
      {isModalOpen && modalType === "associate" && (
        <ModalModularizado
          isOpen={isModalOpen}
          onClose={closeModal}
          Modals={[
            <DoctorAsociado key={"solicitar asociacion"}
              name={selectedDoctorName}
            />,
          ]}
          title={"Solicitar asociarse"}
          button1={"hidden"}
          button2={"bg-greenPrimary block"}
          progessBar={"hidden"}
          size={"h-[21rem] md:h-[17rem] md:w-[35rem]"}
          buttonText={{ end: `Enviar solicitud` }}
        />
      )}
    </div>
  );
}
