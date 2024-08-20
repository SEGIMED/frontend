
import Cookies from "js-cookie";
import { resetApp } from "@/redux/rootReducer";
import rutas from "./rutas";

export const protectRoute = (pathname, rol, dispatch, router) => {
    const lowerPath = pathname.toLowerCase();

    if (rol === "Médico" && !lowerPath.includes("inicio_doctor")) {
        return router.push(rutas.Doctor);
    } else if (rol === "Paciente" && !lowerPath.includes("inicio_paciente")) {
        return router.push(rutas.PacienteDash);
    } else if (rol === "Admin" && !lowerPath.includes("inicio_admin")) {
        return router.push(rutas.Admin);
    } else if (rol === "Entries" && !lowerPath.includes("inicio_entries")) {
        return router.push(rutas.Entries);
    } else if (
        (lowerPath.includes("inicio_doctor") && rol !== "Médico") ||
        (lowerPath.includes("inicio_paciente") && rol !== "Paciente") ||
        (lowerPath.includes("inicio_admin") && rol !== "Admin")
    ) {
        Cookies.remove("a");
        Cookies.remove("b");
        Cookies.remove("c");
        Cookies.remove("d");
        dispatch(resetApp());
        router.push("/");
    }
};