"use client";
import Link from "next/link";
import Modal from "../modal/Modal";
import IconHeadLanding from "../icons/IconHeadLanding";
import { useState } from "react";

const HeadLanding = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full h-full">
      <div className=" text-white grid grid-cols-2 px-20 py-10 w-full bg-gradient-to-br from-[#8DB1FF] to-[#2060ED]">
        <div className="flex flex-col items-center justify-center gap-10 w-full px-10">
          <h1 className="text-4xl font-extrabold text-left capitalize">
            La primera aplicación en el monitoreo de hipertensión pulmonar.
          </h1>
          <p className="text-left mb-8">
            SEGIMED es una novedosa plataforma médica interactiva que permite
            una intercomunicación continua entre médicos y pacientes, generando
            un vínculo entre ambos donde quieras que estés.
          </p>
          <div className="flex items-center justify-center gap-20">
            <button
              className="p-3 bg-white text-[#305595] rounded-md w-52 font-bold"
              onClick={openModal}>
              Crear Cuenta
            </button>

            <Link href="/accounts/login">
              <span className="text-white font-extrabold">Iniciar Sesion</span>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center w-full">
          <IconHeadLanding />
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default HeadLanding;
