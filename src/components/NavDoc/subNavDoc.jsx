"use client";
import React, { useEffect, useState } from "react";
import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import rutas from "@/utils/rutas";
import Link from "next/link";
import { usePathname } from "next/navigation";
import IconClinicalHistory from "../icons/IconClinicalHistory";
import IconSubNavbar from "../icons/IconSubNavbar";
import IconRegresar from "../icons/iconRegresar";
import IconArrowDetailDown from "../icons/IconArrowDetailDown";
import IconArrowDetailUp from "../icons/IconArrowDetailUp";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setLoading, addClinicalHistory, clearClinicalHistory, addUserHistory } from "@/redux/slices/doctor/HistorialClinico";
import { ApiSegimed } from "@/Api/ApiSegimed";
import Cookies from "js-cookie";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

export default function SubNavbar({ id }) {
  const [openDetails, setOpenDetails] = useState(false);
  const pathname = usePathname();
  const lastSegment = pathname.substring(pathname.lastIndexOf("/") + 1);

  const pathArray = pathname.split("/");
  const userId = pathArray[pathArray.length - 2];

  const getLinkClass = (routeLastSegment) =>
    `/${lastSegment}` === routeLastSegment ? "bg-white" : "cursor-pointer ";

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.clinicalHistory);

  const getConsultas = async (headers) => {
    try {
      const response = await ApiSegimed.get(
        `/medical-event/get-medical-event-history?patientId=${userId}`,
        headers
      );
      if (response.data) {
        dispatch(addClinicalHistory(response.data));
      }
    } catch (error) {
      console.error("Error fetching consultas:", error);
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
    const token = Cookies.get("a");
    if (token) {
      getUser({ headers: { token: token } }).catch(console.error);
    }
  }, []);

  useEffect(() => {
    const token = Cookies.get("a");
    dispatch(setLoading(true));

    getConsultas({ headers: { token: token } }).catch(console.error);
    getUser({ headers: { token: token } }).catch(console.error);

    return () => {
      dispatch(clearClinicalHistory());
    };
  }, [userId, dispatch]);

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
        }}
      >
        <NavbarContent className="gap-0 px-0 overflow-x-auto">
          <NavbarItem
            key={"Datos del Paciente"}
            className={getLinkClass(rutas.Datos)}
            onClick={() =>
              router.push(
                `${rutas.Doctor}${rutas.Pacientes}${rutas.Historia_Clinica}/${id}${rutas.Datos}`
              )
            }
          >
            <div className="flex items-center gap-2" aria-current="page">
              <IconClinicalHistory /> Datos del Paciente
            </div>
          </NavbarItem>
          <NavbarItem
            key={"Consultas"}
            className={getLinkClass(rutas.Consultas)}
            onClick={() =>
              router.push(
                `${rutas.Doctor}${rutas.Pacientes}${rutas.Historia_Clinica}/${id}/${rutas.Consultas}`
              )
            }
          >
            <div className="flex items-center gap-2" aria-current="page">
              <IconSubNavbar /> Consultas
            </div>
          </NavbarItem>
          <NavbarItem
            key={"Evoluciones"}
            className={getLinkClass(rutas.Evoluciones)}
            onClick={() =>
              router.push(
                `${rutas.Doctor}${rutas.Pacientes}${rutas.Historia_Clinica}/${id}/${rutas.Evoluciones}`
              )
            }
          >
            <div className="flex items-center gap-2">
              <IconSubNavbar /> Evoluciones
            </div>
          </NavbarItem>
          <NavbarItem
            key={"Anamnesis"}
            className={getLinkClass(rutas.Anamnesis)}
            onClick={() =>
              router.push(
                `${rutas.Doctor}${rutas.Pacientes}${rutas.Historia_Clinica}/${id}/${rutas.Anamnesis}`
              )
            }
          >
            <div className="flex items-center gap-2">
              <IconSubNavbar /> Anamnesis
            </div>
          </NavbarItem>
          <NavbarItem
            key={"Autoevaluación"}
            className={getLinkClass(rutas.Evaluacion)}
            onClick={() =>
              router.push(
                `${rutas.Doctor}${rutas.Pacientes}${rutas.Historia_Clinica}/${id}/${rutas.Evaluacion}`
              )
            }
          >
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
                  onClick={() => setOpenDetails(!openDetails)}
                >
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
                  className={getLinkClass(rutas.ExamenFisico)}
                  key="new"
                  textValue="Examen Fisico"
                >
                  <Link
                    className="w-full"
                    onClick={() => setOpenDetails(!openDetails)}
                    href={`${rutas.Doctor}${rutas.Pacientes}${rutas.Historia_Clinica}/${id}${rutas.ExamenFisico}`}
                  >
                    <p>Examen Fisico</p>
                  </Link>
                </DropdownItem>
                <DropdownItem
                  className={getLinkClass(rutas.SignosVitales)}
                  key="copy"
                  textValue="Signos Vitales"
                >
                  <Link
                    href={`${rutas.Doctor}${rutas.Pacientes}${rutas.Historia_Clinica}/${id}${rutas.SignosVitales}`}
                    onClick={() => setOpenDetails(!openDetails)}
                    className="w-full"
                  >
                    <p>Signos Vitales</p>
                  </Link>
                </DropdownItem>
                <DropdownItem
                  className={getLinkClass(rutas.Diagnostico)}
                  key="edit"
                  textValue="Diagnosticos y tratamientos"
                >
                  <Link
                    onClick={() => setOpenDetails(!openDetails)}
                    className="w-full"
                    href={`${rutas.Doctor}${rutas.Pacientes}${rutas.Historia_Clinica}/${id}${rutas.Diagnostico}`}
                  >
                    <p>Diagnosticos y tratamientos</p>
                  </Link>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <Link href={`${rutas.Doctor}${rutas.Pacientes}`}>
        <button className="flex items-center px-2 md:px-6 py-2 bg-[#487FFA] rounded-xl gap-3 text-white font-bold">
          <IconRegresar />
          <p className="hidden md:block">Regresar</p>
        </button>
      </Link>
    </div>
  );
}
