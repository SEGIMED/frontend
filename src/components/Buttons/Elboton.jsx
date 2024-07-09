"use client";
import React from "react";
import { Button } from "@nextui-org/react";

export default function Elboton({
  icon,
  nombre,
  onPress,
  color,
  size,
  className,
}) {
  return (
    <Button size={size} color="primary" onClick={onPress} className={className}>
      {icon} {nombre}
    </Button>
  );
}
