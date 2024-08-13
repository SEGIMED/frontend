import { Avatar } from "@nextui-org/react";
import Avatars from "../avatar/avatarChat";
import IconMedChat from "../icons/IconMedChat";
import IconRisk from "../icons/iconRisk";

export default function UserCard({ user, button, role }) {
  const specialtiesString = user?.physicianSpecialties
    ?.map((specialty) => specialty.specialty.name)
    .join(" | ");

  return (
    <div className="flex justify-between w-full border-b border-b-[#cecece] px-6 py-2 items-center">
      <div className="flex gap-1 md:gap-5 items-center">
        {role === 2  && <IconMedChat color="gray" />}
        {role === 3  && (
        user?.patientPulmonaryHypertensionRisks?.risk ? (
          <RealColorRisk
            risk={user?.patientPulmonaryHypertensionRisks?.risk}
          />
        ) : (
          <IconRisk color="lightGray" />
        )
        )}
        
        <div className="w-12 h-12 flex justify-center items-center ">
          <Avatars avatar1={user?.avatar} />
        </div>
       
        <span className="text-start text-[#686868] font-normal text-sm md:text-base leading-6 w-36 md:w-fit">
          {user?.name} {user?.lastname}{" "}
        </span>
        {role=== 2  &&
        <span className="hidden md:block">
            {specialtiesString ? ` - ${specialtiesString}` : null}
          </span>}
      </div>
      {role === 3  ? (
        <div className="flex justify-end md:justify-between items-center min-w-[20%] md:gap-6 2xl:gap-14">
          <div className="border-bluePrimary border-1 rounded-lg px-4 py-2 hidden lg:block">
            <div className="text-sm md:text-base text-bluePrimary flex gap-1">
              <p className="hidden md:block">Grupo HTP:</p>
              <p className="font-bold">
                {user.patientPulmonaryHypertensionRisks?.group || "-"}
              </p>
            </div>
          </div>
          {button}
        </div>
      ) : (
         <div>{button}</div> 
      )}
    </div>
  );
}