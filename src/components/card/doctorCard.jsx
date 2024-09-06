import { Avatar } from "@nextui-org/react";
import Avatars from "../avatar/avatarChat";
import IconMedChat from "../icons/IconMedChat";

export default function DoctorCard({ doctor, button }) {
  const specialtiesString = doctor?.physicianSpecialties
    ?.map((specialty) => specialty.specialty.name)
    .join(" | ");

  return (
    <div className="flex justify-between w-full border-b border-b-[#cecece] px-6 py-2 items-center">
      <div className="flex gap-1 md:gap-5 items-center">
        <IconMedChat color="gray" className="w-6 h-6" />
        <div className="w-12 h-12 flex justify-center items-center ">
          <Avatars avatar1={doctor?.avatar} />
        </div>

        <span className="text-start text-[#686868] font-normal text-sm md:text-base leading-6 w-36 md:w-fit">
          {doctor?.name} {doctor?.lastname}{" "}
        </span>
        <span className="hidden md:block">
          {specialtiesString ? ` - ${specialtiesString}` : null}
        </span>
      </div>
      <div className="w-1/5 lg:w-fit">{button}</div>
    </div>
  );
}
