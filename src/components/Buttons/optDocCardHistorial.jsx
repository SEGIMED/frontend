"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import rutas from "@/utils/rutas";

import IconCorazonMini from "../icons/iconCorazon";
import IconPersonalData from "../icons/IconPersonalData";
import IconInfo from "../icons/IconInfo";
import opciones from "@/components/images/opciones.png";
import ReviewModal from "../modal/ReviewModal";
import IconOptions from "../icons/IconOptions";

export default function OptDocCardHistorial({ id }) {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  return (
    <div className="relative">
      <details className="relative">
        <summary className="flex px-1 py-2 text-white bg-[#487FFA] rounded-xl gap-1 items-center cursor-pointer">
          <IconOptions color="#FFFFFF" />
          <p className="text-start text-white font-bold text-base leading-5">
            Más
          </p>
        </summary>
        <ul className="absolute bg-white z-40 p-2 text-start text-[#686868] font-normal text-base leading-6 w-64 right-0 border-2 border-[#D7D7D7] rounded-lg gap-4 mt-2 shadow-lg">
          <li className="flex items-center gap-2 font-medium text-sm leading-4">
            <IconInfo />
            Información
          </li>
          <li
            className="font-normal text-base leading-8 ml-6 flex items-center gap-2 cursor-pointer"
            onClick={() => setIsReviewModalOpen(true)}>
            <IconCorazonMini />
            Dejar review
          </li>
          {/* <Link href={`${rutas.PacienteDash}${rutas.Tratamientos}/${id}`}>
            <li className="font-normal text-base leading-8 ml-6 flex items-center gap-2">
              <IconPersonalData />
              Ver Tratamiento
            </li>
          </Link> */}
        </ul>
      </details>
      {isReviewModalOpen && (
        <ReviewModal onClose={() => setIsReviewModalOpen(false)} idDoc={id} />
      )}
    </div>
  );
}
