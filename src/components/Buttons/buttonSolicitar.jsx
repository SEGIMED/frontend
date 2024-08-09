"use client";
import React from "react";
import { Button, Link } from "@nextui-org/react";

export default function ButtonSolicitar({
  icon,
  icon2,
  nombre,
  onPress,
  size,
  href,
  className,
  disabled,
}) {
  return (
    <Button
      size={size}
      as={href && Link}
      href={href}
      onClick={onPress}
      disabled={disabled}
      className={
        "bg-[#808080] py-0 text-[#FFFFFF] font-Roboto font-bold text-base  rounded-lg" +
        " " +
        className
      }>
      {icon} {nombre} {icon2}
    </Button>
  );
}
