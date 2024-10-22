import { ApiSegimed } from "@/Api/ApiSegimed";

export default async function postPatientStudiesOrHc(payload) {
  const response = await ApiSegimed.post("/patient-studies", payload);
  return response;
}
