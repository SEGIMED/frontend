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
import IconArrowDetailDown from "../icons/IconArrowDetailDown";
import IconArrowDetailUp from "../icons/IconArrowDetailUp";
import IconPreConsulta from "../icons/iconPreconsulta";
import { style } from "d3-selection";

export default function DropClaseFuncional({ text, options, text2, name, selectedOptions, type, handleDisabled }) {
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
    console.log(selectedIndex);
    setSelectedOptionState(key);

    if (handleDisabled) { handleDisabled() }
    // setValue(name, selectedOption);
    if (type) {
      dispatch(setSelectedOption({ name, option: selectedIndex + 1 }));
      dispatch(setSelectedOption({ name: `${name}2`, option: key }));
    } else {
      dispatch(setSelectedOption({ name, option: key }));
    }
  };
  const toggleDropdown = () => {
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
            color: "#5F5F5F",
            width: "100px",
          }}
          onClick={toggleDropdown}
          >

            <Button
              variant="bordered"
              className="capitalize"
              style={{
                color: "#5F5F5F",
                borderColor: "#DCDBDB",
                border: "2px solid",
                backgroundColor: "white",
              }}>
              {selectedOption || text2}
              {isOpen ?  <IconArrowDetailUp/>: <IconArrowDetailDown/> }
            </Button>
        </DropdownTrigger>
          <DropdownMenu
            aria-label="Options menu"
            variant="flat"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selectedOption ? new Set([selectedOption]) : new Set()}
            style={{ width: "250px" }}
            onSelectionChange={(keys) =>
              handleSelectionChange(Array.from(keys)[0])
            
            }>
            {options?.map((option, index) => (
              <DropdownItem key={option} aria-label={option} >
                <div className="flex w-full gap-2">
              <IconPreConsulta
                    color={
                      option === "Clase funcional I"
                        ? "#70c247"
                        : option === "Clase funcional II"
                        ? "#f5e400"
                        : option === "Clase funcional III"
                        ? "#e73f3f"
                        : option === "Clase funcional IV"
                        ? "#9e193b"
                        : null
                    }
                  />  
                {option}
                </div>
              </DropdownItem>
            ))}
          </DropdownMenu>
      </Dropdown>
    </div>
  );
}
