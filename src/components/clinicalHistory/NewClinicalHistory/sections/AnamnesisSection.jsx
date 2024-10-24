import React, { useEffect, useState } from "react";
import DynamicTable from "@/components/table/DynamicTable";
import SkeletonList from "@/components/skeletons/HistorialSkeleton";
import AnamnesisComponent from "@/components/clinicalHistory/NewClinicalHistory/Anamnesis";
import { useAppSelector } from "@/redux/hooks";
import { ApiSegimed } from "@/Api/ApiSegimed";
import TableToolBar from "@/components/table/TableToolBar";

const AnamnesisSection = () => {
  const [anamnesisData, setAnamnesisData] = useState([]);
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

  // Efecto para cargar especialidades y médicos cuando se monta el componente
  useEffect(() => {
    fetchSpecialties();
    fetchPhysicians();
  }, []);

  // Efecto para filtrar datos de anamnesis con base en la especialidad o el médico seleccionado
  useEffect(() => {
    const fetchAnamnesisData = async () => {
      try {
        setLoading(true); // Mostrar loader durante la carga
        const params = { userId: user.id };

        // Agregar el parámetro de especialidad si está seleccionado
        if (selectedSpecialty) {
          params.medicalSpecialtyId = selectedSpecialty;
        }
        // Agregar el parámetro de médico si está seleccionado
        if (selectedPhysician) {
          params.physicianId = selectedPhysician;
        }

        const response = await ApiSegimed("/medical-history/anamnesis", {
          params,
        });

        setAnamnesisData(response.data);
      } catch (error) {
        console.error("Error fetching anamnesis data:", error);
      } finally {
        setLoading(false); // Finalizar el loader
      }
    };

    // Llamar la función cuando cambie la especialidad o el médico seleccionado
    fetchAnamnesisData();
  }, [selectedSpecialty, selectedPhysician, user.id]);

  const CommonColumns = [
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
      key: "htp",
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

  const AnamnesisContent = (row) => <AnamnesisComponent info={row} />;
  AnamnesisContent.displayName = "AnamnesisContent";

  return (
    <>
      {loading ? (
        <SkeletonList count={8} />
      ) : (
        <div>
          <TableToolBar
            title="Anamnesis"
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
            rows={anamnesisData}
            columns={CommonColumns}
            renderCustomContent={AnamnesisContent}
            textError="No se encontró anamnesis disponible."
            clickable={true}
          />
        </div>
      )}
    </>
  );
};

export default AnamnesisSection;
