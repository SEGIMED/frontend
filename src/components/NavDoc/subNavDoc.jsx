"use client";
import React, { useEffect, useRef, useState } from "react";
import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import rutas from "@/utils/rutas";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import IconClinicalHistory from "../icons/IconClinicalHistory";
import IconSubNavbar from "../icons/IconSubNavbar";
import IconRegresar from "../icons/iconRegresar";
import IconArrowDetailDown from "../icons/IconArrowDetailDown";
import IconArrowDetailUp from "../icons/IconArrowDetailUp";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setLoading,
  addClinicalHistory,
  clearClinicalHistory,
  addUserHistory,
  changeTabs,
  addImportHistory,
  setReload,
} from "@/redux/slices/doctor/HistorialClinico";
import { ApiSegimed } from "@/Api/ApiSegimed";
import Cookies from "js-cookie";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { socket } from "@/utils/socketio";
import {
  addMessage,
  toogleAlarms,
  toogleChat,
} from "@/redux/slices/chat/chatBot";

export default function SubNavbar({ id }) {
  const [openDetails, setOpenDetails] = useState(false);
  const params = useParams();
  const selectedTab = useAppSelector((state) => state.clinicalHistory.tab);
  const reload = useAppSelector((state) => state.clinicalHistory.reload);
  const segiChat = useAppSelector((state) => state.chatBot.messages);
  const userId = params?.userId;
  const getSelectedClass = (name) =>
    selectedTab === name ? "bg-white" : "cursor-pointer ";
  const dispatch = useAppDispatch();
  const router = useRouter();

  const combineDetails = (details, defaultDetails) => {
    return details.length > 0 ? details : defaultDetails;
  };

  const combineVitalSigns = (vitalSigns, defaultVitalSigns) => {
    return defaultVitalSigns.map((defaultSign) => {
      const existingSign = vitalSigns.find(
        (sign) =>
          sign.measureType === defaultSign.measureType && sign.measure !== null
      );
      return existingSign || defaultSign;
    });
  };

  const getConsultas = async (headers) => {
    try {
      const response = await ApiSegimed.get(
        `/medical-event/get-medical-event-history?patientId=${userId}`,
        headers
      );

      if (response.data) {
        const defaultAnthropometricDetails = [
          { measureType: "Estatura", measureUnit: "Cm", measure: "-" },
          { measureType: "Peso", measureUnit: "Kg", measure: "-" },
          {
            measureType: "Índice de Masa Corporal",
            measureUnit: "Kg/m²",
            measure: "-",
          },
        ];

        const defaultVitalSigns = [
          { measureType: "Temperatura", measureUnit: "°C", measure: "-" },
          {
            measureType: "Frecuencia Cardiaca",
            measureUnit: "bpm",
            measure: "-",
          },
          {
            measureType: "Presión Arterial Sistólica",
            measureUnit: "mmHg",
            measure: "-",
          },
          {
            measureType: "Presión Arterial Diastólica",
            measureUnit: "mmHg",
            measure: "-",
          },
          {
            measureType: "Frecuencia Respiratoria",
            measureUnit: "rpm",
            measure: "-",
          },
          {
            measureType: "Saturación de Oxígeno",
            measureUnit: "%",
            measure: "-",
          },
          // { measureType: "Estatura", measureUnit: "Cm", measure: "-" },
          // { measureType: "Peso", measureUnit: "Kg", measure: "-" },
          // { measureType: "IMC", measureUnit: "Kg/m²", measure: "-" },
        ];

        const combinedConsultas = response.data.map((consulta) => {
          const combinedAnthropometricDetails = combineDetails(
            consulta.anthropometricDetails || [],
            defaultAnthropometricDetails
          );
          const combinedVitalSigns = combineVitalSigns(
            consulta.vitalSigns || [],
            defaultVitalSigns
          );

          return {
            ...consulta,
            anthropometricDetails: combinedAnthropometricDetails,
            vitalSigns: combinedVitalSigns,
          };
        });
        dispatch(addClinicalHistory(combinedConsultas));
      }
    } catch (error) {
      console.error("Error fetching consultas:", error);
    }
  };

  const getImportHistory = async () => {
    const response = await ApiSegimed.get(`/patient-studies?userId=${userId}`);
    dispatch(addImportHistory(response.data));
  };
  const handleClinicalHistorySegi = () => {
    dispatch(toogleChat(true));
    dispatch(toogleAlarms(false));
    if (
      segiChat[segiChat.length - 1].message !=
      "Tienes alguna pregunta sobre la historia clínica de este paciente?"
    ) {
      dispatch(
        addMessage({
          sender: "bot",
          message:
            "Tienes alguna pregunta sobre la historia clínica de este paciente?",
          time: new Date().toISOString(),
        })
      );
    }
  };
  const getUser = async (headers) => {
    const response = await ApiSegimed.get(
      `/patient-details?id=${userId}`,
      headers
    );
    dispatch(addUserHistory(response.data));
  };

  useEffect(() => {
    dispatch(setLoading(true));
    getUser().catch(console.error);
    getConsultas().catch(console.error);
    getImportHistory().catch(console.error);
    if (socket.isConnected()) {
      socket.emit("sendPatientInfo", { message: userId });
      handleClinicalHistorySegi();
    }

    return () => {
      dispatch(clearClinicalHistory());
      dispatch(toogleChat(false));
    };
  }, [userId, dispatch]);

  useEffect(() => {
    if (reload) {
      getImportHistory().catch(console.error);
      dispatch(setReload(false))
    }
  }, [reload]);

  return (
    <div className="border-b border-b-[#cecece] bg-[#fafafc] flex flex-row-reverse md:flex-row justify-around items-center md:pr-6">
      <Navbar
        className="flex justify-start items-center w-[86%] md:w-full bg-[#fafafc]"
        classNames={{
          item: [
            "flex",
            "items-center",
            "w-full",
            "h-full",
            "justify-start",
            "pr-4",
            "pl-4",
            "py-2",
            "border-r-1",
            "border-l-1",
          ],
          wrapper: ["px-0"],
        }}>
        <NavbarContent className="gap-0 px-0 overflow-x-auto">
          <NavbarItem
            key={"Datos del Paciente"}
            className={getSelectedClass("Datos")}
            onClick={() => dispatch(changeTabs("Datos"))}>
            <div className="flex items-center gap-2" aria-current="page">
              <IconClinicalHistory /> Datos del Paciente
            </div>
          </NavbarItem>
          <NavbarItem
            key={"Consultas"}
            className={getSelectedClass("Consultas")}
            onClick={() => dispatch(changeTabs("Consultas"))}>
            <div className="flex items-center gap-2" aria-current="page">
              <IconSubNavbar /> Consultas
            </div>
          </NavbarItem>
          <NavbarItem
            key={"Evoluciones"}
            className={getSelectedClass("Evoluciones")}
            onClick={() => dispatch(changeTabs("Evoluciones"))}>
            <div className="flex items-center gap-2">
              <IconSubNavbar /> Evoluciones
            </div>
          </NavbarItem>
          <NavbarItem
            key={"Anamnesis"}
            className={getSelectedClass("Anamnesis")}
            onClick={() => dispatch(changeTabs("Anamnesis"))}>
            <div className="flex items-center gap-2">
              <IconSubNavbar /> Anamnesis
            </div>
          </NavbarItem>
          <NavbarItem
            key={"Autoevaluación"}
            className={getSelectedClass("Autoevaluación")}
            onClick={() => dispatch(changeTabs("Autoevaluación"))}>
            <div className="flex items-center gap-2">
              <IconSubNavbar /> Autoevaluación
            </div>
          </NavbarItem>
          <NavbarItem key={"drop"} className="flex items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  style={{
                    color: "#686868",
                    fontWeight: 400,
                    fontSize: 16,
                    border: "0",
                  }}
                  variant="bordered"
                  onClick={() => setOpenDetails(!openDetails)}>
                  Mas{" "}
                  {openDetails ? (
                    <IconArrowDetailUp />
                  ) : (
                    <IconArrowDetailDown />
                  )}
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem
                  className={getSelectedClass("Examen Físico")}
                  key="new"
                  textValue="Examen Fisico"
                  onPress={() => {
                    dispatch(changeTabs("Examen Físico"));
                    setOpenDetails(!openDetails);
                  }}>
                  Examen Físico
                </DropdownItem>
                <DropdownItem
                  className={getSelectedClass("Signos Vitales")}
                  key="copy"
                  textValue="Signos Vitales"
                  onPress={() => {
                    dispatch(changeTabs("Signos Vitales"));
                    setOpenDetails(!openDetails);
                  }}>
                  Signos Vitales
                </DropdownItem>
                <DropdownItem
                  className={getSelectedClass("Diagnosticos y tratamientos")}
                  key="edit"
                  textValue="Diagnosticos y tratamientos"
                  onPress={() => {
                    dispatch(changeTabs("Diagnosticos y tratamientos"));
                    setOpenDetails(!openDetails);
                  }}>
                  Diagnosticos y tratamientos
                </DropdownItem>
                <DropdownItem
                  className={getSelectedClass("HC Importados")}
                  key="importaciones"
                  textValue="HC Importados"
                  onPress={() => {
                    dispatch(changeTabs("HC Importados"));
                    setOpenDetails(!openDetails);
                  }}>
                  HC Importados
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <button
        onClick={() => router.back()}
        className="flex items-center px-2 md:px-6 py-2 bg-[#487FFA] rounded-xl gap-3 text-white font-bold">
        <IconRegresar />
        <p className="hidden md:block">Regresar</p>
      </button>
    </div>
  );
}
