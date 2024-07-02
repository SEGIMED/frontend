"use client";

import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import Image from "next/image";
import sendIconSugerencias from "@/components/images/sendIconSugerencias.png";
import { ApiSegimed } from "@/Api/ApiSegimed";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

export default function HomePte() {
  const user = useAppSelector((state) => state.user);
  const [content, setContent] = useState("");

  const sugerencia = async () => {
    const token = Cookies.get("a");
    const myID = Cookies.get("c");
    const body = {
      requestingUserId: Number(myID),
      title: `Sugerencia de ${user.name} ${user.lastname}`,
      content: content,
    };
    const headers = { headers: { token: token } };

    try {
      const response = await ApiSegimed.post("/requestUserContact", body, headers);

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Sugerencia enviada con éxito",
          text: "Cada sugerencia será considerada cuidadosamente para mejorar nuestro sitio web y los servicios que ofrecemos. ¡Gracias!",
        });
      }
    } catch (error) {
      if (error) {
        Swal.fire({
          icon: "error",
          title: "Error al enviar la sugerencia",
          text: error.message,
        });
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sugerencia();
    setContent("");
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-col items-center justify-start md:m-auto w-full px-4 md:px-40">
        <div className="pt-4 md:pt-10">
          <p className="text-center text-[#333333] font-semibold text-2xl leading-7 mb-7">
            Envie sus sugerencias a nuestro equipo
          </p>
          <p className="text-center text-[#5F5F5F] font-normal text-xl leading-7 mb-10">
            Sus comentarios son importantes para nosotros y cada sugerencia será
            considerada cuidadosamente para mejorar nuestro sitio web y los
            servicios que ofrecemos.
            <hr />
            ¡Gracias por tomarse el tiempo de ayudarnos a mejorar! Asegúrese de
            proporcionar detalles claros y concisos para que podamos entender y
            actuar según sus recomendaciones de manera efectiva.
          </p>
        </div>
        <form className="flex flex-col justify-center text-start w-full" onSubmit={handleSubmit}>
          <p className="text-start text-[#5F5F5F] font-medium text-lg leading-5 mb-2">
            Ingrese aquí su sugerencia
          </p>
          <textarea
            className="border-2 rounded-md border-[#cecece] outline-none p-2 min-h-40 text-[#5F5F5F]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                handleSubmit(e);
              }
            }}
          />
          <div className="text-center flex justify-center mt-5">
            <button
              type="submit"
              className="text-white text-center bg-[#70C247] px-10 py-3 rounded-md flex items-center gap-2 justify-center hover:scale-105 active:scale-100 active:translate-y-1 w-fit"
            >
              Enviar sugerencias <Image src={sendIconSugerencias} alt="" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

