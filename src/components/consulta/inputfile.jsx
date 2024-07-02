"use client";

import Image from "next/image";
import circleData from "@/components/images/circleData.png";
import FileUpload from "./file";

export default function InputFile({ title, defaultOpen = false }) {
  return (
    <div className="flex flex-col">
      <details open={defaultOpen}>
        <summary className="flex px-6 py-2 border gap-1 items-center cursor-pointer justify-center">
          <div className="flex items-center">
            <Image src={circleData} alt="" />
            <p className="text-start text-[#5F5F5F] font-bold text-base leading-5">
              {title}
            </p>
          </div>
        </summary>
        <FileUpload label={"Electrocardiograma"} />
        <FileUpload label={"RX de Torax"} />
        <FileUpload label={"Ecocardiograma"} />
        <FileUpload label={"Test de caminata"} />
        <FileUpload label={"Funcional respiratorio"} />
        <FileUpload label={"Tomografías"} />
        <FileUpload label={"Cateterismo cardiaco derecho"} />
        <FileUpload label={"CCG (Coronariografia)"} />
        <FileUpload label={"Resonancia"} />
        <FileUpload label={"Cateterismo cardiaco izquierdo"} />
        <FileUpload label={"Otros estudios"} />
      </details>
    </div>
  );
}
