import Elboton from "@/components/Buttons/Elboton";
import Image404 from "@/components/icons/Image404";
import LogoSegimed from "@/components/logo/LogoSegimed";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col  h-screen bg-gray-100">
      <div className=" pt-5 md:pl-7 pl-0 h-[10%] justify-center flex md:justify-start">
        <LogoSegimed className="w-48 h-20" />
      </div>
      <div className="flex flex-col items-center justify-center  h-[90%] gap-8 md:gap-6 ">
        <div>
          <Image404 />
        </div>
        <p className="text-bluePrimary leading-6 text-6xl  font-semibold md:text-6xl  ">
          ¡Oops!
        </p>
        <p className="text-bluePrimary leading-6 text-center text-2xl  font-normal md:text-4xl ">
          No encontramos lo que estás buscando.
        </p>
        <Elboton nombre="Volver a Inicio" href="/" className="px-6" />
      </div>
    </div>
  );
}
