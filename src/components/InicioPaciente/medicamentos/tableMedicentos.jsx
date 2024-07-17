"use client";
import TextoMedicament from "./textomedicamentos";
import IconSuspender from "@/components/icons/IconSuspender";
import IconSolicitar from "@/components/icons/IconSolicitar";
import IconMedicamento from "@/components/icons/IconMedicamento";

export default function MedicamentosTable({ medicamento }) {
    return (
        <div className="h-full text-[#686868] w-[100%]">
            <div className="flex border-b border-b-[#cecece]  border-t border-t-[#cecece] px-2">
                <div className="w-[5%] items-center justify-center hidden md:flex">         <IconMedicamento /></div>
                <div className="grid md:grid-cols-6 grid-cols-4 items-center  md:pr-6 py-2 md:px-2 bg-white w-[100%]  md:w-[70%] min-h-14 text-center  font-medium md:font-semibold text-sm md:text-base leading-6 text-bluePrimary md:text-start">
                    <p >{medicamento.name}</p>
                    <p>{medicamento.dose}</p>
                    <p className="hidden md:block" >{medicamento.route}</p>
                    <p>{medicamento.doctor}</p>
                    <p className="hidden md:block">{medicamento.modifiedBy}</p>
                    <p >{medicamento.startDate}</p>
                </div>
                <div className="w-[25%] hidden md:flex gap-5 items-center justify-around">
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
                </div>
            </div>
            <div className="flex w-[100%] px-10 py-5 gap-5 bg-[#fafafc]">
                <TextoMedicament description={medicamento.instructions} label={"Indicaciones:"} />
                <TextoMedicament description={medicamento.observations} label={"Observaciones:"} />
            </div>
            <div className="flex gap-5 md:hidden justify-center py-5">

                <button className="bg-bluePrimary py-2 px-4 items-center flex rounded-lg gap-2 w-[40%]">
                    <IconSolicitar />
                    <p className=" text-white font-bold">
                        Solicitar
                    </p>
                </button>



                <button className="bg-[#E73F3F] py-2 px-4 items-center flex rounded-lg gap-2 w-[40%]">
                    <IconSuspender />
                    <p className="  text-white font-bold">
                        Suspender
                    </p>
                </button>

            </div>
        </div>
    );
}
