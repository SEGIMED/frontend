"use client";

import Link from "next/link";
import { useState } from "react";

import Modal from "../modal/Modal";

import LogoSegimed from "../logo/LogoSegimed";

export const NavBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 bg-white flex items-center justify-between fixed top-0 w-full md:w-1/2 z-10">
      <div className=" pl-8">
        <Link href="https://www.segimed.com">
          <LogoSegimed className="w-1/2 md:w-48" />
        </Link>
      </div>

      {/*<div className="flex justify-center gap-10 mr-10">
                <ul className="flex items-center justify-center gap-7 text-[#487FFA] font-bold">
                    <Link href="/about">
                    <li>Sobre Segimed</li>
                    </Link>
                    <li>Nuestros Expertos</li>
                    <li>Testimonios</li>
                </ul> 
            </div>*/}
      <div className="flex justify-center gap-10 mr-10">
        <button
          className="bg-[#487FFA] text-white font-bold py-2 px-4 rounded-md hover:bg-[#70C247] transition duration-300 
                ease-in-out transform hover:scale-105 active:scale-100 active:translate-y-1"
          onClick={openModal}>
          Crear Cuenta
        </button>

        {/* <ul className="flex items-center justify-center gap-7 text-[#487FFA] font-bold">
                <Link href="/accounts/login">  
                    <li className="transition duration-300 ease-in-out transform hover:scale-105 active:scale-100 active:translate-y-1">Iniciar Sesion</li>
                </Link>      
                </ul> */}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};
