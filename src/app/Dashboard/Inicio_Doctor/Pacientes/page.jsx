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
import { setSearchTerm, toggleFavorite } from "@/redux/slices/doctor/allPatients";
import ModalConsultation from "@/components/modal/ModalDoctor/ModalConsultation";
import OpcionesDocPacientes from "../../../../components/Buttons/OpcionesDocPacientes.jsx";
import FiltroDocPacientes from "@/components/Buttons/FiltrosDocPacientes";
import config from "@/components/localData/localdata";
import avatar from "@/utils/defaultAvatar";
import Cookies from "js-cookie";
import { ApiSegimed } from "@/Api/ApiSegimed.js";
import IconFavoriteBlue from "@/components/icons/IconFavoriteBlue.jsx";
import IconFavoriteYellow from "@/components/icons/IconFavoriteyellow.jsx";
import { PathnameShow } from "@/components/pathname/path";
import realColor from "@/utils/realColor.js";
import RealColorRisk from "@/utils/realColor.js";
import IconRisk from "@/components/icons/iconRisk.jsx";

export default function HomeDoc() {
  const searchTerm = useAppSelector((state) => state.allPatients.searchTerm);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [riskFilter, setRiskFilter] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [patients, setPatients] = useState([]);
  const [patientsFavorites, setPatientsFavorites] = useState([]);
  const [pagination, setPagination] = useState({
    totalUsers: 0,
    totalPages: 0,
    currentPage: 1,
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [openOptionsPatientId, setOpenOptionsPatientId] = useState(null);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const userId = config.c;
  const dispatch = useAppDispatch();
  const token = Cookies.get("a");
  const lastSegmentTextToShow = PathnameShow()

  const getPatients = async (headers) => {
    const response = await ApiSegimed.get(
      `/patients?page=${pagination.currentPage}&limit=9&name=${searchTerm}`,
      headers
    );
    if (response.data) {
      const pacientesFormateados = response.data.user.map((paciente) => {
        const fechaFormateada = new Date(paciente.lastLogin)
          .toLocaleString()
          .replace(/\,/g, " -");
        return { ...paciente, lastLogin: fechaFormateada };
      });

      setPatients(pacientesFormateados);
      setPagination((prev) => ({
        ...prev,
        totalUsers: response.data.totalUsers,
        totalPages: response.data.totalPages,
      }));
    }
  };

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      currentPage: 1,
    }));
  }, [searchTerm]);

  const getFavorites = async (headers) => {
    const userId = Cookies.get("c")
    const response = await ApiSegimed.get(
      `/get-physician-favorite-patient?physicianId=${userId}`,
      headers
    );
    if (response.data) {
      const pacientesFormateados = response.data.map((paciente) => {
        const fechaFormateada = new Date(paciente.lastLogin)
          .toLocaleString()
          .replace(/\,/g, " -");
        return { ...paciente, lastLogin: fechaFormateada };
      });
      console.log(pacientesFormateados);
      setPatientsFavorites(pacientesFormateados);
      setPagination((prev) => ({
        ...prev,
        totalUsers: response.data.totalUsers,
        totalPages: response.data.totalPages,
      }));
    }
  };

  useEffect(() => {
    dispatch(setSearchTerm(""));
  }, [dispatch]);



  useEffect(() => {
    const token = Cookies.get("a");
    getPatients({ headers: { token: token } }).catch(console.error);
  }, [pagination.currentPage, searchTerm]);

  const filteredPatients = patients?.filter(
    (paciente) =>
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
    getFavorites({ headers: { token: token } }).catch(console.error);
    setShowFavorites(!showFavorites);
    handlePageChange(1)
    dispatch(setSearchTerm(""));
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

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({
        ...prev,
        currentPage: newPage,
      }));
    }
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
      <title>{lastSegmentTextToShow}</title>
      <div className="flex items-center justify-between border-b border-b-[#cecece] pl-10 pr-6 py-2 h-16 bg-white sticky top-0 z-10">
        <div>
          <button
            onClick={handleFavoriteClick}
            className={`${showFavorites ? "bg-bluePrimary text-white" : "bg-white text-bluePrimary border border-bluePrimary"
              } py-2 px-4 items-center flex rounded-lg gap-2 w-full transition duration-300 ease-in-out`}

          >
            {showFavorites ? <IconFavoriteYellow /> : <IconFavoriteBlue />}
            <p className={`hidden md:block ${showFavorites ? "text-white" : "text-bluePrimary"} font-bold`}>
              Favoritos
            </p>
          </button>
        </div>
        <h1 className="font-bold">Listado de pacientes</h1>
        <div></div>
      </div>

      <div className="items-start justify-center w-[100%] h-[80%] bg-[#FAFAFC] overflow-y-auto">
        {sortedPatients?.map((paciente) => (
          <div
            key={paciente.id}
            className="w-full flex justify-between items-center border-b border-b-[#cecece] px-3 md:pl-10 pr-6 py-2"
          >
            <div className="flex gap-2 md:gap-4 items-center justify-start">
              {paciente.patientPulmonaryHypertensionRisks?.risk ? (
                <RealColorRisk risk={paciente.patientPulmonaryHypertensionRisks.risk} />
              ) : (
                <IconRisk color="lightGray" />
              )}
              <div className="flex justify-center items-center">
                <img
                  src={paciente?.avatar !== null ? paciente.avatar : avatar}
                  alt={paciente?.name}
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
      <div className="flex justify-center items-center gap-5 pb-10 pt-5 bg-[#FAFAFC] font-bold">
        <button
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          disabled={pagination.currentPage === 1}
          className="w-36 h-10 bg-white border border-[#D7D7D7] rounded-xl flex items-center justify-center gap-4 transition duration-300 ease-in-out transform active:scale-100  disabled:opacity-60"
        >
          <IconPrev /> Anterior
        </button>
        <p>{pagination.currentPage} de {pagination.totalPages} </p>
        <button
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={pagination.currentPage === pagination.totalPages}
          className="w-36 h-10 bg-white border border-[#D7D7D7] rounded-xl flex items-center justify-center gap-4 transition duration-300 ease-in transform  active:scale-100  disabled:opacity-60"
        >
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
