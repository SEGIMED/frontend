"use client";
import OpcionesDocCard from "@/components/Buttons/opcionesDocCard";

import DoctorCard from "@/components/card/doctorCard";
import ModalDetailDoctor from "@/components/modal/ModalPatient/ModalDetailDoctor";
import ModalConsultation from "@/components/modal/ModalDoctor/ModalConsultation";
import { useState, useEffect } from "react";
import FiltrosPaciente from "@/components/Buttons/FiltrosPaciente";
import Ordenar from "@/components/Buttons/Ordenar";
import config from "@/components/localData/localdata";
import MensajeSkeleton from "@/components/skeletons/MensajeSkeleton";
import { setSearchTerm1 } from "@/redux/slices/doctor/allDoctores";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import IconMessages from "@/components/icons/IconMessages";
IconMessages;

export default function DoctoresPte() {
  const doctores = useAppSelector((state) => state.doctores.doctores);
  const searchTerm1 = useAppSelector((state) => state.doctores.searchTerm1);
  const dispatch= useAppDispatch()
  const isLoading = useAppSelector(
    (state) => state.doctores.doctores.length === 0
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedModal, setSelectedModal] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const patientId = config.c;

  useEffect(() => {
    dispatch(setSearchTerm1(""));
  }, [dispatch]);

  const filteredDoctor = doctores?.filter(
    (doc) =>
      (doc.name.toLowerCase().includes(searchTerm1.toLowerCase()) ||
        doc.lastname.toLowerCase().includes(searchTerm1.toLowerCase()))
  );

  const sortedDoctor = isSorted
    ? [...filteredDoctor].sort((a, b) => a.name.localeCompare(b.name))
    : filteredDoctor;

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
      <div className="flex  md:h-[8%] h-[5%] items-center justify-center border-b border-b-[#cecece] px-6 ">
        {/* <FiltrosPaciente
                    isOpen={isFilterOpen}
                    toggleMenu={toggleFilterMenu}
                    onClickSort={handleSortClick}
                />
                <Ordenar /> */}
        <div className="text-xl font-bold">Lista de Doctores</div>
      </div>
      <div className="md:h-[92%] h-[95%] w-full overflow-y-auto">
        {sortedDoctor?.map((doctor) => (
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
