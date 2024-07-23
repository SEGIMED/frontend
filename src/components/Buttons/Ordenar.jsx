import Image from "next/image";

import ordenar from "@/components/images/ordenar.png";

export default function Ordenar({ funcion }) {
  return (
    <button
      onClick={funcion}
      className="flex px-3 md:px-6 py-2 rounded-xl gap-1 items-center bg-[#487FFA]">
      <p className="text-start text-white font-bold text-base leading-5">
        Ordenar
      </p>
      <div className="hidden md:block">
        <Image src={ordenar} alt="Ordenar" />
      </div>

    </button>
  );
}
