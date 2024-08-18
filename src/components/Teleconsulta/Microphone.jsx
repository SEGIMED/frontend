'use client'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import IconMicrophone from "../icons/IconMicrophone";
import { useState } from "react";
export default function Microphone({ filterMicrophoneList, handleChangeMicrophone }) {
    const [selectedKeys, setSelectedKeys] = useState(new Set(["text"]));
    
    
  return (
    <Dropdown id="Microphone" backdrop="blur" placement="top">
      <DropdownTrigger placement="bottom-end">
        <button className="bg-[#0060FF] p-3 rounded-full">
          <IconMicrophone />
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
        {filterMicrophoneList.map((device) => {
          return (
            <DropdownItem
              key={device.deviceId}
              onAction={(key) => {
                handleChangeMicrophone(key);
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