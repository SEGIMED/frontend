"use client"
import { PathnameShow } from "@/components/pathname/path"
import { useAppSelector } from "@/redux/hooks"

export default function Admin(params) {
    const usuarios=useAppSelector(state=>state.allUsers.allUsers)
    
    const medicos=usuarios.filter(med=>med.role=== 2)
    const pacientes=usuarios.filter(pte=>pte.role=== 3)
    const dataEntries= usuarios.filter(data=> data.role === 4)

    console.log(dataEntries)

    const lastSegmentTextToShow=PathnameShow()
    const title= [<h1 key={"a"} className="font-bold ml-4">Listado de Pacientes</h1>,
        <h1 key={"b"} className="font-bold ml-4">Listado de Medicos</h1>,
        <h1 key={"c"} className="font-bold ml-4">Listado de Data Entries</h1>
    ]
    return (
        <div className="flex flex-col h-full ">
        <title>{lastSegmentTextToShow}</title>
        <div className="flex items-center border-b justify-between border-b-[#cecece] px-2 md:pl-10 md:pr-6 py-2 h-[10%] bg-white sticky top-0 z-10 ">
          <div className="flex gap-2 md:gap-4 items-center">
          <h1 className="font-bold ml-4">Listado de pacientes</h1>
          <div className="flex items-center">
            </div>
            </div>
        </div>
        </div>
    )
}