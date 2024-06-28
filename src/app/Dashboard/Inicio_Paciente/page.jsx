"use client";

import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import IconFatArrow from "@/components/icons/iconFatarrowDash";
import Cookies from "js-cookie";

import AntecedenteDash from "@/components/dashPte/antecedentesDash";
import BotonDashPte from "@/components/Buttons/ElBotonDashPte";
import AvatarDashPte from "@/components/avatar/avatarDashPte";
import CalcularEdad from "@/utils/calcularEdad";
import LastLogin from "@/utils/lastLogin";


export default function HomePte() {
  const user = useAppSelector((state) => state.user);
  console.log(user)
  return (
    <div className="min-h-screen flex flex-col ">
      <div className="flex justify-between items-center gap-2 px-4 py-3 border-b border-b-[#cecece]">
        <h2 className="text-2xl">¡Bienvenido {user?.name}!</h2>
      </div>
      <div className="flex justify-between items-center gap-2 px-6 py-2  border-b-[#cecece]">
        <div className="flex justify-center items-center ml-5">
          <div>
            <AvatarDashPte avatar={user?.avatar} />
          </div>
          <div className="flex flex-col ml-4 ">
            <span className="font-bold text-xl">
              {user?.name} {user?.lastname}
            </span>
            <span>
              {user?.sociodemographicDetails?.birthDate
                ? `${CalcularEdad(user.sociodemographicDetails.birthDate)} años`
                : "Sin especificar nacimiento"}
            </span>
            <span>{user?.sociodemographicDetails?.isAlive ? "Vivo" : null}</span>
            <span>
              <b>Ultima consulta:</b> {user?.lastMedicalEventDate ? LastLogin(user?.lastMedicalEventDate) : "Sin especificar"}

            </span>
            <span>
              <b>Medico tratante: </b> {user?.currentPhysician?.name ? `${user?.currentPhysician?.name} ${user?.currentPhysician?.lastname} ` : "Sin medico tratante"}
            </span>
          </div>
        </div>
        <div className="rounded-full border-4 border-blue-400 h-14 w-14 md:w-24 md:h-24 flex items-center justify-center md:mr-20">
          <h1 className="text-2xl text-center text-blue-400  text-">
            <b>{user?.patientPulmonaryHypertensionGroups?.group}</b>
          </h1>
        </div>
      </div>
      <div className="flex px-6 py-2 border gap-1 items-center justify-center ">
        <div className="flex items-center h-10">
          <p className="text-start text-[#5F5F5F] font-bold  text-large leading-10 ">
            Antecedentes
          </p>
        </div>
      </div>
      <div className="flex flex-col overflow-y-auto">
        <div className="flex flex-col md:flex-row md:gap-2 px-6 py-2  border-b-[#cecece] bg-gray-100">
          <label className="text-start w-1/2 text-[#686868] font-medium text-base leading-4 flex gap-2 items-center">
            <IconFatArrow /> Riesgo Cardiovascular
          </label>
          <div className="flex gap-3">
            <BotonDashPte

              riesgo={
                user?.patientCardiovascularRisks?.risk
              }
              nombre={"Bajo"}
            />
            <BotonDashPte

              riesgo={
                user?.patientCardiovascularRisks?.risk
              }
              nombre={"Moderado"}
            />
            <BotonDashPte

              riesgo={
                user?.patientCardiovascularRisks?.risk
              }
              nombre={"Alto"}
            />
            <BotonDashPte

              riesgo={
                user?.patientCardiovascularRisks?.risk
              }
              nombre={"Muy Alto"}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:gap-2 px-6 py-2  border-b-[#cecece] bg-gray-100">
          <label className="text-start w-1/2 text-[#686868] font-medium text-base leading-4 flex gap-2 items-center">
            <IconFatArrow /> Riesgo quirúrgico
          </label>
          <div className="flex gap-3">
            <BotonDashPte

              riesgo={user?.patientSurgicalRisks?.risk}
              nombre={"Bajo"}
            />
            <BotonDashPte

              riesgo={user?.patientSurgicalRisks?.risk}
              nombre={"Moderado"}
            />
            <BotonDashPte

              riesgo={user?.patientSurgicalRisks?.risk}
              nombre={"Alto"}
            />
          </div>
        </div>

        <AntecedenteDash title={"Antecedentes quirúrgicos"} info={user?.backgrounds?.surgicalBackground ? user?.backgrounds?.surgicalBackground : "No hay antecedentes"} />
        <AntecedenteDash title={"Antecedentes patológicos"} info={user?.backgrounds?.pathologicBackground ? user?.backgrounds?.pathologicBackground : "No hay antecedentes"} />
        <AntecedenteDash title={"Antecedentes no patológicos"} info={user?.backgrounds?.nonPathologicBackground ? user?.backgrounds?.nonPathologicBackground : "No hay antecedentes"} />
        <AntecedenteDash title={"Antecedentes familiares"} info={user?.backgrounds?.familyBackground ? user?.backgrounds?.familyBackground : "No hay antecedentes"} />
        <AntecedenteDash title={"Antecedentes de infancia"} info={user?.backgrounds?.pediatricBackground ? user?.backgrounds?.pediatricBackground : "No hay antecedentes"} />
        <AntecedenteDash title={"Medicación actual"} info={user?.backgrounds?.allergicBackground ? user?.backgrounds?.allergicBackground : "No hay antecedentes"} />
        <AntecedenteDash title={"Alergias"} info={user?.backgrounds?.allergicBackground ? user?.backgrounds?.allergicBackground : "No hay antecedentes"} />
        <AntecedenteDash title={"Vacunas"} info={user?.backgrounds?.vaccinationBackground ? user?.backgrounds?.vaccinationBackground : "No hay antecedentes"} />
      </div>

      {/* Descomenta y ajusta este bloque si necesitas los botones en tu diseño */}
      {/* <div className="flex-col space-y-6 lg:space-y-0 lg:gap-10 lg:flex-row flex lg:justify-between py-10">
        <Link href={`${rutas.PacienteDash}${rutas.Doctores}`}>
          <button
            style={{ width: "280px", height: "128px" }}
            className="m-5 bg-gradient-to-r from-blue-300 to-blue-600 text-white font-bold rounded-xl flex justify-center items-center sm:w-3/5 md:w-full hover:scale-105 transition-transform"
          >
            <IconAdminButtons className="mr-2 h-6 w-6" />
            <div className="text-xl text-start ml-2">
              Ver <br /> Doctores
            </div>
          </button>
        </Link>
        <Link href={`${rutas.PacienteDash}${rutas.Doctores}`}>
          <DashHomeButtons
            icon={<IconHomeConsultas />}
            name={
              <>
                <span>Ver</span>
                <span>Consultas</span>
              </>
            }
          />
        </Link>
        <Link href={`${rutas.PacienteDash}${rutas.Doctores}`}>
          <DashHomeButtons
            icon={<IconHomeCitas />}
            name={
              <>
                <span>Ver</span>
                <span>Citas</span>
              </>
            }
          />
        </Link>
      </div> */}
    </div>
  );
}