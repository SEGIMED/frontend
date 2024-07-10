"use client";
import React from "react";


import riesgoRojo from "@/components/images/riesgoRojo.png";
import riesgoAmarillo from "@/components/images/riesgoAmarillo.png";
import riesgoVerde from "@/components/images/riesgoVerde.png";



export default function realColor ({paciente}) {
    const risk = paciente?.patientPulmonaryHypertensionRisks?.risk
    switch (risk) {
      case "Bajo":
      return riesgoVerde;
      case "Moderado":
      return riesgoAmarillo;
      case "Alto":
      return riesgoRojo;
      default:
      return undefined;
    }

  }