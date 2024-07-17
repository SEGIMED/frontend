import Avatars from "../avatar/avatarChat";
import LastLogin from "@/utils/lastLogin";
import avatar from "@/utils/defaultAvatar";

export default function DoctorCardConsulta({ doctor, button, consulta }) {
  const specialtiesString = doctor?.specialties
    ?.map((specialty) => specialty.name)
    .join(" ");

  const getStatusTextAndColor = (status) => {
    switch (status) {
      case 1: // Agendada
        return { text: "Agendada", color: "text-[#686868]" }; // Color normal
      case 2: // Atendida
        return { text: "Atendida", color: "text-green-500" }; // Verde
      case 3: // Cancelada
        return { text: "Cancelada", color: "text-red-500" }; // Rojo
      case 4: // No atendida
        return { text: "No atendida", color: "text-red-500" }; // Rojo
      default:
        return { text: "Desconocido", color: "text-[#686868]" }; // Color por defecto
    }
  };

  const status = getStatusTextAndColor(doctor?.schedulingStatus);

  return (
    <div className="flex justify-between w-full border-b border-b-[#cecece] px-2 md:px-6 py-2 items-center">
      <div className="flex gap-1 md:gap-3 items-center w-[90%]">
        <div className="flex gap-2 w-[40%] md:w-[20%] items-center">
          <div className="w-10 h-10 flex justify-center items-center">
            <Avatars
              avatar1={
                doctor?.physicianThatAttend?.avatar
                  ? doctor.physicianThatAttend.avatar
                  : avatar
              }
            />
          </div>
          <p className="text-start text-[#686868] font-normal text-base leading-6">
            {doctor?.physicianThatAttend?.name}{" "}
            {doctor?.physicianThatAttend?.lastname} -{" "}
            {specialtiesString ?? null}
          </p>
        </div>
        <div className="flex gap-3 items-center justify-center text-center md:w-[70%] w-[60%]">
          <p className="text-center md:w-1/2 text-[#686868] font-normal text-base leading-6">
            {doctor?.reasonForConsultation}
          </p>
          <p className="text-center md:w-1/4 text-[#686868] font-normal text-base leading-6 hidden md:block">
            {LastLogin(doctor?.scheduledEndTimestamp)}
          </p>
          <p
            className={`text-center md:w-1/4 font-normal text-base leading-6 ${status?.color}`}>
            {status?.text}
          </p>
        </div>
      </div>
      {button}
    </div>
  );
}
