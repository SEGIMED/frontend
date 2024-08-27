"use client";
import Agenda from "@/components/agenda/Agenda";
import { useAppSelector } from "@/redux/hooks";

const Page = () => {
  const allSchedules = useAppSelector((state) => state.schedules);

  return <Agenda schedules={allSchedules} />;
};

export default Page;
