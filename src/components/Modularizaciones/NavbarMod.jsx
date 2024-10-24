"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Cookies from "js-cookie";

import busqueda from "@/components/images/busqueda.png";
import IconCurrentRouteNav from "@/components/icons/IconCurrentRouteNav";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { setSearchTerm } from "@/redux/slices/doctor/allPatients";
import avatar from "@/utils/defaultAvatar";
import { resetApp } from "@/redux/rootReducer";
import { setSearchTerm1 } from "@/redux/slices/doctor/allDoctores";

import AvatarSideBar from "../avatar/avatarSideBar";
import { socket } from "@/utils/socketio";
import useDataFetching from "@/utils/SideBarFunctionsDoctor";
import { addNotifications } from "@/redux/slices/user/notifications";
import Swal from "sweetalert2";
import { ApiSegimed } from "@/Api/ApiSegimed";
import { IconNotificaciones } from "../InicioPaciente/notificaciones/IconNotificaciones";
import NotificacionesContainer from "../InicioPaciente/notificaciones/NotificacionesContainer";
import useDataFetchingPte from "@/utils/SideBarFunctionsPaciente";
import { protectRoute } from "@/utils/protectRutes";
import MensajesContainer from "../InicioPaciente/mensajes/MensajesContainer";
import rutas from "@/utils/rutas";
import IconMail from "../icons/iconMail";
import ModalBoarding from "../modal/ModalPatient/ModalBoarding";
import { IconChat } from "../InicioPaciente/IconChat";
import { setTourstate } from "@/redux/slices/user/tour";
import IconGuide from "../icons/IconGuide";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import Elboton from "../Buttons/Elboton";
import IconNewUsers from "../icons/IconNewUsers";
import { isUserUsingMobile } from "@/utils/checkMobile";

export const NavBarMod = ({ search, toggleSidebar }) => {
  const pathname = usePathname();
  // const rol = Cookies.get("b");
  const [rol, setRol] = useState(null); // Initialize as null
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [inviteCode, setInviteCode] = useState("");

  const notifications = useAppSelector((state) => state.notifications);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUnreadNotifications, setShowUnreadNotifications] = useState(true);
  const chats = useAppSelector((state) => state.chat);
  const [showChats, setShowChats] = useState(false);
  const user = useAppSelector((state) => state.user);
  const showSearch = useAppSelector((state) => state.searchBar);
  // const adjustedPathname = pathname.startsWith('/Dash') ? pathname.slice(5) : pathname;
  const id = Cookies.get("c");
  const token = Cookies.get("a");
  const refreshToken = Cookies.get("d");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [onboarding, setOnboarding] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  console.log(user);

  useEffect(() => {
    if (!user.name || !rol) return;

    if (rol === "Médico") {
      if (!user.physicianMedicalRegistries[0]?.registryId) {
        router.push(rutas.Doctor);
        setIsModalOpen(true);
      }
    } else if (rol === "Paciente") {
      if (!user.socDemDet) {
        router.push(rutas.PacienteDash);
        setIsModalOpen(true);
      }
    }

    return;
  }, [user, rol]);

  // reemplazar pathname por adjustedPathname
  const lastSegment = pathname.substring(pathname.lastIndexOf("/") + 1);
  const IsEvent = /^(\/inicio_Doctor\/Citas\/\d+)$/.test(pathname);
  const IsMessage = /^(\/inicio_Doctor\/Mensajes\/\d+)$/.test(pathname);
  const formattedLastSegment = lastSegment.replace(/_/g, " ");
  const [userDetails, setUserDetails] = useState([]);

  const segments = pathname.split("/");
  const secondLastSegment =
    segments.length > 1 ? segments[segments.length - 2] : "";
  const formattedSegment = secondLastSegment.replace(/_/g, " ");

  const dispatch = useAppDispatch();

  const router = useRouter();

  const {
    getActivesPacientesDoctor,
    getActivesAlarmsDoctor,
    getSchedulesDoctor,
    getDoctorNotifications,
    getPatientsDoctor,
    getUserDoctor,
    getAlarms,
  } = useDataFetching(); // Use the useRouter hook

  const {
    getUser,
    getPatientNotifications,
    getSchedules,
    obtenerUbicacion,
    getAllDoc,
  } = useDataFetchingPte(); // Use the useRouter hook

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
    dispatch(setSearchTerm1(e.target.value));
  };

  const pastNotifications = notifications?.filter(
    (notificacion) => notificacion.state === true // Notificaciones leídas
  );

  const toggleNotificationView = () => {
    setShowUnreadNotifications(!showUnreadNotifications); // Alterna entre no leídas y pasadas
  };
  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };
  const handleChatClick = () => {
    setShowChats(!showChats);
  };

  const startTour = () => {
    dispatch(setTourstate(true)); // Inicia el tour
  };

  const searchTerm = useAppSelector((state) => state.user.searchTerm);

  // useEffect(() => {
  //   if (rol) {
  //     protectRoute(pathname, rol, dispatch, router);
  //   }
  // }, [pathname, rol]);

  useEffect(() => {
    const fetchedRol = Cookies.get("b");
    setRol(fetchedRol);
  }, [rol]);

  useEffect(() => {
    if (token) {
      if (rol === "Médico") {
        getUserDoctor().catch(console.error);
        getPatientsDoctor().catch(console.error);
        getSchedulesDoctor().catch(console.error);
        getActivesAlarmsDoctor().catch(console.error);
        getActivesPacientesDoctor().catch(console.error);
        getDoctorNotifications().catch(console.error);
        getAlarms().catch(console.error);
        if (!socket.isConnected()) {
          socket.setSocket(token, refreshToken, dispatch);
          socket.emit("onJoin", { id: id });
        }
      }
      if (rol === "Paciente") {
        obtenerUbicacion();
        getUser().catch(console.error);
        getAllDoc().catch(console.error);
        getSchedules().catch(console.error);

        getPatientNotifications().catch(console.error);
        if (!socket.isConnected()) {
          socket.setSocket(token, refreshToken, dispatch);
          socket.emit("onJoin", { id: id });
        }
      }
      if (rol === "Admin") {
        getActivesAlarmsDoctor().catch(console.error);
        getActivesPacientesDoctor().catch(console.error);
        //   ACA PONER PETICIONES DE ADMIN, MIRAR useDataFetching() Y SEGUIR FORMATO
      }
      if (rol === "Entries") {
        getActivesAlarmsDoctor().catch(console.error);
        getActivesPacientesDoctor().catch(console.error);
        //   ACA PONER PETICIONES DE ADMIN, MIRAR useDataFetching() Y SEGUIR FORMATO
      }
    } else return;
  }, [rol]);

  useEffect(() => {
    if (rol === "Médico") {
      getUserDoctor().catch(console.error);
      dispatch(setTourstate(true));
    }
    if (rol === "Paciente") {
      getUser({ headers: { token: token } }).catch(console.error);
      dispatch(setTourstate(true));
    }
  }, [onboarding]);

  const unreadNotifications = notifications?.filter(
    (notificacion) =>
      notificacion?.content.notificationType != "updatedAppointment" &&
      notificacion.state != true
  );
  const Inicio =
    rol == "Paciente"
      ? "/Dashboard/Inicio_Paciente"
      : "/Dashboard/Inicio_Doctor";
  const formattedChats = formatChat(chats, id);
  const hasUnreadMessages = Object.values(formattedChats).some(
    (chat) => chat.cantidadMensajes > 0
  );

  function formatChat(data, userId) {
    const resultado = {};
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const chat = data[key];
        let ultimoMensaje = null;
        let senderInfo = null;
        let cantidadMensajes = 0;
        let isMessageFromUser = false;
        chat.messages.forEach((mensaje) => {
          ultimoMensaje = mensaje;
          senderInfo = mensaje.sender;
          if (mensaje?.sender?.userId == userId) {
            isMessageFromUser = true;
            senderInfo = mensaje.target;
          }
          if (mensaje.state === false && mensaje?.sender?.userId != userId) {
            cantidadMensajes++;
          }
        });
        if (ultimoMensaje) {
          resultado[key] = {
            cantidadMensajes: cantidadMensajes, // Solo cuenta los mensajes no vistos
            ultimoMensaje: ultimoMensaje, // Último mensaje
            sender: senderInfo, // Información del sender
            isMessageFromUser: isMessageFromUser,
          };
        }
      }
    }

    return resultado;
  }
  const handleNotificationElementClick = (id) => {
    try {
      ApiSegimed.patch("/notification-seen", null, {
        params: {
          notification_Id: id,
        },
        headers: {
          token: token,
        },
      }).then((response) => {
        if (response.data) {
          dispatch(
            addNotifications(
              notifications.map((notificacion) =>
                notificacion._id === id
                  ? { ...notificacion, state: true }
                  : notificacion
              )
            )
          );
          Swal.fire({
            icon: "success",
            title: "Notificación leída",
            showConfirmButton: false,
            confirmButtonColor: "#487FFA",
            confirmButtonText: "Aceptar",
            timer: 1500,
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleMensajeElementClick = (id) => {
    router.push(`${Inicio}${rutas.Mensajes}/${id}`);
  };

  const handleShowCode = async () => {
    try {
      const response = await ApiSegimed.post(`/physician/token?id=${id}`);
      if (response.data) {
        setInviteCode(response.data);
        onOpen();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="md:pl-10 md:pr-16 flex bg-[#FAFAFC] items-center justify-between h-[12%] border-b-[1px] border-b-[#D7D7D7] p-1">
      <div className="lg:hidden p-4">
        <button
          id="buttonResponsive"
          className="text-[#B2B2B2] p-2 border rounded-lg focus:outline-none"
          onClick={toggleSidebar}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>{" "}
      <div className=" hidden md:flex items-center justify-center gap-4 text-lg font-semibold">
        <IconCurrentRouteNav className="hidden w-[1.5rem] md:block" />
        {["Inicio_Doctor", "Inicio_Paciente", "Inicio_Admin"].includes(
          lastSegment
        ) ? (
          <p>Tablero</p>
        ) : lastSegment === "Citas" ? (
          <p>Mi Agenda</p>
        ) : lastSegment === "Doctores" ? (
          <p>Médicos</p>
        ) : lastSegment === "crearMensaje" ? (
          <p>Crear Mensaje</p>
        ) : IsEvent ? (
          <p>Evento</p>
        ) : IsMessage ? (
          <p>Mensaje</p>
        ) : isNaN(Number(lastSegment)) ? (
          <p>{formattedLastSegment}</p>
        ) : (
          <p>{formattedSegment}</p>
        )}
      </div>
      {showSearch && (
        <div
          className={`hidden md:flex justify-between w-[20rem] items-center gap-2 border bg-white border-[#cecece] py-2 px-6 rounded-lg ${search}`}>
          <input
            onChange={handleSearchChange}
            type="text"
            placeholder="Buscar "
            className="text-start text-[#808080]  font-normal text-normal leading-6 outline-none"
            value={searchTerm}
          />
          <button>
            <Image src={busqueda} alt="" />
          </button>
        </div>
      )}
      <div className="flex items-center justify-center lg:gap-4 gap-2">
        {rol === "Médico" && (
          <>
            {isUserUsingMobile() ? (
              <button
                onClick={handleShowCode}
                className={`w-12 h-12 rounded-lg border-[1px] border-[#D7D7D7] flex items-center justify-center                
              }`}>
                <IconNewUsers className="w-8 h-8" />
              </button>
            ) : (
              <Elboton
                onPress={handleShowCode}
                nombre="Agregar paciente"
                classNameText={"hidden md:block"}
                icon={
                  <IconNewUsers className={"w-10 md:hidden"} color={"white"} />
                }
              />
            )}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      Código de invitación
                    </ModalHeader>
                    <ModalBody>
                      <span className="text-center font-bold font-Poppins text-2xl">
                        {inviteCode}
                      </span>
                      <div>
                        <p>Use este código para invitar a un nuevo paciente.</p>
                        <p className="text-red-500 font-semibold">
                          Recuerde que el código expira en 5 minutos.
                        </p>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="primary"
                        onPress={() => {
                          navigator.clipboard.writeText(inviteCode);
                          Swal.fire({
                            icon: "success",
                            title: "Código copiado",
                            confirmButtonColor: "#487FFA",
                            confirmButtonText: "Aceptar",
                          });
                        }}>
                        Copiar
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </>
        )}
        <div className="w-12 h-12 justify-center items-center hidden sm:flex">
          <AvatarSideBar
            avatar={user?.avatar !== null ? user.avatar : avatar}
          />
        </div>

        <div className="flex-col hidden md:flex">
          <span className="text-start ">
            {user?.name} {user?.lastname}
          </span>
          <span className="text-start text-[#808080]">
            {rol === "Médico"
              ? "Médico"
              : rol === "Paciente"
              ? "Paciente"
              : rol === "Admin"
              ? "Administrador"
              : ""}
          </span>
        </div>
        <button
          id="chatsButton"
          onClick={handleChatClick}
          className={`w-12 h-12 rounded-lg border-[1px] border-[#D7D7D7] flex items-center justify-center ${
            (showChats || hasUnreadMessages) && "bg-[#E73F3F]"
          }`}>
          <IconChat
            className="w-6 h-6"
            color={showChats || hasUnreadMessages ? "white" : "#B2B2B2"}
          />
        </button>
        {showChats && (
          <MensajesContainer
            handleMensajeElementClick={handleMensajeElementClick}
            handleMensajeClick={handleChatClick}
            formattedChats={formattedChats}
          />
        )}
        <button
          id="notificationButton"
          onClick={handleNotificationClick}
          className={`w-12 h-12 rounded-lg border-[1px] border-[#D7D7D7] flex items-center justify-center ${
            (showNotifications || unreadNotifications.length > 0) &&
            "bg-[#E73F3F]"
          }`}>
          <IconNotificaciones
            className="w-6 h-6"
            color={
              (showNotifications || unreadNotifications.length > 0) && "white"
            }
          />
        </button>
        {showNotifications && (
          <NotificacionesContainer
            pastNotifications={pastNotifications}
            showUnreadNotifications={showUnreadNotifications}
            toggleNotificationView={toggleNotificationView}
            handleNotificationElementClick={handleNotificationElementClick}
            handleNotificationClick={handleNotificationClick}
            unreadNotifications={unreadNotifications}
          />
        )}
        <button
          id="tour"
          onClick={startTour}
          className={`w-fit gap-1 px-3 h-12 rounded-lg border-2 border-bluePrimary flex items-center justify-center"
            }`}>
          <IconGuide />
          <span className="md:block hidden text-bluePrimary">Guía</span>
        </button>
      </div>
      <ModalBoarding
        isOpen={isModalOpen}
        onClose={closeModal}
        rol={rol}
        setOnboarding={setOnboarding}
      />
    </div>
  );
};
