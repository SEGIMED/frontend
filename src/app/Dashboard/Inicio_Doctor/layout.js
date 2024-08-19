"use client";

import { SideBarMod } from "@/components/Modularizaciones/SideBarMod";

import { SideDoctor } from "./sidebar";
import { useState } from "react";
import { Suspense } from "react";
import { SegiBot } from "@/components/InicioPaciente/chatSegi/SegiBot";
import { buttonsDoc } from "@/components/NavDoc/NavbarButtons";
import { NavDoctor } from "@/components/NavDoc/navdoc";
import { NavBarMod } from "@/components/Modularizaciones/NavbarMod";
export default function RootLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="flex h-screen md:h-screen w-screen overflow-y-scroll md:overflow-y-hidden ">
      {/* Barra de navegación */}
      <SideBarMod isOpen={isOpen} toggleSidebar={toggleSidebar} buttons={buttonsDoc} />
      {/* <NavDoctor isOpen={isOpen} toggleSidebar={toggleSidebar} /> */}


      <div className="flex flex-col w-full h-full">
        {/* <SideDoctor search={true} toggleSidebar={toggleSidebar} /> */}
        <NavBarMod search={true} toggleSidebar={toggleSidebar} />
        {/* Contenido principal */}
        <Suspense>
          <div className="h-[88%] w-full">{children}</div>
        </Suspense>
      </div>
      <SegiBot />
    </div>
  );
}
