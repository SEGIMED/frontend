import { Avatar } from "@nextui-org/react";
import Avatars from "../avatar/avatarChat";

export default function DoctorCard({ doctor, button }) {
  const specialtiesString = doctor?.specialties
    ?.map((specialty) => specialty.name)
    .join(" ");

  return (
    <div className="flex justify-between h-fit border-b border-b-[#cecece] px-6 py-2 md:py-3 items-center">
      <div className="flex gap-3 items-center">
        <div className="md:w-10 md:h-10 w-8 h-8 flex justify-center items-center">
          {/* <Avatars avatar={doctor.avatar} /> */}
          <Avatar
            isBordered
            src={doctor.avatar}
            className="md:w-10 md:h-10 w-8 h-8"
          />
        </div>
        <p className="text-start text-[#686868] font-normal text-base leading-6">
          {doctor?.name} {doctor?.lastname}
          {specialtiesString ? specialtiesString : null}
        </p>
      </div>
      {button}
    </div>
  );
}
