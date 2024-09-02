import Image from "next/image";

import ordenar from "@/components/images/ordenar.png";

export default function Ordenar({ funcion }) {
  return (
    <button
      onClick={funcion}
      className="py-2 px-4 flex bg-[#487FFA] rounded-lg gap-1 items-center">
      <p className="text-start font-Roboto font-bold text-white text-base leading-5 hidden md:block">
        Ordenar
      </p>
      <div className="">
        <Image src={ordenar} alt="Ordenar" />
      </div>
    </button>
  );
}
