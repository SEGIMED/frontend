"use client";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useState, useEffect } from "react";
import Link from "next/link";
import DoctorCard from "@/components/card/doctorCard";

import rutas from "@/utils/rutas";
import Elboton from "@/components/Buttons/Elboton";
import IconMensajeBoton from "@/components/icons/IconMensajeBoton";
import { setSearchTerm1 } from "@/redux/slices/doctor/allDoctores";
import { socket } from "@/utils/socketio";
import MensajeSkeleton from "@/components/skeletons/MensajeSkeleton";
import IconOrder from "@/components/icons/IconOrder";
import IconRegresar from "@/components/icons/iconRegresar";
import { setSearchBar } from "@/redux/slices/user/searchBar";

export default function DoctoresPte() {
  const dispatch = useAppDispatch();
  const doctores = useAppSelector((state) => state.doctores.doctores);
  const isLoading = useAppSelector(
    (state) => state.doctores.doctores.length === 0
  );
  const searchTerm1 = useAppSelector((state) => state.doctores.searchTerm1);

  useEffect(() => {
    dispatch(setSearchTerm1(""));
  }, [dispatch]);


  useEffect(() => {
    dispatch(setSearchBar(true));
    return () => {
      dispatch(setSearchBar(false));
    };
  }, [dispatch]);

  const filteredDoctor = doctores?.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchTerm1.toLowerCase()) ||
      doc.lastname.toLowerCase().includes(searchTerm1.toLowerCase())
  );

  if (isLoading) {
    return <MensajeSkeleton />;
  }

  const crearChat = (id) => {
    socket.emit("createChat", { id }, (response) => { });
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex justify-between border-b border-b-[#cecece] px-6 py-2">
        <Elboton nombre={"Ordenar"} size={"lg"} icon={<IconOrder />} />
        <Elboton
          href={`${rutas.PacienteDash}${rutas.Mensajes}`}
          nombre={"Regresar"}
          size={"lg"}
          icon={<IconRegresar />}
        />
      </div>
      <div className=" items-start w-full overflow-y-auto ">
        {filteredDoctor?.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            button={
              <Elboton
                href={`${rutas.PacienteDash}${rutas.Mensajes}/${doctor.id}`}
                nombre={"Enviar Mensaje"}
                icon={<IconMensajeBoton />}
                size={"md"}
                onPress={crearChat(doctor.id)}
              />
            }
          />
        ))}
      </div>
    </div>
  );
}
