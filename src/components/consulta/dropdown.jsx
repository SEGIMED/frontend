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

export default function DropNext({ text, options, text2, name }) {
  const [selectedOption, setSelectedOptionState] = useState("");
  const dispatch = useAppDispatch();

  const handleSelectionChange = (key) => {
    const selectedOption = key;
    setSelectedOptionState(selectedOption);
    dispatch(setSelectedOption({ name, option: selectedOption }));
  };

  return (
    <div>
      <div className="font-bold mb-2">{text}</div>
      <Dropdown className="emptyContent">
        <DropdownTrigger
          style={{
            color: "#487FFA",
            width: "100px",
          }}>
          <Button
            variant="bordered"
            className="capitalize"
            style={{
              color: "#487FFA",
              borderColor: "#487FFA",
              border: "2",
            }}>
            {selectedOption || text2}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Options menu"
          variant="flat"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selectedOption ? new Set([selectedOption]) : new Set()}
          onSelectionChange={(keys) =>
            handleSelectionChange(Array.from(keys)[0])
          }>
          {options?.map((option) => (
            <DropdownItem key={option} aria-label={option}>
              {option}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
