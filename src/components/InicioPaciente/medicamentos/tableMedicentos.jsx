"use client";
import TextoMedicament from "./textomedicamentos";
import IconSuspender from "@/components/icons/IconSuspender";
import IconSolicitar from "@/components/icons/IconSolicitar";
import IconMedicamento from "@/components/icons/IconMedicamento";
import { Fecha, Hora } from "@/utils/NormaliceFechayHora";
import { useRouter } from "next/navigation";
import rutas from "@/utils/rutas";
import PDFExportComponent from "@/components/pdf/pdfOrder";
import IconDownload from "@/components/icons/IconDownload";

export default function MedicamentosTable({ medicamentos }) {
    const router = useRouter();

    return (
        <div className="h-full text-[#686868] w-full ">
            {medicamentos.map((medicamento, index) => (

                <div key={index}>
                    {console.log(medicamento)}

                    <div className="flex border-b border-b-[#cecece] border-t border-t-[#cecece] px-2">
                        <div className="w-[5%] bg-white items-center justify-center hidden md:flex">
                            <IconMedicamento />
                        </div>
                        <div className="grid md:grid-cols-6 grid-cols-3 items-center md:pr-6 py-2 md:px-2 bg-white w-[100%] md:w-[70%] min-h-14 text-center font-medium md:font-semibold text-sm md:text-base leading-6 text-bluePrimary md:text-start">
                            <p>{medicamento.lastModification?.commercialName.name}</p>
                            <p>{medicamento.lastModification?.drugDetailPresentation?.dose}</p>
                            <p>{medicamento.lastModification?.drugDetailPresentation?.routeOfAdministration?.name}</p>
                            <p className="hidden md:block">{medicamento.physician?.name} {medicamento.physician?.lastname}</p>
                            <p className="hidden md:block">{medicamento.lastModification?.physicianModification?.name} {medicamento.lastModification?.physicianModification?.lastname}</p>
                            <p className="hidden md:block">{Fecha(medicamento.startTimestamp)} {Hora(medicamento.startTimestamp)}</p>
                        </div>
                        <div className="w-[25%] bg-white hidden md:flex gap-5 items-center justify-end">
                            <div className="flex gap-3">
                                <button
                                    className="bg-bluePrimary py-2 px-4 items-center flex rounded-lg gap-2 w-full"
                                    onClick={() => router.push(`${rutas.PacienteDash}${rutas.Solicitudes}?id=${medicamento.physicianId}`)}>
                                    <IconSolicitar />
                                    <p className="hidden md:block text-white font-bold">Solicitar</p>
                                </button>
                                <a
                                    href={medicamento?.lastModification?.medicalOrder?.orderPdf}
                                    download
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <button className="bg-bluePrimary text-white py-2 px-4 items-center flex rounded-lg gap-2">
                                        <IconDownload />
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="flex-col h-full md:flex-row md:flex w-[100%] space-y-5 py-5 md:space-y-0 px-10 gap-5 bg-[#fafafc]">
                        <TextoMedicament
                            className={"md:hidden block"}
                            size={"min-h-12"}
                            description={`${medicamento.physician?.name} ${medicamento.physician?.lastname}`}
                            label={"Médico:"}
                        />
                        <TextoMedicament
                            className={"md:hidden block"}
                            size={"min-h-12"}
                            description={`${Fecha(medicamento.startTimestamp)} ${Hora(medicamento.startTimestamp)}`}
                            label={"Fecha de Inicio:"}
                        />
                        <TextoMedicament
                            className={"md:hidden block"}
                            size={"min-h-12"}
                            description={`${medicamento.lastModification?.physicianModification?.name ?? ''} ${medicamento.lastModification?.physicianModification?.lastname ?? ''}`}
                            label={"Modificado por:"}
                        />
                        {medicamento.lastModification?.indications && medicamento.lastModification?.observations ? (
                            <>
                                <TextoMedicament
                                    description={medicamento.lastModification?.indications}
                                    size={"min-h-24"}
                                    label={"Indicaciones:"}
                                />
                                <TextoMedicament
                                    description={medicamento.lastModification?.observations}
                                    size={"min-h-24"}
                                    label={"Observaciones:"}
                                />
                            </>
                        ) : null}
                        <div className="flex gap-5   bg-[#fafafc] md:hidden justify-center">
                            <button
                                className="bg-bluePrimary py-2 px-4 items-center flex rounded-lg gap-2 w-[40%]"
                                onClick={() => router.push(`${rutas.PacienteDash}${rutas.Solicitudes}`)}
                            >
                                <IconSolicitar />
                                <p className="text-white font-bold">Solicitar</p>
                            </button>
                            <a
                                href={medicamento?.lastModification?.medicalOrder?.orderPdf}
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <button className="bg-bluePrimary text-white py-2 px-4 items-center flex rounded-lg gap-2">
                                    <IconDownload />
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}