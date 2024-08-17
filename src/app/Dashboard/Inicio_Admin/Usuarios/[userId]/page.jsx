"use client";
import { useEffect, useState, useRef } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useSearchParams } from "next/navigation";
import EditarPaciente from "@/components/adminDash/editarPerfilPte";
import UseDataFetchingAdmin from "@/utils/dataFetching/SideBarFunctionsAdmin";
import HistoriaClinica from "@/components/adminDash/clinicHistory";
import AlarmsByRole from "@/components/adminDash/alarm";
import Cookies from "js-cookie";
import getAlarmByPatientId from "@/utils/dataFetching/fetching/getAlarmByPatientID";

export default function PacienteId({ params }) {
    const id = Number(params.userId);
    const [isLoading, setIsLoading] = useState(true);
    const [alarms, setAlarms]=useState([])
    const token = Cookies.get("a");
    

    const hasFetchedAlarms = useRef(false);  // Bandera para evitar múltiples peticiones de alarmas
    const hasFetchedPatient = useRef(false);  // Bandera para evitar múltiples peticiones
    const searchParams = useSearchParams();
    

    
    const { setAlarmByPatientId, setPatientDetail } = UseDataFetchingAdmin();

    const editarPerfilPteQuery = searchParams.get("editPerfilPte") === "true";
    const historiaClinicaQuery = searchParams.get("historiaClinica") === "true";
    const pteAlarmQuery = searchParams.get("pteAlarm") === "true";

   
useEffect(() => {
    const fetchData = async () => {
        if (!hasFetchedAlarms.current && !hasFetchedPatient.current) {
            
            // Fetch alarms
            
            const alarmsActive = await getAlarmByPatientId(id);
           
            setAlarms(alarmsActive);
            
            // Fetch patient details
           
            await setPatientDetail(id);
            

            setIsLoading(false);
            hasFetchedAlarms.current = true;
            hasFetchedPatient.current = true;
        }
    };
    fetchData();
    
}, []);



    return (
        <div className="h-full w-full overflow-y-auto">
            {editarPerfilPteQuery && <EditarPaciente id={id}  />}
            {historiaClinicaQuery && <HistoriaClinica id={id} />}
            {pteAlarmQuery && <AlarmsByRole alarms={alarms} isLoading={isLoading} />}
        </div>
    );
}

