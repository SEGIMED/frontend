"use client";

import { NavPte } from "@/components/navPte/navPte";
import { SidePte } from "./sidebar";
import { useState } from "react";
import { SegiBot } from "@/components/InicioPaciente/chatSegi/SegiBot";
import { SideBarMod } from "@/components/Modularizaciones/SideBarMod";
import { buttonsPaciente } from "@/components/NavDoc/NavbarButtons";
import { NavBarMod } from "@/components/Modularizaciones/NavbarMod";

export default function RootLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="flex h-screen ">
      {/* Barra de navegación */}
      {/* <NavPte isOpen={isOpen} toggleSidebar={toggleSidebar} /> */}
      <SideBarMod isOpen={isOpen} toggleSidebar={toggleSidebar} buttons={buttonsPaciente} />

      <div className="flex flex-col w-full h-[100%]">
        {/* <SidePte search={true} toggleSidebar={toggleSidebar} /> */}
        <NavBarMod search={true} toggleSidebar={toggleSidebar} />
        {/* Contenido principal */}
        <div className="h-[88%] w-[100%]">{children}</div>
      </div>
      <SegiBot />
    </div>
  );
}
