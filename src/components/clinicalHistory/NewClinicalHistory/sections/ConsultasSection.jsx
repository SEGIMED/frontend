import React, { useEffect, useState } from "react";
import DynamicTable from "@/components/table/DynamicTable";
import SkeletonList from "@/components/skeletons/HistorialSkeleton";
import { useAppSelector } from "@/redux/hooks";
import { ApiSegimed } from "@/Api/ApiSegimed";
import TableToolBar from "@/components/table/TableToolBar";

const ConsultasSection = () => {
  const [consultasData, setConsultasData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [specialties, setSpecialties] = useState([]); // Estado para las especialidades
  const [physicians, setPhysicians] = useState([]); // Estado para los médicos
  const [selectedSpecialty, setSelectedSpecialty] = useState(null); // Estado para la especialidad seleccionada
  const [selectedPhysician, setSelectedPhysician] = useState(null); // Estado para el médico seleccionado
  const user = useAppSelector((state) => state.clinicalHistory.user);

  // Función para obtener el catálogo de especialidades
  const fetchSpecialties = async () => {
    try {
      const response = await ApiSegimed("/catalog/get-catalog?catalogName=medical_specialties");
      setSpecialties(response.data); // Guardar las especialidades en el estado
    } catch (error) {
      console.error("Error fetching specialties:", error);
    }
  };

  // Función para obtener los médicos
  const fetchPhysicians = async () => {
    try {
      const response = await ApiSegimed("/all-physicians");
      setPhysicians(response.data); // Guardar los médicos en el estado
    } catch (error) {
      console.error("Error fetching physicians:", error);
    }
  };

  // Efecto que se ejecuta al montar el componente para cargar especialidades y médicos
  useEffect(() => {
    fetchSpecialties(); // Llamada para obtener el catálogo de especialidades
    fetchPhysicians(); // Llamada para obtener el catálogo de médicos
  }, []);

  // Efecto que escucha los cambios en la especialidad o el médico seleccionado
  useEffect(() => {
    const fetchConsultasData = async () => {
      try {
        setLoading(true); // Mostrar loader mientras carga los datos
        const params = { patientId: user.id };

        // Agregar el parámetro de especialidad si está presente
        if (selectedSpecialty) {
          params.medicalSpecialtyId = selectedSpecialty;
        }
        // Agregar el parámetro de médico si está presente
        if (selectedPhysician) {
          params.physicianId = selectedPhysician;
        }

        const response = await ApiSegimed("/medical-history/consultation", {
          params,
        });

        setConsultasData(response.data);
      } catch (error) {
        console.error("Error fetching consultas data:", error);
      } finally {
        setLoading(false);
      }
    };

    // Llamar la función cada vez que cambie `selectedSpecialty` o `selectedPhysician`
    fetchConsultasData();
  }, [selectedSpecialty, selectedPhysician, user.id]); // Dependencias del efecto

  const ConsultasColumns = [
    {
      label: "Fecha",
      key: "appSch.scheduledStartTimestamp",
      showMobile: true,
      width: "w-8",
    },
    {
      label: "Hora",
      key: "appSch.scheduledStartTimestamp",
      showMobile: true,
      width: "w-8",
    },
    {
      label: "Grupo HTP",
      key: "appSch.patientUser.userHpGroups",
      showMobile: true,
      width: "w-16",
    },
    {
      label: "Centro de atención ",
      key: "appSch.attendancePlace.alias",
      showMobile: true,
      width: "w-16",
    },
    {
      label: "Motivo de consulta",
      key: "appSch.reasonForConsultation",
      showMobile: false,
      width: "w-16",
    },
  ];

  return (
    <>
      {loading ? (
        <SkeletonList count={8} />
      ) : (
        <div>
          <TableToolBar
            title="Consultas"
            button={(
              <select
                value={selectedPhysician || ""}
                onChange={(e) => setSelectedPhysician(e.target.value)}
                className="bg-white rounded-md border h-10 text-[#686868] w-44"
              >
                <option value="">Todos los médicos</option>
                {physicians.map((physician) => (
                  <option key={physician.id} value={physician.id}>
                    {physician.name} {physician.lastname}
                  </option>
                ))}
              </select>
            )}
            button2={(
              <select
                value={selectedSpecialty || ""}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="bg-white rounded-md border text-[#686868] h-10 w-60"
              >
                <option value="">Todas las especialidades</option>
                {specialties.map((specialty) => (
                  <option key={specialty.id} value={specialty.id}>
                    {specialty.name}
                  </option>
                ))}
              </select>
            )}
          />
          <DynamicTable
            rows={consultasData}
            columns={ConsultasColumns}
            textError="No se encontraron consultas disponibles."
          />
        </div>
      )}
    </>
  );
};

export default ConsultasSection;
