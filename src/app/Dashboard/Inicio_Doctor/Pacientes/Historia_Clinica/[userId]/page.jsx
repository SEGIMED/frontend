"use client";
import AnamnesisComponent from "@/components/clinicalHistory/NewClinicalHistory/Anamnesis";
import ClincalCuerpo from "@/components/clinicalHistory/NewClinicalHistory/cuerpo";
import Datos from "@/components/clinicalHistory/NewClinicalHistory/Datos";
import Diagnosticos from "@/components/clinicalHistory/NewClinicalHistory/Diagnosticos";
import Evoluciones from "@/components/clinicalHistory/NewClinicalHistory/Evoluciones2";
import ExamenFisico from "@/components/clinicalHistory/NewClinicalHistory/ExamenFisico";
import SignosVitales from "@/components/clinicalHistory/NewClinicalHistory/SignosVitales";
import SkeletonList from "@/components/skeletons/HistorialSkeleton";
import DynamicTable from "@/components/table/DynamicTable";
import { useAppSelector } from "@/redux/hooks";
import MenuDropDown from "@/components/dropDown/MenuDropDown";
import IconOptions from "@/components/icons/IconOptions";
import IconImportar from "@/components/icons/IconImportar";

const Page = () => {
  const user = useAppSelector((state) => state.clinicalHistory.user);
  const tabSelected = useAppSelector((state) => state.clinicalHistory.tab);
  const infoPatient = useAppSelector((state) => state.clinicalHistory);
  const isLoading = useAppSelector((state) => state.clinicalHistory.loading);

  const ConsultasColumns = [
    {
      label: "Fecha",
      key: "timestamp",
      showMobile: true,
      width: "w-8",
    },
    {
      label: "Hora",
      key: "timestamp",
      showMobile: true,
      width: "w-8",
    },
    {
      label: "Grupo HTP",
      key: "patient.htp",
      showMobile: true,
      width: "w-16",
    },
    {
      label: "Centro de atencion",
      key: "attendancePlace.alias",
      showMobile: true,
      width: "w-16",
    },
    {
      label: "Motivo de consulta",
      key: "chiefComplaint",
      showMobile: false,
      width: "w-16",
    },
  ];

  const Importaciones = [
    {
      label: "Fecha",
      key: "timestamp",
      showMobile: true,
      width: "w-8",
    },
    {
      label: "Hora",
      key: "timestamp",
      showMobile: true,
      width: "w-8",
    },

    {
      label: "Titulo",
      key: "chiefComplaint",
      showMobile: true,
      width: "w-16",
    },
    {
      label: "Descripcion",
      key: "chiefComplaint",
      showMobile: false,
      width: "w-16",
    },
  ];

  const CommonColumns = [
    {
      label: "Fecha",
      key: "timestamp",
      showMobile: true,
      width: "w-8",
    },
    {
      label: "Hora",
      key: "timestamp",
      showMobile: true,
      width: "w-8",
    },
    {
      label: "Médico",
      key: "physician.name",
      showMobile: true,
      width: "w-16",
    },
    {
      label: "Centro de atencion",
      key: "attendancePlace.alias",
      showMobile: true,
      width: "w-16",
    },
    {
      label: "Motivo de consulta",
      key: "chiefComplaint",
      showMobile: false,
      width: "w-16",
    },
  ];

  const getColumnsAndComponent = (tab) => {
    switch (tab) {
      case "Consultas":
        return {
          columns: ConsultasColumns,
          title: "Consultas",
          textError: "No se encontraron consultas disponibles.",
        };
      case "Evoluciones":
        const EvolucionesComponent = (row) => <Evoluciones info={row} />;
        EvolucionesComponent.displayName = "EvolucionesComponent";
        return {
          columns: CommonColumns,
          component: EvolucionesComponent,
          title: "Evoluciones",
          textError: "No se encontraron evoluciones disponibles.",
        };
      case "Anamnesis":
        const Anamnesis = (row) => <AnamnesisComponent info={row} />;
        Anamnesis.displayName = "AnamnesisComponent";
        return {
          columns: CommonColumns,
          component: Anamnesis,
          title: "Anamnesis",
          textError: "No se encontró anamnesis disponible.",
        };
      case "Autoevaluación":
        const AutoevaluaciónComponent = (row) => <ClincalCuerpo info={row} />;
        AutoevaluaciónComponent.displayName = "AutoevaluaciónComponent";
        return {
          columns: CommonColumns,
          component: AutoevaluaciónComponent,
          title: "Autoevaluación",
          textError: "No se encontró autoevaluación disponible.",
        };
      case "Examen Físico":
        const ExamenFisicoComponent = (row) => <ExamenFisico info={row} />;
        ExamenFisicoComponent.displayName = "ExamenFisicoComponent";
        return {
          columns: CommonColumns,
          component: ExamenFisicoComponent,
          title: "Examen Físico",
          textError: "No se encontró examen físico disponible.",
        };
      case "Signos Vitales":
        const SignosVitalesComponent = (row) => <SignosVitales info={row} />;
        SignosVitalesComponent.displayName = "SignosVitalesComponent";
        return {
          columns: CommonColumns,
          component: SignosVitalesComponent,
          title: "Signos Vitales",
          textError: "No se encontraron signos vitales disponibles.",
        };
      case "Diagnosticos y tratamientos":
        const DiagnosticosComponent = (row) => <Diagnosticos info={row} />;
        DiagnosticosComponent.displayName = "DiagnosticosComponent";
        return {
          columns: CommonColumns,
          component: DiagnosticosComponent,
          title: "Diagnosticos y tratamientos",
          textError:
            "No se encontraron diagnósticos y tratamientos disponibles.",
        };
      case "HC Importados":
        return {
          columns: Importaciones,
          title: "HC Importados",
          textError: "No se encontraron historias clinicas disponibles.",
          renderDropDown: (row) => {
            return (
              <MenuDropDown
                label="Opciones"
                icon={<IconOptions color="white" />}
                categories={[
                  {
                    items: [
                      {
                        label: "Ver Detalles",
                        icon: <IconOptions color={"#B2B2B2"} />,
                        // onClick: () => { setSelectedError(row); setShowModal(true) }
                      },
                      {
                        label: "Ver archivo",
                        icon: <IconImportar color={"#B2B2B2"} />,
                        // onClick: () => { setSelectedSugerencia(row) }
                      }
                    ].filter(Boolean),
                  },
                ]}
                className={"w-[40px] md:w-full lg:w-fit mx-auto"}
              />
            );
          }
        };
      default:
        return {
          columns: CommonColumns,
          title: "Default",
          textError: "No se encontró información disponible.",
        };
    }
  };



  const { columns, component, title, textError, renderDropDown } =
    getColumnsAndComponent(tabSelected);

  return (
    <>
      {isLoading ? (
        <SkeletonList count={8} />
      ) : (
        <>
          {tabSelected === "Datos" ? (
            <Datos />
          ) : (
            <DynamicTable
              title={title}
              rows={infoPatient?.data}
              columns={columns}
              clickable={tabSelected !== "Consultas" && tabSelected !== "HC Importados"}
              renderDropDown={renderDropDown}
              showHistoryIcon={true}
              renderCustomContent={component}
              textError={textError}
            />
          )}
        </>
      )}
    </>
  );
};

export default Page;
