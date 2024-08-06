"use client";
import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useAppDispatch } from "@/redux/hooks";
import { setSelectedOption } from "@/redux/slices/doctor/formConsulta";
import { useFormContext } from "react-hook-form";

export default function DropNext({ text, options, text2, name, disabled, selectedOptions, style, type, handleDisabled, icon, colorBackground, colorText, handleOptionChange, defaultValue }) {
  const opcionRecibida = selectedOptions ? selectedOptions : "";
  const [selectedOption, setSelectedOptionState] = useState(opcionRecibida);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedOptions) {
      setSelectedOptionState(selectedOptions);
      if (handleDisabled)
        handleDisabled();
    }
  }, [selectedOptions]);

  const handleSelectionChange = (key) => {
    const selectedIndex = options.findIndex(option => option === key);
    setSelectedOptionState(key);

    if (handleDisabled) { handleDisabled() }
    // setValue(name, selectedOption);
    if (type) {
      dispatch(setSelectedOption({ name, option: selectedIndex + 1 }));
      dispatch(setSelectedOption({ name: `${name}2`, option: key }));
    } else {
      dispatch(setSelectedOption({ name, option: key }));
    }
    if (handleOptionChange) { handleOptionChange(name, key); }

  };
  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div>
      <div className='flex items-center justify-center'>
        <div className="mb-2 font-bold ">{text}</div>
      </div>
      <Dropdown className="emptyContent">
        <DropdownTrigger
          style={{
            color: "#487FFA",
            width: "100px",
          }}>
          {!disabled ? (
            <Button
              variant="bordered"
              className="capitalize"
              style={style ? style : {
                backgroundColor: colorBackground || "none",
                color: colorText || "#487FFA",
                borderColor: "#487FFA",
                border: "2px solid",

              }}

              onClick={handleButtonClick}
            >
              {selectedOption || text2}
              {icon && <div className={isOpen === true ? "rotate-180" : ""}>
                {icon}
              </div>}
            </Button>
          ) : (
            <Button
              variant="bordered"
              className="capitalize"
              disabled
              style={{
                color: "#487FFA",
                borderColor: "#487FFA",
                border: "2px solid",
              }}>
              {selectedOption || text2}
            </Button>
          )}
        </DropdownTrigger>
        {!disabled ? (
          <DropdownMenu
            aria-label="Options menu"
            variant="flat"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selectedOption ? new Set([selectedOption]) : new Set()}
            onSelectionChange={(keys) =>
              handleSelectionChange(Array.from(keys)[0])
            }>
            {options?.map((option, index) => (
              <DropdownItem key={option} aria-label={option}>
                {option}
              </DropdownItem>
            ))}
          </DropdownMenu>
        ) : null}
      </Dropdown>
    </div>
  );
}
