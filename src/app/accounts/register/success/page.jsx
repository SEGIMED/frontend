"use client";

import IconVerify from "@/components/icons/IconVerify";
import { NavBar } from "@/components/NavBar/navbar";

export default function Success() {
  return (
    <div className="w-full h-screen flex flex-col md:flex-row bg-white">
      <div className="w-full md:w-[50%] h-full flex flex-col justify-around">
        <NavBar />
        <div className="h-[80%] md:h-full w-full flex flex-col items-center justify-center gap-5 p-5">
          <IconVerify className="h-1/3 xs:h-1/2 md:hidden block" />
          <h1 className="text-center text-3xl md:text-4xl font-semibold">
            ¡Registro Completo!
          </h1>
          <div className="text-justify md:text-center md:text-lg text-base">
            <p>!Gracias por registrarte en Segimed!</p>
            <p className="font-bold">
              Por favor, revisa tu correo electrónico y haz clic en el enlace de
              verificación para activar tu cuenta.
            </p>
            <p>
              Si no encuentras el correo, revisa tu carpeta de spam o correo no
              deseado. Puedes solicitar un nuevo envío si es necesario.
            </p>
          </div>
        </div>
      </div>
      <div className="w-[50%] hidden md:flex h-full  flex-col justify-around gap-5 p-10 bg-gradient-to-br from-blue-400 via-blue-600 to-blue-400">
        <div className="flex items-center justify-center flex-1">
          <div className="w-[80%] h-full flex items-center justify-center">
            <IconVerify className="h-full" />
          </div>
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
