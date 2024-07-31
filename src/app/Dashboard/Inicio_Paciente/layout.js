"use client";

import { NavPte } from "@/components/navPte/navPte";
import { SidePte } from "./sidebar";
import { useState } from "react";
import { SegiBot } from "@/components/InicioPaciente/chatSegi/SegiBot";

export default function RootLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="flex h-screen w-screen">
      {/* Barra de navegación */}
      <NavPte isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className="flex flex-col w-full h-full">
        <SidePte search={true} toggleSidebar={toggleSidebar} />
        {/* Contenido principal */}
        <div className="h-[88%] w-full">{children}</div>
      </div>
      <SegiBot />
    </div>
  );
}
