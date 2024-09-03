"use client";

import React, { useState, useEffect } from "react";
import IconCurrentRouteNav from "@/components/icons/IconCurrentRouteNav";
import { useRouter } from "next/navigation";
import IconArrowRight from "@/components/icons/iconArrowRight";
import LoadingFallback from "@/components/loading/loading";

const ProgressBar = ({ steps, currentIndex, progessBar }) => {
  return (
    <div className={`flex justify-center space-x-2 ${progessBar} `}>
      {steps.map((step, index) => (
        <div
          key={index}
          className={`h-1 w-5 md:w-8 ${
            index <= currentIndex ? "bg-bluePrimary" : "bg-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

const ModalModularizado = ({
  isOpen,
  onClose,
  icon,
  buttonIcon,
  Modals,
  title,
  titleClassName,
  funcionButton1,
  ruta,
  button1,
  buttonText1,
  button2,
  progessBar,
  size,
  verification,
  buttonText,
  funcion,
  loading,
}) => {
  const [index, setIndex] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const router = useRouter();

  function handleClickOutside(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  const handleDisabled = () => {
    setDisabled(false);
  };

  useEffect(() => {
    if (index === 0) {
      setDisabled(false);
    }
  }, [index]);

  const handleNext = () => {
    if (index < Modals.length - 1) {
      setIndex(index + 1);
      if (verification) {
        setDisabled(true);
      }
    } else {
      if (ruta) router.push(`${ruta}`);
      onClose();
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
      if (index === 1) {
        setDisabled(false);
      }
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div
        onClick={handleClickOutside}
        className="fixed inset-0 bg-black opacity-50"></div>
      <div
        className={`relative z-50 bg-[#fafafc] rounded-lg w-[90%] ${size} flex flex-col  gap-5 `}>
        <div className="w-full bg-white  border-b rounded-t-lg  border-b-[#DCDBDB] p-4 flex gap-3">
          {icon ? icon : <IconCurrentRouteNav className={"w-4"} />}
          <p className={`font-medium text-base leading-6 ${titleClassName} `}>
            {title}
          </p>
        </div>
        <ProgressBar
          steps={Modals}
          currentIndex={index}
          progessBar={progessBar}
        />
        <div className="flex flex-col items-center gap-5 justify-center w-full h-full ">
          {loading ? (
            <div className="flex items-center justify-center w-full h-full">
              <LoadingFallback className="w-6 h-6" />
            </div>
          ) : (
            <div className="px-8 bg-[#fafafc] h-[80%] md:h-[100%] w-[100%] justify-center items-center flex">
              {Modals[index]}
            </div>
          )}
        </div>
        <div className="flex gap-2 pb-5 bg-white border-t rounded-b-lg justify-center items-center pt-3 border-t-[#DCDBDB] w-full">
          <button
            disabled={disabled}
            onClick={funcionButton1 ? funcionButton1 : handlePrev}
            className={` py-2 px-4 items-center flex rounded-lg gap-2 w-fit ${button1} disabled:bg-gray-400`}>
            <p className="block  font-bold">
              {buttonText1 ? buttonText1 : `Regresar`}
            </p>
          </button>
          <button
            disabled={disabled}
            onClick={funcion ? funcion : handleNext}
            className={` py-2 px-4 items-center flex rounded-lg  gap-2 w-fit ${button2} disabled:bg-gray-400`}>
            <p className="  font-bold flex gap-2 items-center">
              {index === Modals.length - 1 ? buttonText.end : buttonText.start}
              {buttonIcon ? buttonIcon : <IconArrowRight />}
            </p>
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default ModalModularizado;
