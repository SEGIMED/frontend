"use client";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import TableAlarm from "@/components/alarm/tableAlarm";
import Link from "next/link";
import rutas from "@/utils/rutas";
import NotFound from "@/components/notFound/notFound";
import SkeletonList from "@/components/skeletons/HistorialSkeleton";
import Cookies from "js-cookie";
import Elboton from "../Buttons/Elboton";
import IconOrder from "../icons/IconOrder";
import IconRegresar from "../icons/iconRegresar";
import IconOptions from "../icons/IconOptions";
import IconCancel from "../icons/iconCancel";
import MenuDropDown from "../dropDown/MenuDropDown";


export default function AlarmsByRole({ alarms, isLoading}) {
  const [role, setRole]= useState()
  const router=useRouter()
  const lastSegmentTextToShow = rutas.Alarm;
  
  useEffect(() => {
    // Esta comprobación solo se ejecutará en el cliente
    const roleFromCookie = Cookies.get("b");
    setRole(roleFromCookie);
  }, []);

  if (role === null) {
   
    return null;
  }
 
  return (
    <div className="h-full flex flex-col overflow-y-auto md:overflow-y-hidden">
      <title>{lastSegmentTextToShow}</title>
      <div className="h-full w-full flex flex-col">
        <div className="w-full flex justify-between px-2 items-center border-b gap-3 bg-white border-b-[#cecece] pb-2 pt-2">
          {role==="Admin" ? 
          (<Elboton
            nombre={"Regresar"}
            icon={<IconRegresar />}
            onPress={() => router.back()}
          />)
          :
          (<div></div>)}
          <h1 className="font-bold md:text-xl hidden md:block">
          {role === "Admin" 
            ? alarms.length > 0 && alarms[0]?.name && alarms[0]?.lastname 
            ? `Alarmas creadas por ${alarms[0].name} ${alarms[0].lastname}`
            : "No hay alarmas creadas"
            : "Listado de Alarmas"}
          </h1>
            {role==="Admin" && <Elboton 
            nombre={"Ordenar"}
            icon={<IconOrder/>}/>}
            {role === "Médico" &&  
            <div className="flex gap-3">
            <Link href={`${rutas.Doctor}${rutas.Alarm}${rutas.resueltas}`}>
              <button className="flex items-center px-6 py-2 bg-[#70C247] rounded-xl gap-3 text-white font-bold">
                Ver resueltas
              </button>
            </Link>
            </div>}
          
        </div>
        <div className="md:overflow-y-auto h-full">
          <div className="w-[100%] bg-white border-b border-b-[#cecece] flex">
            <div className="w-[12%] md:w-[5%] md:block"></div>
            <div className="grid w-[70%] md:w-[75%] text-center items-center leading-6 text-base font-normal gap-3 grid-cols-3 md:text-start md:grid-cols-6 py-2 z-10">
              <p className="text-[#5F5F5F] hidden md:block">Prioridad</p>
              <p className="text-[#5F5F5F]">Hora</p>
              <p className="text-[#5F5F5F]">Fecha</p>
              <p className="text-[#5F5F5F]">Paciente</p>
              <p className="text-[#5F5F5F] hidden md:block">HTP</p>
              <p className="text-[#5F5F5F] hidden md:block">Motivo de alarma</p>
            </div>
          </div>
          {isLoading ? (
            <SkeletonList count={10} />
          ) : alarms.length ? (
            <div className="items-start justify-center w-full md:overflow-y-auto">
              <TableAlarm pacientes={alarms} button={
                <MenuDropDown
                label="Opciones"
                icon={<IconOptions color="white" />}
                items={[
                  {
                    label: "Ver Detalle",
                    icon: <IconOptions color="lightGray" />,
                    onClick: () => {},
                  },
                  {
                    label: "Eliminar",
                    icon: <IconCancel className="w-6"/>,
                    
                  },
                ]}
                
              />
              }/>
            </div>
        ) : (
              <NotFound
                text="No tenes alarmas pendientes."
                sizeText="w-[100%]"
              />
          )}
        </div>
      </div>
    </div>
  );
}


