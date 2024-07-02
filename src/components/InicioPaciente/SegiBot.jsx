import Image from "next/image";
import Segi from "@/components/InicioPaciente/segi.png";
export const SegiBot = () => {
  return (
    <div className="fixed z-30 h-20 w-20 md:h-28 md:w-28 md:p-2 bottom-[4%] right-[5%] rounded-full bg-[#487FFA]">
      <Image src={Segi} alt="SegiBot" />
    </div>
  );
};
