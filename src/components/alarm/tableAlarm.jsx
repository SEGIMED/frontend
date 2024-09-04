"use client";
import React from "react";
import IconAlarmGreen from "../icons/iconAlarmGreen";
import IconAlarmYellow from "../icons/IconAlarmYellow";
import IconAlarmRed from "@/components/icons/iconAlarmRed";
import IconCurrentRouteNav from "../icons/IconCurrentRouteNav";
import AlarmButtonDoc from "../Buttons/alarmButtonDoc";
import { useRouter } from "next/navigation";
import { ApiSegimed } from "@/Api/ApiSegimed";
import Cookies from "js-cookie";
import rutas from "@/utils/rutas";
import MenuDropDown from "../dropDown/MenuDropDown";
import IconAccion from "../icons/IconAccion";
import IconTablillaTilde from "../icons/iconTablillaTilde";
import Swal from "sweetalert2";
import IconOptions from "../icons/IconOptions";
import { Fecha, Hora } from "@/utils/NormaliceFechayHora";
import IconAlarmBlue from "../icons/iconAlarmBlue";

const PriorityIcon = ({ priority }) => {
  switch (priority) {
    case "Alta":
      return <IconAlarmRed className="md:w-8 w-[75%]" />;
    case "Media":
      return <IconAlarmYellow className="md:w-8 w-[75%]" />;
    case "Baja":
      return <IconAlarmGreen className="md:w-8 w-[75%]" />;
    case "Indefinida":
      return <IconAlarmBlue color={"gray"} className="md:w-8 w-[75%]" />;
  }
};

export default function TableAlarm({ alarms }) {
  const handleStatus = async ({ id }) => {
    Swal.fire({
      icon: "question",
      title: "Marcar como resuelta",
      confirmButtonText: "Si",
      showCancelButton: true,
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const body = { solved: true };
        try {
          const response = await ApiSegimed.patch(
            `/edit-alarm-event/${id}`,
            body
          );
          if (response.data) {
            await Swal.fire({
              title: "Alarma resuelta",
              icon: "success",
              confirmButtonColor: "#487FFA",
              confirmButtonText: "Aceptar",
            });
          }
        } catch (error) {
          console.error("Error al intentar actualizar la alarma:", error);
        }
      }
    });
  };
  const sortAlarms = (alarms) => {
    const priorityMap = {
      Alta: 3,
      Media: 2,
      Baja: 1,
      Indefinida: 0,
    };

    return alarms.sort((a, b) => {
      if (priorityMap[a.ia_priority] !== priorityMap[b.ia_priority]) {
        return priorityMap[b.ia_priority] - priorityMap[a.ia_priority];
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  };
  const sortedAlarms = sortAlarms(alarms);
  return (
    <div className="flex flex-col">
      <div className="">
        {sortedAlarms?.map((alarm, index) => (
          <div
            key={index}
            className="w-[100%] flex border-b border-b-[#cecece] py-2 items-center">
            <div className="w-[12%] md:w-[5%] items-center flex justify-center">
              <PriorityIcon priority={alarm?.ia_priority} />
            </div>
            <div className="text-center w-[70%] md:w-[75%] md:text-start gap-3  grid grid-cols-3 md:grid-cols-5 items-center py-2 bg-white h-fit ">
              <span className="hidden md:flex items-center justify-between pr-6 ">
                {alarm?.ia_priority}
                <IconCurrentRouteNav className="w-[1.5rem] hidden md:block " />
              </span>
              <div className="text-[#5F5F5F]">{Fecha(alarm?.createdAt)}</div>
              <div className="text-[#5F5F5F]">{Hora(alarm?.createdAt)}</div>
              <p className=" text-[#686868] font-normal  md:text-base leading-6  line-clamp-2">
                {alarm?.patient.name} {alarm?.patient.lastname}
              </p>

              {/* <div className="text-[#5F5F5F] hidden md:block ">
                {" "}
                {alarm?.htp_group || "No asignado"}
              </div> */}
              <div className="text-[#5F5F5F] hidden md:line-clamp-2">
                {alarm?.alarm_description}
              </div>
            </div>
            <div className="w-[18%] md:w-[20%] items-center justify-center flex">
              <MenuDropDown
                icon={<IconOptions color="white" />}
                items={[
                  {
                    label: "Ver Detalle",
                    icon: <IconTablillaTilde />,
                    href: `${rutas.Doctor}${rutas.Alarm}/${alarm?.id}`,
                  },

                  {
                    label: "Marcar resuelta",
                    icon: <IconAccion />,
                    onClick: () => handleStatus({ id: alarm?.id }),
                  },
                ]}
                label="Opciones"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
