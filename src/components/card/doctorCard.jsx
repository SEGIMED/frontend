import { Avatar } from "@nextui-org/react";
import Avatars from "../avatar/avatarChat";

export default function DoctorCard({ doctor, button }) {
  const specialtiesString = doctor?.physicianSpecialties
    ?.map((specialty) => specialty.specialty.name)
    .join(" | ");

  return (
    <div className="flex w-full  h-fit border-b border-b-[#cecece] px-4 py-2 md:py-3 items-center">
      <div className="flex gap-1 md:gap-3 items-center w-[80%]">
        <div className="md:w-12 md:h-12 w-8 h-8 flex justify-center items-center">
          <Avatars avatar1={doctor?.avatar} />
        </div>
        <p className="text-start text-[#686868] font-normal items-center text-base flex leading-6">
          {doctor?.name} {doctor?.lastname}{" "}
          <span className="hidden md:block">
            {specialtiesString ? ` - ${specialtiesString}` : null}
          </span>
        </p>
      </div>
      <div className="w-[20%] flex justify-end">{button}</div>
    </div>
  );
}
