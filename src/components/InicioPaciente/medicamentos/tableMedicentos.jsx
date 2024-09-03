"use client";
import TextoMedicament from "./textomedicamentos";
import IconSuspender from "@/components/icons/IconSuspender";
import IconSolicitar from "@/components/icons/IconSolicitar";
import IconMedicamento from "@/components/icons/IconMedicamento";
import { Fecha, Hora } from "@/utils/NormaliceFechayHora";
import { useRouter } from "next/navigation";
import rutas from "@/utils/rutas";
import PDFExportComponent from "@/components/pdf/pdfOrder";


export default function MedicamentosTable({ medicamento }) {
    const router = useRouter();
    console.log(medicamento);

    return (
        <div className="h-fit text-[#686868] w-[100%]">
            <div className="flex border-b border-b-[#cecece]  border-t border-t-[#cecece] px-2">
                <div className="w-[5%] bg-white  items-center justify-center hidden md:flex">         <IconMedicamento /></div>
                <div className="grid md:grid-cols-6 grid-cols-3 items-center  md:pr-6 py-2 md:px-2 bg-white w-[100%]  md:w-[70%] min-h-14 text-center  font-medium md:font-semibold text-sm md:text-base leading-6 text-bluePrimary md:text-start">
                    <p >{medicamento.lastModification?.commercialName.name}</p>
                    <p>{medicamento.lastModification?.drugDetailPresentation?.dose}</p>
                    <p  >{medicamento.lastModification?.drugDetailPresentation?.routeOfAdministration?.name}</p>
                    <p className="hidden md:block">{medicamento.physician?.name} {medicamento.physician?.lastname}</p>
                    <p className="hidden md:block">{medicamento.lastModification?.physicianModification?.name} {medicamento.lastModification?.physicianModification?.lastname}</p>
                    <p className="hidden md:block" >{Fecha(medicamento.startTimestamp)} {Hora(medicamento.startTimestamp)}</p>
                </div>
                <div className="w-[25%] bg-white hidden md:flex gap-5 items-center justify-around">
                    <div>
                        <button className="bg-bluePrimary py-2 px-4 items-center flex rounded-lg gap-2 w-full">
                            <IconSolicitar />
                            <p className=" hidden md:block text-white font-bold">
                                Solicitar
                            </p>
                        </button>
                    </div>
                    <div>

                        <button className="bg-[#E73F3F] py-2 px-4 items-center flex rounded-lg gap-2 w-full">
                            <IconSuspender />
                            <p className=" hidden md:block text-white font-bold">
                                Suspender
                            </p>
                        </button>
                    </div>
                    {/* <div>
                        <PDFExportComponent data={medicamento} />
                    </div> */}
                </div>
            </div>
            <div className=" flex-col md:flex-row md:flex w-[100%] px-10 py-5 gap-5 space-y-4 md:space-y-0 bg-[#fafafc]">
                <TextoMedicament className={"md:hidden block"} size={"min-h-12"} description={medicamento.doctor} label={"Médico:"} />
                <TextoMedicament className={"md:hidden block"} size={"min-h-12"} description={medicamento.startDate} label={"Fecha de Inicio:"} />
                <TextoMedicament className={"md:hidden block"} size={"min-h-12"} description={medicamento.modifiedBy} label={"Modificado por poraciones:"} />
                <TextoMedicament description={medicamento.lastModification?.indications} size={"min-h-24"} label={"Indicaciones:"} />
                <TextoMedicament description={medicamento.lastModification?.observations} size={"min-h-24"} label={"Observaciones:"} />
            </div>
            <div className="flex gap-5 bg-[#fafafc] md:hidden justify-center py-5">

                <button
                    className="bg-bluePrimary py-2 px-4 items-center flex rounded-lg gap-2 w-[40%]"
                    // onClick={() => router.push(`${rutas.PacienteDash2}${rutas.Solicitudes}`)}
                    onClick={() => console.log("hola")
                    }
                >
                    <IconSolicitar />
                    <p className="text-white font-bold">Solicitar</p>
                </button>



                <button className="bg-[#E73F3F] py-2 px-4 items-center flex rounded-lg gap-2 w-[40%]">
                    <IconSuspender />
                    <p className="  text-white font-bold">
                        Suspender
                    </p>
                </button>
            </div>
        </div >
    );
}
