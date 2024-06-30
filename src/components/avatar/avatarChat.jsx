"use client";
import { Avatar } from "@nextui-org/react";

export default function Avatars({ avatar }) {
  return (
    <div className="items-center">
      <Avatar isBordered src={avatar} className="w-6 h-6" />
    </div>
  );
}
