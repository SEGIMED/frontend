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

export default function DoctoresPte() {
  const searchTerm1 = useAppSelector((state) => state.doctores.searchTerm1);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.doctores.doctores.length === 0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedModal, setSelectedModal] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [isSorted, setIsSorted] = useState(false);
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
      }))

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

  const handleViewDetail = (doctorId) => {
    setIsDetailModalOpen(true);
    setSelectedDoctorId(doctorId);
    setSelectedModal("detail");
  };

  const openModal = (doctorId) => {
    setIsModalOpen(true);
    setSelectedDoctorId(doctorId);
    setSelectedModal("consultation");
  };

  const handleConsultationClick = (doctorId) => {
    handleViewDetail(doctorId);
    openModal(doctorId);
  };

  const toggleFilterMenu = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleSortClick = () => {
    setIsSorted(!isSorted);
  };

  const closeModal = () => {
    setSelectedDoctorId(null);
    if (selectedModal === "detail") {
      setIsDetailModalOpen(false);
    } else if (selectedModal === "consultation") {
      setIsModalOpen(false);
    }
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
              <OpcionesDocCard
                id={doctor.id}
                onDetailClick={handleViewDetail}
                onConsultationClick={() => handleConsultationClick(doctor.id)}
              />
            }
          />
        ))}
      </div>
      <div className="flex justify-center items-center gap-5 p-3 bg-[#FAFAFC] font-bold">
        <button
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          disabled={pagination.currentPage === 1}
          className="w-36 h-10 bg-white border border-[#D7D7D7] rounded-xl flex items-center justify-center gap-4 transition duration-300 ease-in-out transform active:scale-100 disabled:opacity-60"
        >
          <IconPrev /> Anterior
        </button>
        <p>{pagination.currentPage} de {pagination.totalPages}</p>
        <button
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={pagination.currentPage === pagination.totalPages}
          className="w-36 h-10 bg-white border border-[#D7D7D7] rounded-xl flex items-center justify-center gap-4 transition duration-300 ease-in transform active:scale-100 disabled:opacity-60"
        >
          Siguiente
          <IconNext />
        </button>
      </div>
      {selectedDoctorId && isDetailModalOpen && (
        <ModalDetailDoctor
          isOpen={isDetailModalOpen}
          onClose={closeModal}
          doctorId={selectedDoctorId}
        />
      )}
      <ModalConsultation
        isOpen={isModalOpen}
        onClose={closeModal}
        patientId={patientId}
        doctorId={selectedDoctorId}
      />
    </div>
  );
}
