"use client";
import { Avatar } from "@nextui-org/react";
import avatar from "@/utils/defaultAvatar";

export default function Avatars({ avatar1 }) {
  return (
    <div className="items-center">
      <Avatar
        isBordered
        src={avatar1 === null || avatar1 === undefined ? avatar : avatar1}
        className="md:w-10 md:h-10 w-8 h-8"
      />
    </div>
  );
}
