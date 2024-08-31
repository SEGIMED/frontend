'use client'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import IconCamera from "../icons/IconCamera";
import { useState } from "react";

export default function Camera({ filterCameraList, handleChangeCamera }) {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["text"]));

  return (
    <Dropdown showArrow placement="top" backdrop="blur" id="Camera">
      <DropdownTrigger >
        <button className="bg-[#0060FF] p-3 rounded-full">
          <IconCamera />
        </button>
      </DropdownTrigger>
      <DropdownMenu
      aria-label="Selecciona Dipositivo" 
      color="primary"
      disallowEmptySelection
      selectionMode="single"
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
      >
        {filterCameraList.map((device) => {
          return (
            <DropdownItem
            
              key={device.deviceId}
              onAction={(key) => {
                handleChangeCamera(key);
              }}
            >
              {device.label}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
}
