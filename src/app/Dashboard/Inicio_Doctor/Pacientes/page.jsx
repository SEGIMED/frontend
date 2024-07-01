"use client";

import IconStar2 from "@/components/icons/IconStar2";

import IconPrev from "@/components/icons/IconPrev";
import IconNext from "@/components/icons/IconNext";
import riesgoRojo from "@/components/images/riesgoRojo.png";
import riesgoAmarillo from "@/components/images/riesgoAmarillo.png";
import riesgoVerde from "@/components/images/riesgoVerde.png";
import Segimed from "@/components/images/segimed.png";
import Image from "next/image";

import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  setSearchTerm,
  toggleFavorite,
} from "@/redux/slices/doctor/allPatients";
import ModalConsultation from "@/components/modal/ModalDoctor/ModalConsultation";
import OpcionesDocPacientes from "../../../../components/Buttons/OpcionesDocPacientes.jsx";
// import OpcionesDocPacientes from "@/components/Buttons/opcionesDocPacientes";
import FiltroDocPacientes from "@/components/Buttons/FiltrosDocPacientes";
import config from "@/components/localData/localdata";
import avatar from "@/utils/defaultAvatar";

export default function HomeDoc() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [riskFilter, setRiskFilter] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [openOptionsPatientId, setOpenOptionsPatientId] = useState(null);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const userId = config.c;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSearchTerm(""));
  }, [dispatch]);

  const listaPacientes = useAppSelector((state) => state.allPatients.patients);
  const searchTerm = useAppSelector((state) => state.allPatients.searchTerm);

  const filteredPatients = listaPacientes?.filter(
    (paciente) =>
      (paciente.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paciente.lastname.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (riskFilter ? paciente.risk === riskFilter : true)
  );

  const sortedPatients = isSorted
    ? [...filteredPatients].sort((a, b) => a.name.localeCompare(b.name))
    : filteredPatients;

  const openModal = (patientId) => {
    setIsModalOpen(true);
    setSelectedPatientId(patientId);
    setOpenOptionsPatientId(null);
    setIsFilterOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPatientId(null);
  };

  const handleSortClick = () => {
    setIsSorted(!isSorted);
  };

  const handleRiskFilterClick = (risk) => {
    setRiskFilter(risk);
  };

  const handleFavoriteClick = () => {
    setShowFavorites(!showFavorites);
    setOpenOptionsPatientId(null);
    setIsFilterOpen(false);
  };

  const handleToggleFavorite = (patientId) => {
    dispatch(toggleFavorite(patientId));
  };

  const toggleFilterMenu = () => {
    setIsFilterOpen(!isFilterOpen);
    setOpenOptionsPatientId(null);
  };

  const toggleOptionMenu = (patientId) => {
    setOpenOptionsPatientId(
      openOptionsPatientId === patientId ? null : patientId
    );
    setIsFilterOpen(false);
  };

  if (userId === null) {
    return <div>Loading...</div>;
  }

  const getRandomColor = () => {
    const colors = [riesgoRojo, riesgoAmarillo, riesgoVerde];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };


  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="flex items-center justify-between border-b border-b-[#cecece] pl-10 pr-6 py-2 bg-white sticky top-0 z-10">
        {/* <button
          onClick={handleFavoriteClick}
          className="flex items-center px-6 py-2 bg-[#487FFA] rounded-xl gap-3 text-white font-bold">
          <IconStar2
            className=" w-6"
            borde={showFavorites ? "#F5E400" : "#FFFFFF"}
            color={showFavorites ? "#F5E400" : ""}
          />
          Favoritos
        </button> */}
        <div></div>

        <h1 className="font-bold hidden md:block">Listado de pacientes</h1>

        {/* <FiltroDocPacientes
          onClickSort={handleSortClick}
          onClickFilter={handleRiskFilterClick}
          isOpen={isFilterOpen}
          toggleMenu={toggleFilterMenu}
        /> */}
        <div></div>
      </div>

      <div className="items-start justify-center w-full bg-[#FAFAFC] overflow-y-scroll">
        {sortedPatients?.map((paciente) => (
          <div
            key={paciente.id}
            className="w-full flex justify-between items-center border-b border-b-[#cecece]  px-3 md:pl-10 pr-6 py-2">
            <div className="flex gap-2 md:gap-4 items-center justify-start">
              {/* <IconTypeRisk iconColor={
                                paciente.risk === 'alto' ? '#E73F3F' :
                                paciente.risk === 'medio' ? '#F5E400' :
                                paciente.risk === 'bajo' ? '#70C247' : '#B2B2B2'
                            } /> */}
              <Image src={getRandomColor()} alt="Punto de color" />

              <div className="flex justify-center items-center">
                {/* <Image src={paciente.avatar ? paciente.avatar : Segimed} 
                                alt="Avatar del paciente" 
                                width={100} // Establece el ancho de la imagen
                                height={100} // Establece la altura de la imagen
                                className="w-12 h-12 object-cover rounded-3xl"/> */}
                <img
                  src={paciente?.avatar !== null ? paciente.avatar : avatar}
                  alt={paciente.name}
                  className="w-9 h-9 md:w-12 md:h-12 object-cover rounded-full"
                />
              </div>
              <p className="text-base">
                {paciente.name} {paciente.lastname}
              </p>
            </div>
            <OpcionesDocPacientes
              paciente={paciente}
              onConsultationClick={() => openModal(paciente.id)}
              onToggleFavorite={handleToggleFavorite}
              isOpen={openOptionsPatientId === paciente.id}
              toggleOptions={() => toggleOptionMenu(paciente.id)}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center gap-5 p-10 bg-[#FAFAFC] font-bold">
        <button className="w-36 h-10 bg-white border border-[#D7D7D7] rounded-xl flex items-center justify-center gap-4 transition duration-300 ease-in-out transform hover:scale-105 active:scale-100 active:translate-y-1">
          <IconPrev /> Anterior
        </button>
        <p>1</p>
        <button className="w-36 h-10 bg-white border border-[#D7D7D7] rounded-xl flex items-center justify-center gap-4 transition duration-300 ease-in-out transform hover:scale-105 active:scale-100 active:translate-y-1">
          Siguiente
          <IconNext />
        </button>
      </div>
      <ModalConsultation
        isOpen={isModalOpen}
        onClose={closeModal}
        doctorId={userId}
        patientId={selectedPatientId}
      />
    </div>
  );
}
