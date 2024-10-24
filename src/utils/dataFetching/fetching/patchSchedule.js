import { ApiSegimed } from "@/Api/ApiSegimed";

export default async function patchSchedule(scheduleId, data) {
  try {
    console.log(data);

    const response = await ApiSegimed.patch(`/schedule/${scheduleId}`, data);
    return response;
  } catch (error) {
    console.error(error.message);
  }
}
