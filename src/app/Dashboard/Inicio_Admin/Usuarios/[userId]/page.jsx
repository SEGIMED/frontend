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
import Requests from "@/components/adminDash/solicitudes";

export default function PacienteId({ params }) {
    const id = Number(params.userId);
    const [isLoading, setIsLoading] = useState(true);
    const [alarms, setAlarms]=useState([])
    const usuarios=useAppSelector(state=>state.allUsers.allUsers)
    
    const medicos=usuarios.filter(med=>med.role=== 2)

    const hasFetchedAlarms = useRef(false);  // Bandera para evitar múltiples peticiones de alarmas
    const hasFetchedPatient = useRef(false);  // Bandera para evitar múltiples peticiones
    const searchParams = useSearchParams();
    

    
    const { 
        setAlarmByPatientId, 
        setPatientDetail } = UseDataFetchingAdmin();

    const editPerfilPteQuery = searchParams.get("editPerfilPte") === "true";
    const historyClinicQuery = searchParams.get("historyClinic") === "true";
    const pteAlarmQuery = searchParams.get("pteAlarm") === "true";
    const requestQueryPte= searchParams.get("request") === "true";


   
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
            {editPerfilPteQuery && <EditarPaciente id={id}  />}
            {historyClinicQuery && <HistoriaClinica id={id} />}
            {pteAlarmQuery && <AlarmsByRole alarms={alarms} isLoading={isLoading} />}
            {requestQueryPte && <Requests id={id} allDoctors={medicos}/>}
        </div>
    );
}

