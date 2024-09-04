"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import IconCorazonMini from "@/components/icons/iconCorazon";
import IconPersonalData from "../icons/IconPersonalData";
import IconInfo from "../icons/IconInfo";
import opciones from "@/components/images/opciones.png";
import ReviewModalApte from "@/components/modal/ReviewModalApte";
import rutas from "@/utils/rutas";

export default function OptPteHistorial({ paciente, ruta, id }) {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const ruter = useRouter();

  return (
    <div className="relative w-fit">
      <details className="relative">
        <summary className="flex justify-center px-2 md:px-6 py-2 text-white rounded-lg gap-3 bg-[#487FFA] items-center cursor-pointer">
          <Image src={opciones} alt="Opciones" />
          <p className="text-start text-white font-bold text-sm md:text-base leading-5">
            Más
          </p>
        </summary>
        <ul className="absolute bg-white z-40 p-2 text-start text-[#686868] font-normal text-base leading-6 w-64 right-0 border-2 border-[#D7D7D7] rounded-lg gap-4 mt-2 shadow-lg">
          <li className="flex items-center gap-2 font-medium text-sm leading-4">
            <IconInfo />
            Información
          </li>
          <button onClick={() => setIsReviewModalOpen(true)}>
            <li className="font-normal text-base leading-8 ml-6 flex items-center gap-2">
              <IconCorazonMini />
              Dejar review
            </li>
          </button>
          <li className="font-normal text-base leading-8 ml-6 flex items-center gap-2">
            <button
              onClick={() => {
                ruter.push(`${ruta}`);
              }}
              className="flex items-center gap-2">
              <IconPersonalData />
              Ver consultas
            </button>
          </li>
        </ul>
      </details>
      {isReviewModalOpen && (
        <ReviewModalApte onClose={() => setIsReviewModalOpen(false)} id={id} />
      )}
    </div>
  );
}
