"use client";

import Link from "next/link";
import IconAdminButtons from "@/components/icons/iconDashAdminButtons";
import IconHomeCitas from "@/components/icons/inconDashHomeCitas";
import rutas from "@/utils/rutas";
import IconDashAgenda from "@/components/icons/IconDashAgenda";
import IconCurrentRouteNav from "@/components/icons/IconCurrentRouteNav";
import IconAlarmUsers from "@/components/icons/IconAlarmUsers";
import IconNewUsers from "@/components/icons/IconNewUsers";
import IconInactiveUsers from "@/components/icons/IconInactiveUsers";
import IconActiveUsers from "@/components/icons/IconActiveUsers";
import IconArrowUp from "@/components/icons/IconArrowUp";
import { useAppSelector } from "@/redux/hooks";
import { useState, useEffect } from "react";
import PtesActivos from "@/components/Graficos/dashboardDoc/ptesActivos";
import Elboton from "@/components/Buttons/Elboton";
import Alarmas from "@/components/Graficos/dashboardDoc/alarmas";
import BarChart from "@/components/Graficos/graficoUltimos7dias.jsx/ultimos7dias";
import ProximasConsultas from "@/components/dashDoc/proximaConsulta";
import IconPrev from "@/components/icons/IconPrev";
import IconNext from "@/components/icons/IconNext";
import Cookies from "js-cookie";
import { ApiSegimed } from "@/Api/ApiSegimed";
import DashboardButton from "@/components/Modularizaciones/ButtonsDashMod";
import DashboardButtonData from "@/components/Modularizaciones/ButtonsDashDataMod";

import { buttonsDashEntries } from "@/components/DashAdmin/ButtonsDash";

export default function HomeDoc() {
    const user = useAppSelector((state) => state.user);

    const [currentChart, setCurrentChart] = useState(0);
    const [currentTitle, setCurrentTitle] = useState(0);
    const [barChartData, setBarChartData] = useState(null);
    const [activeData, setActiveData] = useState(null);
    const [alarmsData, setAlarmsData] = useState({ actives: 0, inactives: 0 });
    const dataAlarms = useAppSelector((state) => state.alarms);
    const dataPtesGrafic = useAppSelector((state) => state.activePtes);

    const buttonDataAdmin = [
        {
            bgColor: "#875CF2",
            icon: <IconNewUsers className="w-[40%] md:w-12" color="white" />,
            value: 6,
            label: "Nuevos",
        },
        {
            bgColor: "#64D594",
            icon: <IconActiveUsers className="w-[40%] md:w-12" color="white" />,
            value: dataPtesGrafic?.activePatients,
            label: "Activos",
        },
        {
            bgColor: "#ECD652",
            icon: <IconInactiveUsers className="w-[40%] md:w-12" color="white" />,
            value: dataAlarms?.inactiveAlarms,
            label: "Alarmas Inactivos",
        },
        {
            bgColor: "#FF7E7E",
            icon: <IconAlarmUsers className="w-[40%] md:w-12" color="white" />,
            value: dataAlarms?.activeAlarms,
            label: "Alarmas Activas",
        },
    ];


    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get("a");

                // Fetch data for the bar chart
                const responseBarChart = await ApiSegimed.get("/user/login-record", { headers: { token } });
                setBarChartData(responseBarChart.data);

                // Fetch data for active patients
                const responseActiveData = await ApiSegimed.get("/statistics-patient-activity", { headers: { 'token': token } });
                setActiveData(responseActiveData.data);

                // Fetch data for alarms
                const responseAlarmsData = await ApiSegimed.get("/alarms-by-patient", { headers: { 'token': token } });
                const data = { actives: responseAlarmsData.data?.priorityCounts?.Activas, inactives: responseAlarmsData.data?.priorityCounts?.Inactivas };
                setAlarmsData(data);

            } catch (error) {
                console.error("Error fetching data:", error);
                setBarChartData(null);
                setActiveData(null);
                setAlarmsData({ actives: 0, inactives: 0 });
            }
        };

        fetchData();
    }, []);

    const handlePreviousChartTitle = () => {
        setCurrentChart((prev) => (prev === 0 ? titles.length - 1 : prev - 1));
        setCurrentTitle((prev) => (prev === 0 ? titles.length - 1 : prev - 1));
    };

    const handleNextChartTitle = () => {
        setCurrentChart((prev) => (prev === titles.length - 1 ? 0 : prev + 1));
        setCurrentTitle((prev) => (prev === titles.length - 1 ? 0 : prev + 1));
    };

    const titles = [
        <div key={0}>
            <p className="hidden md:block">Pacientes nuevos en los últimos 7 días</p>
            <p className="block md:hidden">Ultimos 7 días</p>
        </div>,
        <p key={1}>Actividad</p>,
        <p key={2}>Alarmas</p>,
    ];

    console.log(barChartData);

    const charts = [
        <div key={0} className=" flex-grow flex items-center justify-center h-100%">
            <BarChart data={barChartData} />
        </div>,
        <div key={1} className="flex-grow flex items-center justify-center h-100% ">
            <PtesActivos dataActives={activeData} />
        </div>,
        <div key={2} className="flex-grow flex items-center justify-center h-100% ">
            <Alarmas dataAlarms={alarmsData} />
        </div>,
    ]; // Agrega aquí todos los componentes de gráfico que desees mostrar

    return (
        <div className="h-full flex flex-col gap-8 p-3 xs:p-6 md:p-10 bg-[#FAFAFC] md:overflow-y-scroll">
            <h2 className="text-2xl">
                ¡Bienvenido {user?.name} {user?.lastname}
            </h2>
            <div className="grid-cols-2 gap-4 grid lg:flex w-full">
                {buttonsDashEntries.map((button, index) => (
                    <DashboardButton
                        key={index}
                        href={button.href}
                        icon={button.icon}
                        text={button.text}
                    />
                ))}
            </div>
            <h2 className="text-xl leading-6 font-normal flex gap-2">
                <IconCurrentRouteNav className={"w-[1.5rem]"} />
                Resumen semanal
            </h2>
            <div className="grid-cols-2 gap-4 grid lg:py-5 lg:flex">
                {buttonDataAdmin.map((button, index) => (
                    <DashboardButtonData
                        key={index}
                        bgColor={button.bgColor}
                        icon={button.icon}
                        value={button.value}
                        label={button.label}
                    />
                ))}
            </div>
            <div className=" h-fit w-full bg-white border border-[#DCDBDB] rounded-2xl flex flex-col">
                <div className="flex justify-between items-center p-2 xs:p-5">
                    <Elboton
                        onPress={handlePreviousChartTitle}
                        nombre={"Anterior"}
                        icon={<IconPrev color="white" />}
                    />
                    <span className="text-sm xs:text-lg text-center leading-6">
                        {titles[currentTitle]}
                    </span>
                    <Elboton
                        onPress={handleNextChartTitle}
                        nombre={"Siguiente"}
                        icon2={<IconNext color="white" />}
                    />
                </div>

                {charts[currentChart]}

            </div>

        </div>
    );
}
