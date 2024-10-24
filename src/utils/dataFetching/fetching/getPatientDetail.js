import { ApiSegimed } from "@/Api/ApiSegimed";

export default async function getPatientDetail(id) {
  try {
    const response1 = await ApiSegimed.get(`/patient-details?id=${id}`);
    const response2 = await ApiSegimed.get(`/patient/${id}`);

    const combinedData = {
      ...response1.data,
      ...response2.data,
    };

    return combinedData;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}
