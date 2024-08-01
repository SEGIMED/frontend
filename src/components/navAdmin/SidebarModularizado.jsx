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
import { NotificacionElement } from "@/components/InicioPaciente/NotificacionElement";
import { IconNotificaciones } from "@/components/InicioPaciente/IconNotificaciones";
import useDataFetching from "@/utils/SideBarFunctionsDoctor";
import { addNotifications } from "@/redux/slices/user/notifications";
import Swal from "sweetalert2";
import { ApiSegimed } from "@/Api/ApiSegimed";

export const SideModularizado = ({ search, toggleSidebar }) => {
    const pathname = usePathname();
    const rol = Cookies.get("b");

    const notifications = useAppSelector((state) => state.notifications);
    const user = useAppSelector((state) => state.user);
    console.log(user);
    const showSearch = useAppSelector((state) => state.searchBar);
    // const adjustedPathname = pathname.startsWith('/Dash') ? pathname.slice(5) : pathname;
    const id = Cookies.get("c");
    const token = Cookies.get("a");
    const refreshToken = Cookies.get("d");

    // reemplazar pathname por adjustedPathname
    const lastSegment = pathname.substring(pathname.lastIndexOf("/") + 1);
    const IsEvent = /^(\/inicio_Doctor\/Citas\/\d+)$/.test(pathname);
    const IsMessage = /^(\/inicio_Doctor\/Mensajes\/\d+)$/.test(pathname);
    console.log(lastSegment);
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

    // const getUser = async (headers) => {
    //     const response = await ApiSegimed.get(`/physician-info?id=${id}`, headers);
    //     // const response = await ApiSegimed.get(`/physician-info?id=4`, headers);

    //     if (response.data) {
    //         dispatch(adduser(response.data));
    //     }
    // };
    // const getPatients = async (headers) => {
    //     const response = await ApiSegimed.get(`/patients`, headers);
    //     if (response.data) {
    //         const pacientesFormateados = response.data.map((paciente) => {
    //             const fechaFormateada = new Date(paciente.lastLogin)
    //                 .toLocaleString()
    //                 .replace(/\,/g, " -");
    //             return { ...paciente, lastLogin: fechaFormateada };
    //         });
    //         dispatch(setAllPatients(pacientesFormateados));
    //     }
    // };
    // const getDoctorNotifications = async (headers) => {
    //     try {
    //         const response = await ApiSegimed.get(
    //             `/all-notifications-physician?physicianId=` + id,
    //             headers
    //         );

    //         if (response.data) {
    //             dispatch(addNotifications(response.data));
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };
    // const getSchedules = async (headers) => {
    //     try {
    //         const response = await ApiSegimed.get("/schedules", headers);

    //         if (response.data) {
    //             dispatch(addSchedules(response.data));
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    const handleSearchChange = (e) => {
        dispatch(setSearchTerm(e.target.value));
        dispatch(setSearchTerm1(e.target.value));
    };

    const handleNotificationClick = () => {
        setShowNotifications(!showNotifications);
    };

    const searchTerm = useAppSelector((state) => state.user.searchTerm);

    // const getActivesAlarms = async (headers) => {
    //     try {
    //         const response = await ApiSegimed.get("/alarms-by-patient", headers);

    //         const actives = response.data?.alarms?.filter(
    //             (alarm) => alarm.solved === false
    //         ).length;
    //         const inactives = response.data?.alarms?.filter(
    //             (alarm) => alarm.solved === true
    //         ).length;
    //         const data = {
    //             activeAlarms: Number(actives),
    //             inactiveAlarms: Number(inactives),
    //         };

    //         dispatch(addAlarms(data));
    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //     }
    // };

    // const getActivesPacientes = async (headers) => {
    //     try {
    //         const response = await ApiSegimed.get(
    //             "/statistics-patient-activity",
    //             headers
    //         );

    //         dispatch(addActivePtes(response.data));
    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //     }
    // };

    useEffect(() => {
        if (rol !== "Médico") {
            Cookies.remove("a");
            Cookies.remove("b");
            Cookies.remove("c");
            Cookies.remove("d");
            dispatch(resetApp());
            router.push("/");
            setTimeout(() => window.location.reload(true), 2000);
            return;
        }

        if (token) {
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
    }, [dispatch]);

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
                {["Inicio_Doctor", "Inicio_Paciente", "Inicio_Admin"].includes(lastSegment) ? (
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
                        {user.role === 3 ? "Paciente" : user.role === 2 ? "Médico" : user.role === 1 ? "Administrador" : ""}
                    </span>
                </div>

                <button
                    onClick={handleNotificationClick}
                    className={`w-12 h-12 rounded-xl border-[1px] border-[#D7D7D7] flex items-center justify-center ${showNotifications && "bg-[#E73F3F]"
                        }`}>
                    <IconNotificaciones
                        className="w-6 h-6"
                        color={showNotifications && "white"}
                    />
                </button>
                {showNotifications && (
                    <div
                        onClick={handleNotificationClick}
                        className="fixed top-0 left-0 w-screen h-screen z-40">
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="fixed flex flex-col gap-2 bg-red w-[90%] md:w-[30%] h-fit max-h-[55%] md:max-h-[50%] shadow-lg bg-white rounded-2xl px-4 z-50 top-[10%] right-[5%] md:right-[2%]">
                            <p className="text-2xl text-bluePrimary font-semibold py-2">
                                Notificaciones
                            </p>
                            <div className="w-full flex flex-col gap-4 max-h-[80%] overflow-y-auto">
                                {unreadNotifications && unreadNotifications.length > 0 ? (
                                    unreadNotifications.map((notificacion) => (
                                        <NotificacionElement
                                            key={notificacion._id}
                                            notificacion={notificacion}
                                            onClick={() =>
                                                handleNotificationElementClick(notificacion._id)
                                            }
                                        />
                                    ))
                                ) : (
                                    <p className="text-lg text-[#5F5F5F] text-center py-2">
                                        No hay notificaciones por leer
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
