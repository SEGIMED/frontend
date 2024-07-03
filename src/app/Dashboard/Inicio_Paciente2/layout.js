"use client";

import { SidePte } from "./sidebar";
import { useState } from "react";
import { SegiBot } from "@/components/InicioPaciente/SegiBot";

export default function RootLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="flex h-screen w-screen bg-[#FAFAFC]">
      <div className="flex flex-col w-full h-full gap-8">
        <SidePte search={true} toggleSidebar={toggleSidebar} />
        {/* Contenido principal */}
        <div className="h-[88%] w-full">{children}</div>
      </div>
      <SegiBot />
    </div>
  );
}
