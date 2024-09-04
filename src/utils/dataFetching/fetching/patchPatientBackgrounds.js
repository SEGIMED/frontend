import { ApiSegimed } from "@/Api/ApiSegimed";

export default async function patchPatientBackgrounds(userId,data) {
    try {
        const response = await ApiSegimed.patch(
            `/backgrounds/update-backgrounds?id=${userId}`,
            data,);
        return response
    } catch (error) {
        console.error(error.message)
    }
}