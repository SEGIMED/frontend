"use client"
import { useRouter } from "next/navigation"
import MenuDropDown from "@/components/dropDown/MenuDropDown"
import IconEditar from "@/components/icons/iconEditar"
import IconCancel from "@/components/icons/iconCancel"
import IconOptions from "@/components/icons/IconOptions"
import IconTablillaTilde from "@/components/icons/iconTablillaTilde"
import IconGeolocation from "@/components/icons/IconGeolocation"
import IconAlarmBlue from "@/components/icons/iconAlarmBlue"
import rutas from "@/utils/rutas"

export default function GeneratePatientButton  ({ pacienteId, cb }) {
    const router = useRouter();
    return (
        <MenuDropDown 
            label="Opciones"
            icon={<IconOptions color="white" />}
            categories={[
                {
                    items: [
                        {
                            label: "Editar Paciente",
                            icon: <IconEditar color="lightGray" />,
                            onClick: () => router.push(`${rutas.Admin}${rutas.Usuarios}/${pacienteId}?editPerfilPte=true`)
                        },
                        {
                            label: "Eliminar Paciente",
                            icon: <IconCancel className={"w-6"} />
                        },
                       
                        {
                            label: "Ver Alarmas Creadas",
                            icon: <IconAlarmBlue color="lightGray" className={"w-6"} />,
                            onClick: () => router.push(`${rutas.Admin}${rutas.Usuarios}/${pacienteId}?pteAlarm=true`)
                        },
                        {
                            label: "Ver Historia Clínica",
                            icon: <IconTablillaTilde color="lightGray" />,
                            onClick: () => router.push(`${rutas.Admin}${rutas.Usuarios}/${pacienteId}?historyClinic=true`)
                        },
                        {
                            label: "Ver Antiguas Consultas",
                            icon: <IconTablillaTilde color="lightGray" />
                        },
                        {
                            label: "Ver Solicitudes",
                            icon: <IconTablillaTilde color="lightGray" />,
                            onClick: () => router.push(`${rutas.Admin}${rutas.Usuarios}/${pacienteId}?request=true`)
                        },
                        {
                            label: "Ver Geolocalización",
                            icon: <IconGeolocation />,
                            onClick: cb
                        }
                    ],
                }
            ]}
        />
    );
}