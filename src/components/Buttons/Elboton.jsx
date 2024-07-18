"use client";
import React from "react";
import { Button, Link } from "@nextui-org/react";

export default function Elboton({
  icon,
  nombre,
  onPress,
  size,
  href,
  className,
}) {
  return (
    <Button
      size={size}
      as={href && Link}
      href={href}
      onClick={onPress}
      className={
        "bg-[#487FFA] text-[#FFFFFF] font-Roboto rounded-lg" + " " + className
      }>
      {icon} {nombre}
    </Button>
  );
}
