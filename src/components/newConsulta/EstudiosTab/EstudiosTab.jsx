import MenuDropDown from "@/components/dropDown/MenuDropDown";
import IconEditar from "@/components/icons/iconEditar";
import IconExportar from "@/components/icons/IconExportar";
import IconImportar from "@/components/icons/IconImportar";
import IconOptions from "@/components/icons/IconOptions";
import FileDisplay from "@/components/modal/ModalDoctor/modalDisplayFile";
import ImportarHC from "@/components/modal/ModalDoctor/modalImportarHC";
import ImportarMultiple from "@/components/modal/ModalDoctor/modalImportarMultiple";
import ModalModularizado from "@/components/modal/ModalPatient/ModalModurizado";
import DynamicTable from "@/components/table/DynamicTable";
import { useState } from "react";
import Swal from "sweetalert2";
import { ApiSegimed } from "@/Api/ApiSegimed";
import postPatientStudiesOrHc from "@/utils/dataFetching/fetching/postPetientStudiesOrHc";
import IconCircle from "@/components/icons/IconCircle";
import { Accordion, AccordionItem } from "@nextui-org/react";

// LISTAR LAS IMPORTACIONES !!
const ImportacionesColumns = [
  {
    label: "Fecha",
    key: "createdAt",
    showMobile: true,
    width: "w-8",
  },
  {
    label: "Hora",
    key: "createdAt",
    showMobile: true,
    width: "w-8",
  },
  {
    label: "Titulo",
    key: "title",
    showMobile: true,
    width: "w-16",
  },
  {
    label: "Descripcion",
    key: "description",
    showMobile: false,
    width: "w-16",
  },
];

const EstudiosTab = ({
  importacionesData,
  setImportacionesData,
  scheduleId,
  patientId,
}) => {
  const [isModalsOpen, setIsModalsOpen] = useState({
    details: false,
    file: false,
    import: false,
  });
  const [selectedImport, setSelectedImport] = useState({});
  const [dataImportar, setDataImportar] = useState({
    data: [],
    errors: [],
  });

  const openModal = (modal) => {
    setIsModalsOpen({
      ...isModalsOpen,
      [modal]: true,
    });
  };

  const closeModal = (modal) => {
    setIsModalsOpen({
      ...isModalsOpen,
      [modal]: false,
    });
  };

  const handleModalData = (data) => {
    setDataImportar({
      data: data,
      errors: [],
    });
  };

  const submitModalData = async () => {
    if (!dataImportar.data || dataImportar.data.length === 0) {
      return setDataImportar({
        ...dataImportar,
        errors: [{ message: "No hay datos para importar." }],
      }); // Retorna el error si no hay estudios
    }

    const errors = [];

    // Validación: Iterar sobre el array dataImportar y verificar los campos
    dataImportar.data.forEach((item, index) => {
      let itemErrors = {}; // Errores para cada objeto

      if (!item.title) {
        itemErrors.title = `El título es requerido.`;
      }

      if (!item.study) {
        itemErrors.study = `Debe haber al menos un estudio.`;
      }
      if (!item.description) {
        itemErrors.description = `Debe haber al menos una descripción.`;
      }

      if (Object.keys(itemErrors).length > 0) {
        errors[index] = itemErrors;
      }
    });

    // Si hay errores, retornar y salir de la función
    if (errors.length > 0) {
      setDataImportar({
        ...dataImportar,
        errors: errors,
      });
      return; // Salir si hay errores
    }

    const payload = {
      scheduleId: scheduleId,
      userId: patientId,
      studies: dataImportar.data,
    };

    try {
      // Realizar la petición POST
      await postPatientStudiesOrHc(payload);

      // Después de la petición POST, hacer un GET para obtener los estudios del paciente usando query parameters
      const getResponse = await ApiSegimed.get(
        `/patient-studies?userId=${patientId}&scheduleId=${scheduleId}`
      );

      // Setear los datos obtenidos en setImportaciones
      if (getResponse.data) {
        setImportacionesData(getResponse.data);
      }

      // Cerrar el modal después de la petición
      setIsModalsOpen({
        ...isModalsOpen,
        import: false,
      });

      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "La importación se realizó correctamente",
        confirmButtonColor: "#487FFA",
        confirmButtonText: "Aceptar",
      });
    } catch (error) {
      console.error("Error al enviar los datos:", error.message);
      setIsModalsOpen({
        ...isModalsOpen,
        import: false,
      });
      Swal.fire({
        title: "Error",
        text: "No pudo realizarse la importación, intente más tarde",
        icon: "error",
        confirmButtonColor: "#487FFA",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const handleDelete = async (row) => {
    const { id } = row;
    Swal.fire({
      title: "¿Está seguro?",
      text: "Esta seguro que desea eliminar este estudio?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Realizar la petición DELETE
          await ApiSegimed.delete(`/patient-studies?id=${id}`);

          // Después de la petición DELETE, hacer un GET para obtener los estudios del paciente usando query parameters
          const getResponse = await ApiSegimed.get(
            `/patient-studies?userId=${patientId}&scheduleId=${scheduleId}`
          );

          // Setear los datos obtenidos en setImportaciones
          if (getResponse.data) {
            setImportacionesData(getResponse.data);
          }

          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "El estudio se eliminó correctamente",
            confirmButtonColor: "#487FFA",
            confirmButtonText: "Aceptar",
          });
        } catch (error) {
          console.error("Error al eliminar el estudio:", error.message);
          Swal.fire({
            title: "Error",
            text: "No pudo eliminarse el estudio, intente más tarde",
            icon: "error",
            confirmButtonColor: "#487FFA",
            confirmButtonText: "Aceptar",
          });
        }
      }
    });
  };
  return (
    <div>
      <Accordion
        collapsible
        className="!px-0"
        defaultExpandedKeys={["estudios"]}>
        <AccordionItem
          key="estudios"
          textValue="estudios"
          title={
            <div className="flex items-center w-full justify-between">
              <p> </p>
              <div className="flex flex-row gap-4">
                <IconCircle className={"w-3"} />
                <span>Estudios</span>
              </div>
              <MenuDropDown
                label="Importar archivo"
                icon={<IconExportar color="#487FFA" />}
                classNameButton={
                  "border-[#487FFA] border-2 bg-[#FFFFFF] text-start text-[#487FFA] font-bold text-base leading-5"
                }
                categories={[
                  {
                    items: [
                      {
                        label: "Importar archivo",
                        onClick: () => {
                          openModal("import");
                        },
                        icon: <IconExportar color={"#B2B2B2"} />,
                      },
                    ],
                  },
                ]}
              />
            </div>
          }
          classNames={{
            base: "w-full bg-white ",
            content: "bg-[#FAFAFC] border-t-2 border-gray-200",
            title: "text-lg font-medium text-gray-900 w-full",
          }}>
          <div className="flex justify-between items-center"></div>
          <DynamicTable
            rows={importacionesData}
            columns={ImportacionesColumns}
            showHistoryIcon={true}
            renderDropDown={(row) => {
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
                          onClick: () => {
                            setSelectedImport(row);
                            setIsModalsOpen((prev) => ({
                              ...prev,
                              details: true,
                              file: false,
                            }));
                          },
                        },
                        {
                          label: "Ver archivo",
                          icon: <IconImportar color={"#B2B2B2"} />,
                          onClick: () => {
                            setSelectedImport(row);
                            setIsModalsOpen((prev) => ({
                              ...prev,
                              file: true,
                            }));
                          },
                        },
                        {
                          label: "Eliminar estudio",
                          icon: <IconImportar color={"#B2B2B2"} />,
                          onClick: () => {
                            handleDelete(row);
                          },
                        },
                      ].filter(Boolean),
                    },
                  ]}
                  className={"w-[40px] md:w-full lg:w-fit mx-auto"}
                />
              );
            }}
          />
        </AccordionItem>
      </Accordion>

      {/* Modal para Importar archivo */}
      <ModalModularizado
        isOpen={isModalsOpen.import}
        onClose={() => closeModal("import")}
        titleClassName={"text-[#686868]"}
        Modals={[
          <ImportarMultiple
            key={"importar hc"}
            onData={handleModalData}
            errors={dataImportar.errors}
          />,
        ]}
        title={"Importar Historia Clínica"}
        button1={"hidden"}
        button2={"bg-greenPrimary text-white block"}
        progessBar={"hidden"}
        size={" text-white max-h-[35rem] min-h-[15rem] md:w-[55rem]"}
        buttonText={{ end: `Importar` }}
        funcion={submitModalData}
      />
      {/* Modal para ver detalles de importacion */}
      <ModalModularizado
        isOpen={isModalsOpen.details}
        onClose={() => closeModal("details")}
        Modals={[
          <ImportarHC
            key={"importar hc"}
            state={selectedImport}
            disabled={true}
          />,
        ]}
        title={"Ver detalles de importacion"}
        button1={"hidden"}
        button2={"bg-greenPrimary text-white block"}
        progessBar={"hidden"}
        size={"md:min-h-[4rem] md:w-[35rem]"}
        buttonText={{ end: `Cerrar` }}
        buttonIcon={<></>}
      />
      {/* Modal para visualizar archivo */}
      <ModalModularizado
        isOpen={isModalsOpen.file}
        onClose={() => closeModal("file")}
        Modals={[<FileDisplay key={"displayFile"} state={selectedImport} />]}
        title={"Visualización de archivo"}
        button1={"hidden"}
        button2={"bg-greenPrimary text-white block"}
        progessBar={"hidden"}
        size={"md:min-h-[4rem] md:w-[35rem]"}
        buttonText={{ end: `Cerrar` }}
        buttonIcon={<></>}
      />
    </div>
  );
};

export default EstudiosTab;
