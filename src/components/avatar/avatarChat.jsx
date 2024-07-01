"use client";
import { Avatar } from "@nextui-org/react";

export default function Avatars({ avatar }) {
  return (
    <div className="items-center">
      <Avatar isBordered src={avatar} className="w-10 h-10" />
    </div>
  );
}
