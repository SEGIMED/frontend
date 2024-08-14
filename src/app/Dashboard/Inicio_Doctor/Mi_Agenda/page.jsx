"use client";

import { useEffect, useState } from "react";
import { ApiSegimed } from "@/Api/ApiSegimed";
import Agenda from "@/components/agenda/Agenda";
import { PathnameShow } from "@/components/pathname/path";

export default function Citas() {
  const [loading, setLoading] = useState(true);
  const [scheduledConsultas, setScheduledConsultas] = useState([]);
  const lastSegmentTextToShow = PathnameShow();
  const getSchedulesByUserId = async () => {
    try {
      const response = await ApiSegimed.get("/schedulesByUserId");
      setScheduledConsultas(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    try {
      setLoading(true);
      getSchedulesByUserId();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <title>{lastSegmentTextToShow}</title>
      <Agenda schedules={scheduledConsultas} />;
    </>
  );
}
