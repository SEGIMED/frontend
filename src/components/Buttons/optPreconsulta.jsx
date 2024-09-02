"use client";

import rutas from "@/utils/rutas";
import IconArrowLeft from "../icons/IconArrowLeft";
import IconArrowNext from "../icons/IconArrowNext";
import IconNext from "../icons/IconNext";
import IconArrowRight from "../icons/iconArrowRight";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Ver({ id, ruta }) {
  const router = useRouter();
  return (
    <>
      <button
        className="flex px-3 py-2 bg-[#487FFA] rounded-lg gap-1 items-center"
        onClick={() => {
          router.push(ruta);
        }}>
        <p className="text-start text-white font-bold text-base leading-5">
          Ver
        </p>
        <IconArrowRight iconColor="white" className="hidden md:block" />
      </button>
    </>
  );
}
