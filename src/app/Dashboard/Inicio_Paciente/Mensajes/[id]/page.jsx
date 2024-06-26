"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import IconFatArrow from "@/components/icons/iconFatarrowDash";
import rutas from "@/utils/rutas";

import Chat from "@/components/chat/chat";
import { selectChatById } from "@/redux/slices/chat/chat.js";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

import Elboton from "@/components/Buttons/Elboton";
import IconRegresar from "@/components/icons/iconRegresar";

export default function Ver_MensajesDoc() {
  const params = useParams();
  const targetId = params.id;

  const userId = Cookies.get("c");
  const chat = useSelector((state) =>
    selectChatById(state)([userId, Number(targetId)])
  );

  return chat && chat.target ? (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center gap-2 px-4 py-2 border-b border-b-[#cecece]">
        <div className="flex items-center ">
          <IconFatArrow />
          <p className="text-lg font-normal leading-6 text-[#5F5F5F] ">
            {chat.target.fullName}
          </p>
        </div>
        <div>
          <Link href={`${rutas.PacienteDash}${rutas.Mensajes}`}>
            <Elboton size={"lg"} nombre={"Regresar"} icon={<IconRegresar />} />
          </Link>
        </div>
      </div>
      <Chat chat={chat} />
    </div>
  ) : null;
}
