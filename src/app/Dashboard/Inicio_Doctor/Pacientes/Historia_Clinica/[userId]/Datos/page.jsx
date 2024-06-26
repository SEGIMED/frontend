"use client";

import Link from "next/link";

import { useEffect, useState } from "react";
import IconFatArrow from "@/components/icons/iconFatarrowDash";
import Cookies from "js-cookie";

import AntecedenteDash from "@/components/dashPte/antecedentesDash";
import BotonDashPte from "@/components/Buttons/ElBotonDashPte";
import AvatarDashPte from "@/components/avatar/avatarDashPte";
import CalcularEdad from "@/utils/calcularEdad";
import { ApiSegimed } from "@/Api/ApiSegimed";
import { usePathname } from "next/navigation";
import LastLogin from "@/utils/lastLogin";

export default function DetallePaciente() {

  const pathname = usePathname();
  const pathArray = pathname.split('/');
  const userId = pathArray[pathArray.length - 2];



  const [user, setUser] = useState()


  const getUser = async (headers) => {

    const response = await ApiSegimed.get(`/patient-details?id=${userId}`, headers);
    // const response = await ApiSegimed.get("/patient-details?id=8", headers);
    setUser(response.data)
  };
  useEffect(() => {
    const token = Cookies.get("a")
    if (token) {
      getUser({ headers: { token: token } }).catch(console.error);
    }
  }, []);

  console.log(user)
  return (
    <div className="min-h-screen w-full flex flex-col">
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
              {CalcularEdad(user?.sociodemographicDetails?.birthDate)}
            </span>
            <span>{user?.sociodemographicDetails?.isAlive ? "Vivo" : null}</span>
            <span>
              <b>Ultima consulta:</b> {LastLogin(user?.lastMedicalEventDate)}
            </span>
            <span>
              <b>Medico tratante: </b> {user?.currentPhysician?.name} {user?.currentPhysician?.lastname}
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

        <AntecedenteDash
          subtitle={[
            "Antecedentes quirúrgicos",
            "Antecedentes patológicos",
            "Antecedentes no patológicos",
            "Antecedentes familiares",
            "Antecedentes de infancia",
            "Medicación actual",
            "Alergias",
            "Vacunas",
          ]}
        />
      </div>
    </div>
  );
}