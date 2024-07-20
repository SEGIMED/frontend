import Avatars from "../avatar/avatarChat";
import LastLogin from "@/utils/lastLogin";
import avatar from "@/utils/defaultAvatar";
import IconTablillaTilde from "../icons/iconTablillaTilde"
import { Hora, Fecha } from "@/utils/NormaliceFechayHora";

export default function DoctorCardConsulta({ doctor, button }) {
  console.log(doctor);
  
  return (
    <div className="flex flex-col">
      <div
        className="grid md:grid-cols-6 grid-cols-4 items-center border-b border-b-[#cecece] md:pr-6 py-2 md:px-2 bg-white w-full h-14 text-center md:text-start"
          >
            <div className="text-[#5F5F5F] flex items-center justify-center md:justify-start gap-1 md:gap-4">
              <IconTablillaTilde />
              {Fecha(doctor?.scheduledStartTimestamp)}
            </div>
            <div className="text-[#5F5F5F]">{Hora(doctor?.scheduledStartTimestamp)}</div>
            <div className="text-[#5F5F5F]">{doctor?.physicianThatAttend?.name} {doctor?.physicianThatAttend?.lastname}</div>
            <div className="text-[#5F5F5F] hidden md:block">{doctor?.healthCenter === 1 ? "Centro Gallegos" : "Otro Centro" }</div>
            <div className="text-[#5F5F5F] hidden md:block">{doctor?.reasonForConsultation}</div>

            <div className="text-[#5F5F5F] ">{button}</div>
          </div>
    </div>
  );
}

