"use client"
import {Avatar} from "@nextui-org/react";

export default function AvatarSideBar({avatar}) {
  return (
    <div className="flex gap-4 items-center">
    <Avatar src={avatar} className="lg" />
    </div>
  );
}
