"use client";
import Link from "next/link";
import React, { useState } from "react";
import IconDoctor from "@/components/icons/IconDoctor";
import IconUser from "@/components/icons/IconUser";
import Form from "../forms/Form";

const Modal = ({ isOpen, onClose }) => {
  const [showUserForm, setShowUserForm] = useState(false);
  const [hoverDoctor, setHoverDoctor] = useState(false);
  const [hoverPatient, setHoverPatient] = useState(false);
  const [formData, setFormData] = useState({ role: 0 });

  const handleDoctorClick = () => {
    setFormData({ ...formData, role: 2 });
    onClose();
    setShowUserForm(true);
  };

  const handlePatientClick = () => {
    setFormData({ ...formData, role: 3 });
    onClose();
    setShowUserForm(true);
  };

  const handleClose = () => {
    setShowUserForm(false);
    onClose();
  };

  const handleHideForm = () => {
    setShowUserForm(false);
  };

  return isOpen && !showUserForm ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative z-50 bg-white md:p-10 rounded-lg w-[90%] md:w-[45rem] h-fit py-8 lg:h-[39rem] flex flex-col items-center gap-5">
        <div className="h-full w-full flex flex-col items-center justify-between">
          <div className="h-full flex flex-col items-center justify-center gap-6">
            <p className="font-semibold text-3xl text-center">
              Continuar como:
            </p>
            <div className="flex flex-col items-center gap-10 font-bold text-xl">
              <button
                onClick={handleDoctorClick}
                onMouseEnter={() => setHoverDoctor(true)}
                onMouseLeave={() => setHoverDoctor(false)}
                className="w-full md:w-[25rem] h-40 p-5 rounded-xl  flex items-center justify-center gap-4 border-2 border-[#487FFA] hover:bg-[#487FFA] hover:text-white text-3xl">
                <IconDoctor color={hoverDoctor ? "#FFFFFF" : "#5F5F5F"} />{" "}
                Médico
              </button>
              <button
                onClick={handlePatientClick}
                onMouseEnter={() => setHoverPatient(true)}
                onMouseLeave={() => setHoverPatient(false)}
                className="w-full md:w-[25rem] h-40 p-5 rounded-xl flex items-center justify-center gap-4 border-2 border-[#487FFA] hover:bg-[#487FFA] hover:text-white text-3xl">
                <IconUser color={hoverPatient ? "#FFFFFF" : "#5F5F5F"} />{" "}
                Paciente
              </button>
            </div>
            <div className="flex justify-center gap-5 text-base">
              <p>¿Ya tienes cuenta?</p>

              <span
                onClick={handleClose}
                className="text-[#487FFA] cursor-pointer">
                Iniciar Sesión
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={handleClose}
          className="absolute top-[3%] right-[5%] font-bold text-2xl">
          X
        </button>
      </div>
    </div>
  ) : (
    showUserForm && (
      <Form
        formData={formData}
        setFormData={setFormData}
        hideForm={handleHideForm}
      />
    )
  );
};

export default Modal;
