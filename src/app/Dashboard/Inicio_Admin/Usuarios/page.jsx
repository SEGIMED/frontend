"use client"
import { useAppSelector } from "@/redux/hooks"
import { useSearchParams, useRouter } from "next/navigation";
import MenuDropDown from "@/components/dropDown/MenuDropDown"
import { PathnameShow } from "@/components/pathname/path"

import IconFilter from "@/components/icons/IconFilter"
import Elboton from "@/components/Buttons/Elboton"
import UserCard from "@/components/card/userCard"
import IconOptions from "@/components/icons/IconOptions";
import IconGeolocation from "@/components/icons/IconGeolocation";
import IconTablillaTilde from "@/components/icons/iconTablillaTilde";
import IconAlarmBlue from "@/components/icons/iconAlarmBlue";
import IconEditar from "@/components/icons/iconEditar";
import IconCancel from "@/components/icons/iconCancel";
import rutas from "@/utils/rutas";
import GeneratePatientButton from "@/components/adminDash/buttonOptionLists/buttonPatientList";

export default function Admin(params) {
    const usuarios=useAppSelector(state=>state.allUsers.allUsers)
    const searchParams = useSearchParams();
    const router=useRouter()
    
    const medicos=usuarios.filter(med=>med.role=== 2)
    const pacientes=usuarios.filter(pte=>pte.role=== 3)
    const dataEntries= usuarios.filter(data=> data.role === 4)
    
    const pacientesQuery = searchParams.get("pacientes") === "true";
    const medicosQuery = searchParams.get("medicos") === "true";
    const dataEntriesQuery = searchParams.get("dataEntries") === "true";

    const medButton= <MenuDropDown 
    label="Opciones"
    icon={<IconOptions color="white" />}
    />

    // const pteButton=<MenuDropDown 
    // label="Opciones"
    // icon={<IconOptions color="white" />}
    // categories={[
    //     {
    //     items:[
    //         {
    //             label:"Editar Paciente",
    //             icon:<IconEditar color="lightGray"/>,
    //             onClick: ()=>{router.push(`${rutas.Admin}${rutas.Usuarios}/${paciente?.id}`)}
    //             },
    //         {
    //             label:"Eliminar Paciente",
    //             icon:<IconCancel className={"w-6"}/>
    //             },
    //         {
    //             label:"Ver Datos Personales",
    //             icon:<IconOptions color="lightGray"/>
    //             },
    //         {
    //             label:"Ver Alarmas Creadas",
    //             icon:<IconAlarmBlue color="lightGray" className={"w-6"}/>
    //             },
    //         {
    //             label:"Ver Historila clinico",
    //             icon: <IconTablillaTilde color="lightGray"/>
    //             },
    //         {
    //             label:"Ver Antiguas Consultas",
    //             icon: <IconTablillaTilde color="lightGray"/>
    //             },
    //         {
    //             label:"Ver Solicitudes",
    //             icon: <IconTablillaTilde color="lightGray"/>
    //             },
    //         {
    //             label:"ver Geolocalizacion",
    //             icon:<IconGeolocation/>
    //             }
    //     ],
    // }
    // ]}
    // />

    const dataEButton=<MenuDropDown 
    label="Opciones"
    icon={<IconOptions color="white" />}
    />

   

    const lastSegmentTextToShow=PathnameShow()
    const title= [<h1 key={0} className="font-bold ml-4">Listado de Pacientes</h1>,
        <h1 key={1} className="font-bold ml-4">Listado de Medicos</h1>,
        <h1 key={2} className="font-bold ml-4">Listado de Data Entries</h1>
    ]
    return (
        <div className="flex flex-col h-full ">
        <title>{lastSegmentTextToShow}</title>
        <div className="flex items-center border-b justify-between border-b-[#cecece] px-2 md:pl-10 md:pr-6 py-2 h-[10%] bg-white sticky top-0 z-10 ">
            <div>
                <Elboton
                nombre="Crear"/>
            </div>
          <div className="flex gap-2 md:gap-4 items-center">
          
            {pacientesQuery && title[0]}
            {medicosQuery && title[1]}
            {dataEntriesQuery && title[2]}
          
          </div>
          <div className="flex items-center">
            <MenuDropDown
             label="Filtrar"
             icon={<IconFilter />}/>
            </div>
        </div>
        <div className="p-4">
            {pacientesQuery && (pacientes.length > 0 ? (
                pacientes.map((paciente) => (
                <UserCard
                    key={paciente.id}
                    role={paciente.role}
                    user={paciente}
                    button={GeneratePatientButton(paciente.id)}
                />
                ))
             ) : (
                <p className=" text-center font-semibold">No hay pacientes para mostrar</p>
            ))}

            {medicosQuery && (medicos.length > 0 ? (
                medicos.map((medico) => (
                <UserCard
                    key={medico.id}
                    role={medico.role}
                    user={medico}
                    button={medButton}
                />
                ))
            ) : (
                <p className=" text-center font-semibold">No hay médicos para mostrar</p>
            ))}

            {dataEntriesQuery && (dataEntries.length > 0 ? (
                dataEntries.map((dataEntry) => (
                <UserCard
                    key={dataEntry.id}
                    role={dataEntry.role}
                    user={dataEntry}
                    button={dataEButton}
                />
                ))
            ) : (
                <p className=" text-center font-semibold">No hay Data Entries para mostrar</p>
            ))}
            </div>
        </div>
    )
}