"use client";

import IconPrev from "@/components/icons/IconPrev";
import IconNext from "@/components/icons/IconNext";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";

import {
  setSearchTerm,
  toggleFavorite,
} from "@/redux/slices/doctor/allPatients";
import ModalConsultation from "@/components/modal/ModalDoctor/ModalConsultation";
import config from "@/components/localData/localdata";
import avatar from "@/utils/defaultAvatar";
import Cookies from "js-cookie";
import { ApiSegimed } from "@/Api/ApiSegimed.js";
import IconFavoriteBlue from "@/components/icons/IconFavoriteBlue.jsx";
import IconFavoriteYellow from "@/components/icons/IconFavoriteyellow.jsx";
import { PathnameShow } from "@/components/pathname/path";
import RealColorRisk from "@/utils/realColor.js";
import IconRisk from "@/components/icons/iconRisk.jsx";
import MenuDropDown from "@/components/dropDown/MenuDropDown.jsx";
import IconMiniCalendar from "@/components/icons/IconMiniCalendar.jsx";
import IconClinicalHistory from "@/components/icons/IconClinicalHistory.jsx";
import rutas from "@/utils/rutas.js";
import IconPersonalData from "@/components/icons/IconPersonalData.jsx";
import IconMessages from "@/components/icons/IconMessages.jsx";
import IconGeolocation from "@/components/icons/IconGeolocation.jsx";
import MapModalPte from "@/components/modal/MapModalPte.jsx";
import IconOptions from "@/components/icons/IconOptions";
import IconHooter from "@/components/icons/IconHooter";
import IconFilter from "@/components/icons/IconFilter";
import IconTStar2 from "@/components/icons/IconStar2";
import NotFound from "@/components/notFound/notFound";
import SkeletonList from "@/components/skeletons/HistorialSkeleton";
import ModalModularizado from "@/components/modal/ModalPatient/ModalModurizado";
import { useSearchParams } from "next/navigation";
import { setSelectedOption } from "@/redux/slices/doctor/formConsulta";
import Elboton from "@/components/Buttons/Elboton";
import IconRegresar from "@/components/icons/iconRegresar";
import IconSelect from "@/components/icons/IconSelect";
import { useRouter } from "next/navigation";
import { setSearchBar } from "@/redux/slices/user/searchBar";
import { socket } from "@/utils/socketio";

export default function HomeDoc() {
  const searchTerm = useAppSelector((state) => state.allPatients.searchTerm);
  const orden = useAppSelector((state) => state.formSlice.selectedOptions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [isSorted, setIsSorted] = useState(false);
  const [riskFilter, setRiskFilter] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [patients, setPatients] = useState([]);
  const [patientsFavorites, setPatientsFavorites] = useState([]);
  const [ordenMedica, setOrdenMedica] = useState(false);
  const [Pendientes, setPendientes] = useState(false);
  const [ordenType, setOrdenType] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("ordenMedica")) {
      setOrdenMedica(searchParams.get("ordenMedica"));
    }
    if (searchParams.get("Pendientes")) {
      setPendientes(searchParams.get("Pendientes"));
    }
    if (searchParams.get("type")) {
      setOrdenType(searchParams.get("type"));
      console.log(searchParams.get("type"));
    }
    return;
  }, [searchParams]);

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
  const lastSegmentTextToShow = PathnameShow();

  useEffect(() => {
    dispatch(setSearchBar(true));
    return () => {
      dispatch(setSearchBar(false));
    };
  }, [dispatch]);

  const getPatients = async (headers) => {
    const response = await ApiSegimed.get(
      `/patients?page=${pagination.currentPage}&&limit=9&&name=${searchTerm}&&risk=${riskFilter}&physicianId=${userId}`,
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
      setisLoading(false);
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
      `/patients?page=${pagination.currentPage}&&limit=9&&name=${searchTerm}&&risk=${riskFilter}&physicianId=${userId}&onlyFavorites=true`,
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
      setisLoading(false);
    }
  };

  useEffect(() => {
    if (!showFavorites) {
      getPatients({ headers: { token: token } }).catch(console.error);
    } else {
      setisLoading(true);
      getFavorites({ headers: { token: token } }).catch(console.error);
    }
  }, [showFavorites, pagination.currentPage, searchTerm, riskFilter]);

  useEffect(() => {
    dispatch(setSearchTerm(""));
  }, [dispatch]);

  const filteredPatients = showFavorites ? patientsFavorites : patients;

  const sortedPatients = isSorted
    ? [...filteredPatients].sort((a, b) => a.name.localeCompare(b.name))
    : filteredPatients;

  const openModal = (patientId) => {
    setIsModalOpen(true);
    setSelectedPatientId(patientId);
    setOpenOptionsPatientId(null);
    setIsFilterOpen(false);
  };

  const changeFavorite = async (patient) => {
    const url = patient.isFavorite
      ? `/delete-physician-favorite-patient`
      : `/create-physician-favorite-patient`;
    const method = patient.isFavorite ? "DELETE" : "POST";
    const data = { patientId: patient.id, physicianId: userId };

    try {
      const response = await ApiSegimed({
        url,
        method,
        data,
        headers: { token },
      });
      if (response.status === 201 || response.status === 200) {
        getFavorites({ headers: { token: token } }).catch(console.error);
        getPatients({ headers: { token: token } }).catch(console.error);
      } else {
        console.log("Something went wrong:", response);
      }
    } catch (error) {
      console.error("Error in changeFavorite function:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPatientId(null);
  };

  const handleSortClick = () => {
    setIsSorted(!isSorted);
  };

  const handleRiskFilterClick = ({ risk }) => {
    setRiskFilter(risk);
  };

  const handleSeeMessages = (id) => {
    socket.emit("createChat", { id });
    setTimeout(() => {
      router.push(`${rutas.Doctor}${rutas.Mensajes}/${id}`);
    }, 250);
  };

  const handleFavoriteClick = () => {
    setisLoading(true);
    setShowFavorites(!showFavorites);

    handlePageChange(1);
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

  const handleGeolocationClick = (patient) => {
    setSelectedPatient(patient);
    setShowMapModal(true);
  };
  return (
    <div className="flex flex-col h-full ">
      <title>{lastSegmentTextToShow}</title>
      <div className="flex items-center border-b justify-between border-b-[#cecece] px-2 lg:pl-10 lg:pr-[3%] py-2 h-[10%] bg-white sticky top-0 z-10 ">
        <div className="flex gap-2 lg:gap-4 items-center">
          {/* Se comenta por falta de funcionalidad */}
          {/* <button
            className={
              "bg-bluePrimary text-white py-2 px-4 items-center flex rounded-lg gap-2 w-fit transition duration-300 ease-in-out"
            }>
            <IconAddPatient className="w-6" />
            <p
              className={`hidden md:block
                text-white font-bold`}>
              Agregar Paciente
            </p>
          </button> */}
          {ordenMedica ? (
            <button
              type="button"
              className="flex md:px-6 px-4 py-2 rounded-lg gap-1 items-center bg-[#487FFA]"
              onClick={() => {
                router.push(`${rutas.Doctor}${rutas.Ordenes}`);
              }}>
              <IconRegresar />
              <p className="text-start hidden md:block text-white font-bold text-base leading-5">
                {" "}
                Regresar
              </p>
            </button>
          ) : null}

          <button
            onClick={handleFavoriteClick}
            className={`${showFavorites
              ? "bg-bluePrimary text-white"
              : "bg-white text-bluePrimary  border-bluePrimary"
              } py-2 px-4 items-center flex rounded-lg border gap-2 w-fit transition duration-300 ease-in-out`}>
            {showFavorites ? <IconFavoriteYellow /> : <IconFavoriteBlue />}
            <p
              className={`hidden md:block ${showFavorites ? "text-white" : "text-bluePrimary"
                } font-bold`}>
              Favoritos
            </p>
          </button>
          {/* <FiltrosPaciente
              isOpen={isFilterOpen}
              toggleMenu={toggleFilterMenu}
              onClickSort={handleSortClick}
          /> */}
        </div>

        <h1 className="font-bold ml-4">Listado de pacientes</h1>
        <div className="lg:w-fit w-1/6">
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
              // {
              //   title: "Orden Alfabetico",
              //   icon: <IconAlphabetic />,
              //   items: [
              //     {
              //       label: "Ver todos",
              //       onClick: () => setRiskFilter(""),
              //     }
              //   ]
              // }
            ]}
          />
        </div>
      </div>

      <div className="items-start justify-center w-[100%] h-[80%] bg-[#FAFAFC] overflow-y-auto">
        {isLoading ? (
          <SkeletonList count={10} />
        ) : sortedPatients.length === 0 ? (
          <NotFound
            text={
              showFavorites ? "No hay pacientes favoritos " : "No hay pacientes"
            }
            sizeText={"w-[100%]"}
          />
        ) : (
          filteredPatients.map((paciente) => (
            <div
              key={paciente.id}
              className="w-full flex justify-between items-center border-b border-b-[#cecece] px-3 md:px-6 py-2">
              <div className="flex gap-2 pr-4 md:gap-4 items-center justify-start md:w-[40%] xl:w-[70%]">
                {paciente.patientPulmonaryHypertensionRisks?.risk ? (
                  <RealColorRisk
                    risk={paciente.patientPulmonaryHypertensionRisks.risk}
                  />
                ) : (
                  <IconRisk color="lightGray" />
                )}

                <button
                  onClick={() =>
                    router.push(
                      `${rutas.Doctor}${rutas.Pacientes}${rutas.Historia_Clinica}/${paciente.id}`
                    )
                  }
                  className="flex justify-center items-center">
                  <div className="flex justify-center items-center">
                    <img
                      src={paciente?.avatar !== null ? paciente.avatar : avatar}
                      alt={paciente?.name}
                      className="w-9 h-9 md:w-12 md:h-12 object-cover rounded-full"
                    />
                  </div>
                  <p className="text-base w-fit">
                    {paciente.name} {paciente.lastname}
                  </p>
                </button>
                <div
                  className="cursor-pointer"
                  onClick={() => changeFavorite(paciente)}>
                  {paciente.isFavorite ? (
                    <IconFavoriteYellow />
                  ) : (
                    <IconFavoriteBlue />
                  )}
                </div>

                {/* aca verificar si es favorite es true y poner IconFavoriteYellow sino nada y aplicar logica de skeleton y de notfound, haz las importaciones y todo para que funcione, usa las mismas que antes */}
              </div>
              <div className="flex justify-end md:justify-between items-center  min-w-[20%] md:gap-6 2xl:gap-14">
                <div className="border-bluePrimary border-1 rounded-lg px-4 py-2 hidden lg:block">
                  <div className="text-sm md:text-base text-bluePrimary flex gap-1">
                    <p className="hidden md:block">Grupo HTP:</p>
                    <p className="font-bold">
                      {paciente?.userHpGroups?.length > 0
                        ? paciente.userHpGroups.map(group => group?.catHpGroup?.name).join(', ')
                        : '-'}
                    </p>
                  </div>
                </div>
                {/* <OpcionesDocPacientes
                paciente={paciente}
                onConsultationClick={() => openModal(paciente.id)}
                onToggleFavorite={handleToggleFavorite}
                isOpen={openOptionsPatientId === paciente.id}
                toggleOptions={() => toggleOptionMenu(paciente.id)}
              /> */}
                {ordenMedica ? (
                  <Elboton
                    icon={<IconSelect color={"#487ffa"} />}
                    nombre={"Seleccionar "}
                    size={"md"}
                    className={
                      "bg-white border border-bluePrimary text-bluePrimary "
                    }
                    onPress={() => {
                      dispatch(
                        setSelectedOption({
                          name: "patientId",
                          option: paciente.id,
                        })
                      );
                      const url = Pendientes
                        ? `${rutas.Doctor}${rutas.Ordenes}${rutas.Generar}?Pendientes=true&type=${ordenType}&id=${paciente.id}`
                        : `${rutas.Doctor}${rutas.Ordenes}${rutas.Generar}?type=${ordenType}&id=${paciente.id}`;
                      router.push(url);
                    }}
                    classNameText={"hidden md:block "}
                  // icon={<IconMas />}
                  />
                ) : (
                  <div className="lg:w-fit w-1/2">
                    <MenuDropDown
                      label="Opciones"
                      icon={<IconOptions color="#FFFFFF" />}
                      categories={[
                        {
                          title: "Acciones",
                          items: [
                            {
                              label: "Agendar Consulta",
                              onClick: () => openModal(paciente.id),
                              icon: <IconMiniCalendar />,
                            },
                            {
                              label: paciente.isFavorite
                                ? "Quitar de Favoritos"
                                : "Agregar a Favoritos",
                              onClick: () => changeFavorite(paciente),
                              icon: (
                                <IconTStar2
                                  className={"w-6"}
                                  borde={"#B2B2B2"}
                                />
                              ),
                            },
                          ],
                        },
                        {
                          title: "Información",
                          items: [
                            {
                              label: "Ver Historia Clínica",
                              href: `${rutas.Doctor}${rutas.Pacientes}${rutas.Historia_Clinica}/${paciente.id}`,
                              icon: <IconClinicalHistory />,
                            },
                            {
                              label: "Ver datos Personales",
                              href: `${rutas.Doctor}${rutas.Pacientes}/${paciente.id}`,
                              icon: <IconPersonalData />,
                            },
                            {
                              label: "Ver Mensajes",
                              onClick: () => handleSeeMessages(paciente.id),
                              icon: <IconMessages />,
                            },
                            {
                              label: "Ver Geolocalización",
                              onClick: () => handleGeolocationClick(paciente),
                              icon: <IconGeolocation />,
                            },
                          ],
                        },
                      ]}
                    />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      <div className="flex justify-center items-center gap-5  bg-[#FAFAFC] font-bold h-[15%]">
        <button
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          disabled={pagination.currentPage === 1}
          className="w-36 h-10 bg-white border border-[#D7D7D7] rounded-lg flex items-center justify-center gap-4 transition duration-300 ease-in-out transform active:scale-100  disabled:opacity-60">
          <IconPrev /> Anterior
        </button>
        <p>
          {pagination.currentPage} de {pagination.totalPages}{" "}
        </p>
        <button
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={pagination.currentPage === pagination.totalPages}
          className="w-36 h-10 bg-white border border-[#D7D7D7] rounded-lg flex items-center justify-center gap-4 transition duration-300 ease-in transform  active:scale-100  disabled:opacity-60">
          Siguiente
          <IconNext />
        </button>
      </div>
      {showMapModal && selectedPatient && (
        <ModalModularizado
          isOpen={showMapModal}
          onClose={() => setShowMapModal(false)}
          Modals={[
            <MapModalPte
              onClose={() => setShowMapModal(false)}
              patient={selectedPatient}
              key={"map"}
            />,
          ]}
          title={"Geolocalizacion del paciente"}
          button1={"hidden"}
          button2={"bg-bluePrimary text-white block font-font-Roboto"}
          progessBar={"hidden"}
          size={"h-[36rem] md:h-[35rem] md:w-[45rem]"}
          buttonText={{ end: `Continuar` }}
        />
      )}
      <ModalConsultation
        isOpen={isModalOpen}
        onClose={closeModal}
        doctorId={userId}
        patientId={selectedPatientId}
      />
    </div>
  );
}
