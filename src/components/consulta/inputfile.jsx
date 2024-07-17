"use client";

import Image from "next/image";
import circleData from "@/components/images/circleData.png";
import FileUpload from "./file";

export default function InputFile({ title, defaultOpen = false , Links}) {
  return (
    <div className="flex flex-col">
      <details open={defaultOpen}>
        <summary className="flex items-center justify-center gap-1 px-6 py-2 border cursor-pointer">
          <div className="flex items-center">
            <Image src={circleData} alt="" />
            <p className="text-start text-[#5F5F5F] font-bold text-base leading-5">
              {title}
            </p>
          </div>
        </summary>
        
        <FileUpload label={"Electrocardiograma"} Link={Links?.electrocardiogram}/>
        <FileUpload label={"RX de Torax"} Link={Links?.rxThorax}/>
        <FileUpload label={"Ecocardiograma"} Link={Links?.echocardiogram}/>
        <FileUpload label={"Test de caminata"} Link={Links?.walkTest}/>
        <FileUpload label={"Funcional respiratorio"} Link={Links?.respiratoryFunctional}/>
        <FileUpload label={"Tomografías"} Link={Links?.tomographies}/>
        <FileUpload label={"Cateterismo cardiaco derecho"} Link={Links?.rightHeartCatheterization}/>
        <FileUpload label={"CCG (Coronariografia)"} Link={Links?.ccg}/>
        <FileUpload label={"Resonancia"} Link={Links?.resonance}/>
        <FileUpload label={"Cateterismo cardiaco izquierdo"} Link={Links?.leftHeartCatheterization}/>
        <FileUpload label={"Otros estudios"} Link={Links?.laboratoryResults}/>
      </details>
    </div>
  );
}
