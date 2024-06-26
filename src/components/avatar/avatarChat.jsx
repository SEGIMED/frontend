"use client"
import {Avatar} from "@nextui-org/react";

export default function Avatars({avatar} ) {
  return (
    <div className="flex gap-4 items-center">
      <Avatar isBordered src={avatar} />
      
    </div>
  );
}