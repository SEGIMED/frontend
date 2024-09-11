import React, { useEffect, useState } from "react";
import DynamicTable from "@/components/table/DynamicTable";
import SkeletonList from "@/components/skeletons/HistorialSkeleton";
import MenuDropDown from "@/components/dropDown/MenuDropDown";
import IconOptions from "@/components/icons/IconOptions";
import IconImportar from "@/components/icons/IconImportar";
import ModalModularizado from "@/components/modal/ModalPatient/ModalModurizado";
import ImportarHC from "@/components/modal/ModalDoctor/modalImportarHC";
import FileDisplay from "@/components/modal/ModalDoctor/modalDisplayFile";
import { useAppSelector } from "@/redux/hooks";
import { ApiSegimed } from "@/Api/ApiSegimed";

const ImportacionesSection = () => {
  const [importacionesData, setImportacionesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenFile, setIsModalOpenFile] = useState(false);
  const [selectedImport, setSelectedImport] = useState({});
  const user = useAppSelector((state) => state.clinicalHistory.user);

  useEffect(() => {
    const fetchImportationsData = async () => {
      try {
        const response = await ApiSegimed("/patient-studies", {
          params: { userId: user.id },
        });
        setImportacionesData(response.data);
      } catch (error) {
        console.error("Error fetching evoluciones data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImportationsData();
  }, [user.userId]);

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

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeModalFile = () => {
    setIsModalOpenFile(false);
  };

  const renderDropDown = (row) => (
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
                setIsModalOpen(true);
              },
            },
            {
              label: "Ver archivo",
              icon: <IconImportar color={"#B2B2B2"} />,
              onClick: () => {
                setSelectedImport(row);
                setIsModalOpenFile(true);
              },
            },
          ].filter(Boolean),
        },
      ]}
      className={"w-[40px] md:w-full lg:w-fit mx-auto"}
    />
  );

  return (
    <>
      {loading ? (
        <SkeletonList count={8} />
      ) : (
        <>
          <DynamicTable
            title="HC Importados"
            rows={importacionesData}
            columns={ImportacionesColumns}
            renderDropDown={renderDropDown}
            textError="No se encontraron historias clinicas disponibles."
          />

          <ModalModularizado
            isOpen={isModalOpen}
            onClose={closeModal}
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

          <ModalModularizado
            isOpen={isModalOpenFile}
            onClose={closeModalFile}
            Modals={[
              <FileDisplay key={"displayFile"} state={selectedImport} />,
            ]}
            title={"Visualizacion de archivo"}
            button1={"hidden"}
            button2={"bg-greenPrimary text-white block"}
            progessBar={"hidden"}
            size={"md:min-h-[4rem] md:w-[35rem]"}
            buttonText={{ end: `Cerrar` }}
            buttonIcon={<></>}
          />
        </>
      )}
    </>
  );
};

export default ImportacionesSection;
