"use client";

import ConsultaComponent from "@/components/newConsulta/ConsultaComponent";

export default function ConsultaDocc({ params }) {
  const scheduleId = Number(params.id);
  return (
    <>
      <ConsultaComponent scheduleId={scheduleId} />
    </>
  );
}
