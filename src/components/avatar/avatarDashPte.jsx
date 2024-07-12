"use client";
import { Avatar } from "@nextui-org/react";
import defaultAvatar from "@/utils/defaultAvatar";

export default function AvatarDashPte({ avatar }) {
  const avatarSrc = avatar || defaultAvatar;

  return (
    <div className="flex gap-4 items-center">
      <Avatar
        src={avatarSrc}
        className="w-16 h-16 md:w-40 md:h-40 text-large"
      />
    </div>
  );
}
