"use client";

import { NavModularizada } from "@/components/navAdmin/navAdmin";
import { SideDoctor } from "./sidebar";
import { useState } from "react";
import { Suspense } from "react";
import { SegiBot } from "@/components/InicioPaciente/chatSegi/SegiBot";
import { buttonsDoc } from "@/components/NavDoc/NavbarButtons";
import { NavDoctor } from "@/components/NavDoc/navdoc";
import { SideModularizado } from "@/components/navAdmin/SidebarModularizado";
export default function RootLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="flex h-screen md:h-screen w-screen overflow-y-scroll md:overflow-y-hidden ">
      {/* Barra de navegación */}
      <NavModularizada isOpen={isOpen} toggleSidebar={toggleSidebar} buttons={buttonsDoc} />
      {/* <NavDoctor isOpen={isOpen} toggleSidebar={toggleSidebar} /> */}


      <div className="flex flex-col w-full h-full">
        {/* <SideDoctor search={true} toggleSidebar={toggleSidebar} /> */}
        <SideModularizado search={true} toggleSidebar={toggleSidebar} />
        {/* Contenido principal */}
        <Suspense>
          <div className="h-[88%] w-full">{children}</div>
        </Suspense>
      </div>
      <SegiBot />
    </div>
  );
}
