"use client";
import React from "react";
import { Button, Link } from "@nextui-org/react";

export default function Elboton({
  icon,
  icon2,
  nombre,
  onPress,
  size,
  href,
  className,
  disabled,
  classNameText,
}) {
  return (
    <Button
      size={size}
      as={href && Link}
      href={href}
      onClick={onPress}
      disabled={disabled}
      className={
        "bg-[#487FFA] text-[#FFFFFF] font-Roboto font-bold rounded-lg" +
        " " +
        className
      }>
      {icon}
      <span className={`${classNameText && classNameText}`}>
        {nombre}{" "}
      </span>{" "}
      {icon2}
    </Button>
  );
}
