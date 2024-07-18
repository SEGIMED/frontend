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
      color="primary"
      href={href}
      onClick={onPress}
      className={className}>
      {icon} {nombre}
    </Button>
  );
}
