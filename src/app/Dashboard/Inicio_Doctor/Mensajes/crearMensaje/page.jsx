"use client";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import Link from "next/link";
import { useState, useEffect } from "react";
import { setSearchTerm } from "@/redux/slices/doctor/allPatients";
import IconFilter from "@/components/icons/IconFilter";
import rutas from "@/utils/rutas";
import Elboton from "@/components/Buttons/Elboton";
import IconMensajeBoton from "@/components/icons/IconMensajeBoton";
import MenuDropDown from "@/components/dropDown/MenuDropDown";
import { socket } from "@/utils/socketio";
import MensajeSkeleton from "@/components/skeletons/MensajeSkeleton";
import IconOrder from "@/components/icons/IconOrder";
import IconRegresar from "@/components/icons/iconRegresar";
import PatientCard from "@/components/card/PatientCard";
import config from "@/components/localData/localdata";
import Cookies from "js-cookie";
import { PathnameShow } from "@/components/pathname/path";
import IconPrev from "@/components/icons/IconPrev";
import IconNext from "@/components/icons/IconNext";
import { ApiSegimed } from "@/Api/ApiSegimed";
import IconHooter from "@/components/icons/IconHooter";
import IconRisk from "@/components/icons/iconRisk";
import IconAlphabetic from "@/components/icons/IconAlphabetic";
import { setSearchBar } from "@/redux/slices/user/searchBar";
import IconMedChat from "@/components/icons/IconMedChat";

export default function DoctoresPte() {
  const searchTerm = useAppSelector((state) => state.allPatients.searchTerm);

  const [isSorted, setIsSorted] = useState(false);
  const [riskFilter, setRiskFilter] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [patients, setPatients] = useState([]);
  const [patientsFavorites, setPatientsFavorites] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [flag, setFlag] = useState(false);
  const [pagination, setPagination] = useState({
    totalUsers: 0,
    totalPages: 0,
    currentPage: 1,
  });
  const userId = config.c;
  const dispatch = useAppDispatch();
  const token = Cookies.get("a");
  const lastSegmentTextToShow = PathnameShow();


  useEffect(() => {
    dispatch(setSearchBar(true));
    return () => {
      dispatch(setSearchBar(false));
    };
  }, [dispatch]);

  const getPatients = async (headers) => {
    const response = await ApiSegimed.get(
      `/patients?page=${pagination.currentPage}&&limit=9&&name=${searchTerm}&&risk=${riskFilter}`,
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

  const fetchDoctors = async (searchTerm = "") => {
    try {
      const response = await ApiSegimed.get(
        `/all-physicians?page=${pagination.currentPage}&limit=7&name=${searchTerm}`,
        { headers: { token: token } }
      );
      if (response.data) {
        console.log(response.data, "medicos")
        setMedicos(response.data.user);
        setPagination((prev) => ({
          ...prev,
          totalUsers: response.data.totalUsers,
          totalPages: response.data.totalPages,
        }));
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      currentPage: 1,
    }));
  }, [searchTerm, riskFilter]);

  const getFavorites = async (headers) => {
    const response = await ApiSegimed.get(
      `/get-physician-favorite-patient?page=${pagination.currentPage}&limit=9&physicianId=${userId}`,
      headers
    );
    if (response.data) {
      const pacientesFormateados = response.data.user.map((paciente) => {
        const fechaFormateada = new Date(paciente.lastLogin)
          .toLocaleString()
          .replace(/\,/g, " -");
        return { ...paciente, lastLogin: fechaFormateada };
      });

      setPatientsFavorites(pacientesFormateados);
      setPagination((prev) => ({
        ...prev,
        totalUsers: response.data.totalUsers,
        totalPages: response.data.totalPages,
      }));
    }
  };

  useEffect(() => {
    if (flag) {
      fetchDoctors(searchTerm).catch(console.error);
    } else if (!showFavorites) {
      getPatients({ headers: { token: token } }).catch(console.error);
    } else {
      getFavorites({ headers: { token: token } }).catch(console.error);
    }
  }, [showFavorites, pagination.currentPage, searchTerm, riskFilter, flag]);

  useEffect(() => {
    dispatch(setSearchTerm(""));
  }, [dispatch]);

  const filteredPatients = showFavorites ? patientsFavorites : patients;
  const sortedPatients = isSorted
    ? [...filteredPatients].sort((a, b) => a.name.localeCompare(b.name))
    : filteredPatients;

  const handleFavoriteClick = () => {
    getFavorites({ headers: { token: token } }).catch(console.error);
    setShowFavorites(!showFavorites);
    handlePageChange(1);
    dispatch(setSearchTerm(""));
    setIsFilterOpen(false);
  };

  const handleToggleFavorite = (patientId) => {
    dispatch(toggleFavorite(patientId));
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({
        ...prev,
        currentPage: newPage,
      }));
    }
  };

  if (sortedPatients.length === 0) {
    return <MensajeSkeleton />;
  }

  const crearChat = (id) => {

    socket.emit("createChat", { id });
  };

  return (
    <div className="h-full w-full flex flex-col overflow-y-auto md:overflow-y-hidden">
      <div className="flex justify-between border-b border-b-[#cecece] px-6 py-2">
        <div className="w-full h-fit">
          <div className="flex gap-3">
            <MenuDropDown
              label="Filtrar"
              iconr={<IconFilter />}
              categories={[
                {
                  title: "Nivel de riesgo",
                  icon: <IconHooter />,
                  items: [
                    {
                      label: "Alto",
                      onClick: () => setRiskFilter("Alto"),
                      icon: <IconRisk color="#E73F3F" />,
                    },
                    {
                      label: "Medio",
                      onClick: () => setRiskFilter("Moderado"),
                      icon: <IconRisk color="#F5E400" />,
                    },
                    {
                      label: "Bajo",
                      onClick: () => setRiskFilter("Bajo"),
                      icon: <IconRisk color="#70C247" />,
                    },
                    {
                      label: "Ninguno",
                      onClick: () => setRiskFilter(""),
                      icon: <IconRisk color="lightGray" />,
                    },
                  ],
                },
              ]}
            />
            {flag ? (
              <Elboton
                nombre={"Pacientes"}
                size={"md"}
                icon={<IconRegresar />}
                onPress={() => {
                  setFlag(false);
                  handlePageChange(1);
                }}
                className={"mr-2"}
              />
            ) : (
              <Elboton
                nombre={"Médicos"}
                size={"md"}
                icon={<IconMedChat />}
                onPress={() => {
                  setFlag(true);
                  handlePageChange(1);
                }}
                className={"bg-white text-[#487FFA] font-Roboto font-bold rounded-lg border-solid border-2 border-[#487FFA] mr-2"}
              />
            )}

          </div>
        </div>
        <Elboton
          href={`${rutas.Doctor}${rutas.Mensajes}`}
          nombre={"Regresar"}
          size={"md"}
          icon={<IconRegresar />}
        />
      </div>
      <div className="items-start w-full md:overflow-y-auto">
        {flag ? (
          medicos.map((medico) => (
            <PatientCard
              key={medico.id}
              paciente={medico}
              flag={true}
              button={
                <Elboton
                  href={`${rutas.Doctor}${rutas.Mensajes}/${medico.id}`}
                  nombre={"Enviar Mensaje"}
                  icon={<IconMensajeBoton />}
                  size={"sm"}
                  onPress={() => crearChat(medico.id)}
                />
              }
            />
          ))
        ) : (
          sortedPatients.map((paciente) => (
            <PatientCard
              key={paciente.id}
              paciente={paciente}
              button={
                <Elboton
                  href={`${rutas.Doctor}${rutas.Mensajes}/${paciente.id}`}
                  nombre={"Enviar Mensaje"}
                  icon={<IconMensajeBoton />}
                  size={"sm"}
                  onPress={() => crearChat(paciente.id)}
                />
              }
            />
          ))
        )}
      </div>
      <div className="flex justify-center items-center gap-5 bg-[#FAFAFC] font-bold h-[15%]">
        <button
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          disabled={pagination.currentPage === 1}
          className="w-36 h-10 bg-white border border-[#D7D7D7] rounded-xl flex items-center justify-center gap-4 transition duration-300 ease-in-out transform active:scale-100 disabled:opacity-60">
          <IconPrev /> Anterior
        </button>
        <p>
          {pagination.currentPage} de {pagination.totalPages}{" "}
        </p>
        <button
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={pagination.currentPage === pagination.totalPages}
          className="w-36 h-10 bg-white border border-[#D7D7D7] rounded-xl flex items-center justify-center gap-4 transition duration-300 ease-in transform active:scale-100 disabled:opacity-60">
          Siguiente
          <IconNext />
        </button>
      </div>
    </div>
  );
}

