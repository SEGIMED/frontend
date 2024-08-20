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
import ModalBoarding from "../modal/ModalPatient/ModalBoarding";
import rutas from "@/utils/rutas";

export const NavBarMod = ({ search, toggleSidebar }) => {
    const pathname = usePathname();
    // const rol = Cookies.get("b");
    const [rol, setRol] = useState(null); // Initialize as null

    const notifications = useAppSelector((state) => state.notifications);
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


    useEffect(() => {
        if (!user.name || !rol) return;



        if (rol === "Médico") {
            if (!user.medicalRegistries?.Nacional?.registryId) {
                router.push(rutas.Doctor);
                setIsModalOpen(true);
            }
        } else if (rol === "Paciente") {

            if (!user.sociodemographicDetails?.genre) {
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

    } = useDataFetching();// Use the useRouter hook


    const {
        getUser,
        getPatientNotifications,
        getSchedules,
        obtenerUbicacion,
        getAllDoc
    } = useDataFetchingPte();// Use the useRouter hook


    const handleSearchChange = (e) => {
        dispatch(setSearchTerm(e.target.value));
        dispatch(setSearchTerm1(e.target.value));
    };

    const handleNotificationClick = () => {
        setShowNotifications(!showNotifications);
    };

    const searchTerm = useAppSelector((state) => state.user.searchTerm);


    useEffect(() => {
        if (rol) {
            protectRoute(pathname, rol, dispatch, router)
        }
    }, [pathname, rol]);

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
                if (!socket.isConnected()) {
                    socket.setSocket(token, refreshToken, dispatch);
                    socket.emit("onJoin", { id: id });
                }
            }
            if (rol === "Paciente") {
                obtenerUbicacion();
                getUser({ headers: { token: token } }).catch(console.error);
                getAllDoc({ headers: { token: token } }).catch(console.error);
                getSchedules({ headers: { token: token } }).catch(console.error);

                getPatientNotifications({ headers: { token: token } }).catch(
                    console.error
                );
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
        } else return
    }, [rol]);

    useEffect(() => {
        if (rol === "Médico") {
            getUserDoctor().catch(console.error);

        }
        if (rol === "Paciente") {
            getUser({ headers: { token: token } }).catch(console.error);
        }
    }, [onboarding]);



    const [showNotifications, setShowNotifications] = useState(false);
    const unreadNotifications = notifications?.filter(
        (notificacion) => !notificacion.state
    );

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
    return (
        <div className="md:pl-10 md:pr-16 flex bg-[#FAFAFC] items-center justify-between h-[12%] border-b-[1px] border-b-[#D7D7D7] p-4">
            <div className="lg:hidden p-4">
                <button
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
            <div className="flex items-center justify-center gap-4 text-lg font-semibold">
                <IconCurrentRouteNav className="hidden w-4 md:block" />
                {["Inicio_Doctor", "Inicio_Paciente", "Inicio_Admin", "Inicio_Entries"].includes(lastSegment) ? (
                    <p>Tablero</p>
                ) : lastSegment === "Citas" ? (
                    <p>Mi Agenda</p>
                ) : lastSegment === "Doctores" ? (
                    <p>Médicos</p>
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
                    className={`hidden md:flex justify-center items-center gap-2 border border-[#cecece] py-2 px-6 rounded-lg ${search}`}>
                    <input
                        onChange={handleSearchChange}
                        type="text"
                        placeholder="Buscar "
                        className="text-start text-[#808080] bg-[#FAFAFC] font-normal text-normal leading-6 outline-none"
                        value={searchTerm}
                    />
                    <button>
                        <Image src={busqueda} alt="" />
                    </button>
                </div>
            )}
            <div className="flex items-center justify-center gap-4">

                <div className="w-12 h-12 flex justify-center items-center">
                    <AvatarSideBar
                        avatar={user?.avatar !== null ? user.avatar : avatar}
                    />
                </div>

                <div className="flex-col hidden md:flex">
                    <span className="text-start ">
                        {user?.name} {user?.lastname}
                    </span>
                    <span className="text-start text-[#808080]">

                        {rol === "Médico" ? "Médico" : rol === "Paciente" ? "Paciente" : rol === "Admin" ? "Administrador" : ""}
                    </span>
                </div>
                <button
                    onClick={handleNotificationClick}
                    className={`w-12 h-12 rounded-xl border-[1px] border-[#D7D7D7] flex items-center justify-center ${(showNotifications || unreadNotifications.length > 0) &&
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
                        handleNotificationElementClick={handleNotificationElementClick}
                        handleNotificationClick={handleNotificationClick}
                        unreadNotifications={unreadNotifications}
                    />
                )}
            </div>
            <ModalBoarding isOpen={isModalOpen} onClose={closeModal} rol={rol} setOnboarding={setOnboarding} />
        </div>
    );
};
