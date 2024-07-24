"use client";
import LogoSegimed from "@/components/logo/LogoSegimed";
import { FormUser } from "@/components/forms/FormUser";
import IconRegister from "../icons/IconRegister";
import { FooterAcc } from "../footer/footerAcc";
import IconSend from "../icons/IconSend";
import Link from "next/link";
import { NavBar } from "../NavBar/navbar";

export default function Form({ formData, setFormData, hideForm }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col md:flex-row bg-white over">
      <div className="w-full md:w-[50%] h-full flex flex-col">
        <div className="py-5 px-10 flex justify-between">
          <LogoSegimed className="w-1/3 md:w-48" />
          <button
            onClick={hideForm}
            className="bg-[#487FFA] py-3 px-5 flex items-center justify-center rounded-lg text-white font-extrabold gap-2">
            Regresar
          </button>
        </div>
        <div className="h-full w-full flex flex-col items-center justify-center gap-5">
          <p className="text-center text-2xl">Ingrese sus datos</p>
          <div className="overflow-y-auto p-5 w-full">
            <FormUser formData={formData} setFormData={setFormData} />
          </div>
        </div>
        <FooterAcc />
      </div>
      <div className="w-[50%] h-full flex flex-col gap-5 p-10 bg-gradient-to-br from-blue-400 via-blue-600 to-blue-400">
        <div className="w-full h-full flex items-center justify-center">
          <IconRegister className={"w-[400px]"} />
        </div>
        <div className="flex items-center justify-center">
          <p className="text-white text-center">
            SEGIMED es una novedosa plataforma médica interactiva que permite
            una intercomunicación continua entre médicos y pacientes, generando
            un vínculo entre ambos donde quieras que estés.
          </p>
        </div>
      </div>
    </div>
  );
}
