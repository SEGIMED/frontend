"use client";
import React, { useState } from "react";
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

export default function DropNext({ text, options, text2, name, disabled, selectedOptions }) {
  const opcionRecibida = selectedOptions ? selectedOptions : "";
  const [selectedOption, setSelectedOptionState] = useState(opcionRecibida);
  const dispatch = useAppDispatch();
  // const { setValue, register } = useFormContext();
  const handleSelectionChange = (key) => {
    const selectedOption = key;
    setSelectedOptionState(selectedOption);
    // setValue(name, selectedOption);
    dispatch(setSelectedOption({ name, option: selectedOption }));
  };

  return (
    <div>
      <div className="mb-2 font-bold">{text}</div>
      <Dropdown className="emptyContent">
        <DropdownTrigger
          style={{
            color: "#487FFA",
            width: "100px",
          }}>
          {!disabled ? (<Button
            variant="bordered"
            className="capitalize"
            style={{
              color: "#487FFA",
              borderColor: "#487FFA",
              border: "2",
            }}>
            {selectedOption || text2}
          </Button>) : (<Button
            variant="bordered"
            className="capitalize"
            disabled
            style={{
              color: "#487FFA",
              borderColor: "#487FFA",
              border: "2",
            }}>
            {selectedOption || text2}
          </Button>)
          }

        </DropdownTrigger>
        {!disabled ? (<DropdownMenu
          aria-label="Options menu"
          variant="flat"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selectedOption ? new Set([selectedOption]) : new Set()}
          onSelectionChange={(keys) =>
            handleSelectionChange(Array.from(keys)[0])

          }>
          {options?.map((option) => (
            <DropdownItem key={option} aria-label={option} >
              {option}
            </DropdownItem>
          ))}
        </DropdownMenu>) : (null)}

      </Dropdown>
      {/* <input type="hidden" {...register(name)} value={selectedOption} /> */}
    </div>
  );
}
