"use client";

import { NavDoctor } from "@/components/NavDoc/navdoc";
import { SideDoctor } from "./sidebar";
import { useState } from "react";
import { Suspense } from "react";

export default function RootLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="flex h-screen md:h-screen w-screen overflow-y-scroll md:overflow-y-hidden ">
      {/* Barra de navegación */}
      <NavDoctor isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className="flex flex-col w-full h-full">
        <SideDoctor search={true} toggleSidebar={toggleSidebar} />
        {/* Contenido principal */}
        <Suspense fallback={<SkeletonList count={10} />}>
          <div className="h-[88%] w-full">{children}</div>
        </Suspense>
      </div>
    </div>
  );
}
