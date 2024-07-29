"use client"; // Error components must be Client Components

import { ApiSegimed } from "@/Api/ApiSegimed";
import Elboton from "@/components/Buttons/Elboton";
import Image404 from "@/components/icons/Image404";
import LogoSegimed from "@/components/logo/LogoSegimed";
import { Button } from "@nextui-org/react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Error({ error }) {
  const [showReport, setShowReport] = useState(false);
  const [report, setReport] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const handleError = () => {
    return () => {
      router.back();
    };
  };
  const sendReport = async () => {
    const token = Cookies.get("a");
    const myID = Cookies.get("c");
    const errorMessages = error?.message;
    const body = {
      requestingUserId: Number(myID),
      title: `Reporte ${pathname}`,
      content: report + " Error: " + errorMessages,
    };
    const headers = { headers: { token: token } };

    try {
      const response = await ApiSegimed.post(
        "/requestUserContact",
        body,
        headers
      );

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Reporte enviado con éxito",
          text: "Cada reporte será considerado cuidadosamente para mejorar nuestro sitio web y los servicios que ofrecemos. ¡Gracias!",
        }).then(() => {
          router.back();
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col gap-4 h-screen bg-[#FAFAFC]">
      <div className=" pt-4 md:pl-7 pl-0 h-[10%] justify-center flex md:justify-start">
        <LogoSegimed className="w-48" />
      </div>
      <div className="flex flex-col items-center justify-center h-[90%] gap-6 ">
        <div className="h-1/2 md:h-fit">
          <Image404 />
        </div>

        {showReport ? (
          <div className="w-[90%] md:w-1/2 flex flex-col gap-2 items-center space-y-2">
            <div className="bg-[#FFECEC] border border-[#E73F3F] text-[#E73F3F]  px-4 py-3 rounded relative">
              <span className="block sm:inline">
                <strong className="font-bold">Error: </strong>
                {error?.message || "Error desconocido"}
              </span>
            </div>

            <p className="leading-6 text-center text-xl text-[#E73F3F] font-medium md:text-2xl ">
              ¿Qué sucedió?
            </p>
            <textarea
              className="w-full md:h-20 h-1/3 p-2 border border-gray-300 rounded-md"
              value={report}
              onChange={(e) => setReport(e.target.value)}
              placeholder="Describa el error que encontró"
            />
            <div className="flex flex-col gap-2">
              <Elboton
                nombre="Enviar Reporte"
                onPress={handleError()}
                className="bg-[#E73F3F] text-white"
              />
              <Elboton
                nombre="Volver atrás"
                className="border-0 px-6  text-bluePrimary bg-[#FAFAFC]"
                onPress={handleError()}
              />
            </div>
          </div>
        ) : (
          <>
            <p className="text-bluePrimary leading-6 text-6xl  font-semibold md:text-6xl  ">
              ¡Oops!
            </p>
            <p className="text-bluePrimary leading-6 text-center text-2xl  font-normal md:text-4xl ">
              Ocurrió un error inesperado.
            </p>
          </>
        )}
        {!showReport && (
          <div className="flex flex-col gap-2">
            <Elboton
              nombre="Volver atrás"
              onPress={handleError()}
              className="px-6"
            />

            <Button
              color="danger"
              className="border-0 text-red-500 bg-[#FAFAFC]"
              onClick={() => setShowReport(!showReport)}>
              Reportar Error
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
