"use client"
import { Avatar } from "@nextui-org/react";

export default function AvatarDashPte({ avatar }) {
  return (
    <div className="flex gap-4 items-center">
      <Avatar src={avatar} className="w-16 h-16 md:w-40 md:h-40 text-large" />
    </div>
  );
}
