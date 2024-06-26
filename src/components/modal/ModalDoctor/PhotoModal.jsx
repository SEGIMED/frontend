'use client'
import React, { useRef, useState, useEffect } from "react";
import IconClose from "@/components/icons/IconClose";
import IconCurrentRouteNav from "@/components/icons/IconCurrentRouteNav";
import IconUpload from "@/components/icons/IconUpload";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { adduser } from "@/redux/slices/user/user";
import Elboton from "@/components/Buttons/Elboton";

import Cookies from "js-cookie";

const PhotoModal = ({ isOpen, onClose }) => {
  const fileInputRef = useRef(null);

  const dispatch = useAppDispatch();
  const avatar = useAppSelector((state) => state.user.avatar);
  const user = useAppSelector((state) => state.user);
  const [url, setUrl] = useState(avatar);
  const [tempUrl, setTempUrl] = useState(url);



  useEffect(() => {
    setUrl(avatar);
  }, [avatar]);

  useEffect(() => {
    setTempUrl(url);
  }, [url]);


  const handleClose = () => {
    setTempUrl(url); // Restablecer URL temporal al valor original
    onClose();
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleOnChange = (e) => {
    try {
      if (e.target.files.length) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
          setTempUrl(event.target.result);
        };

        reader.readAsDataURL(file);
      }
    } catch (error) {
      // Implementa la función showNotify si aún no lo has hecho
      showNotify("error", "Error al cargar imagen");

    }
  };

  const handleSaveChanges = async () => {
    setUrl((tempUrl));
    const urlSend = JSON.stringify(tempUrl)

    dispatch(adduser({ ...user, avatar: tempUrl, avatarDoc: urlSend }));
    const id = Cookies.get("c")
    const token = Cookies.get("a")


    // const response = await ApiSegimed.patch(`/patient/${id}`,body,{headers:{'token':token}})

    onClose();
  };

  return isOpen ? (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
      onClick={handleClose}>
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div
        className="relative z-50 bg-white rounded w-[90%] md:w-[30%] h-fit md:h-[60%] flex flex-col items-center gap-5"
        onClick={stopPropagation}>
        <div className="h-full w-full flex flex-col">
          <div className="md:h-16 text-2xl md:text-base flex items-center justify-start gap-3 p-5 border-b-2 font-semibold">
            <IconCurrentRouteNav className="w-4" /> Editar foto de perfil
          </div>
          <div className="w-full h-full flex flex-col items-center gap-8 md:justify-between p-5">
            <div className="flex justify-center items-center">
              <div className="w-64 h-64 md:w-48 md:h-48  flex justify-center items-center">
                <img
                  src={tempUrl}
                  alt="Perfil"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-around gap-1 md:gap-3 w-full">
              <Elboton
                icon={<IconUpload />}
                nombre={"Subir Foto"}
                onPress={handleButtonClick}
                className={"w-[60%] md:w-1/2 text-xl py-6 md:py-2 md:text-base"}
              />
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleOnChange}
                accept="image/*"
              />
              <button
                onClick={handleSaveChanges}
                className="text-[#487FFA] md:w-1/2 md:text-sm py-4 md:py-2 w-[60%] text-xl">
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
        <button
          onClick={handleClose}
          className="absolute top-0 right-0 m-4 hover:transition duration-300 ease-in-out transform hover:scale-105 active:scale-100 active:translate-y-1">
          <IconClose className="w-8" />
        </button>
      </div>
    </div>
  ) : null;
};

export default PhotoModal;
