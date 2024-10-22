import {
  Autocomplete,
  AutocompleteItem,
  Checkbox,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import IconCurrentRouteNav from "../icons/IconCurrentRouteNav";
import IconClinicalHistory from "../icons/IconClinicalHistory";
import Elboton from "../Buttons/Elboton";
import IconArrowRight from "../icons/iconArrowRight";
import { useState } from "react";
import { listReasonsForConsultation } from "./utils";
const ModalNewConsulta = ({
  isOpen,
  onOpenChange,
  onClose,
  onSubmit,
  isLastConsultSelected,
  setIsLastConsultSelected,
}) => {
  const [value, setValue] = useState("");
  const onSelectionChange = (id) => {
    setValue(id);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      hideCloseButton={true}
      placement={"center"}
      disableAnimation
      classNames={{
        closeButton: "text-xl",
      }}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col py-3">
              <div className="w-full bg-white  border-b rounded-t-lg  border-b-[#DCDBDB] p-2 flex gap-3">
                <IconCurrentRouteNav className={"w-[1.5rem]"} />
                <p className={`font-medium text-base leading-6`}>
                  Nueva Consulta
                </p>
              </div>
            </ModalHeader>
            <ModalBody className="py-1">
              <div className="flex items-center gap-2">
                <IconClinicalHistory />
                <label className="font-medium text-[14px] font-Poppins">
                  Seleccione el motivo de consulta
                </label>
              </div>
              <Autocomplete
                aria-label="motivo"
                defaultItems={listReasonsForConsultation}
                listboxProps={{
                  emptyContent: "No se encontraron motivos de consulta",
                }}
                variant="bordered"
                placeholder="Ingrese el motivo de consulta"
                className="bg-white"
                selectedKey={value || null}
                onSelectionChange={onSelectionChange}>
                {(reason) => (
                  <AutocompleteItem key={reason.id}>
                    {reason.description}
                  </AutocompleteItem>
                )}
              </Autocomplete>
              <Checkbox
                isSelected={isLastConsultSelected}
                onValueChange={setIsLastConsultSelected}>
                Copiar los datos de la consulta anterior
              </Checkbox>
            </ModalBody>
            <ModalFooter>
              <Elboton
                nombre="Siguiente"
                disabled={
                  !value ||
                  value === "" ||
                  value === null ||
                  value === undefined
                }
                className="mx-auto bg-[#70C247]"
                onPress={() => {
                  onSubmit(value);
                }}
                icon2={<IconArrowRight />}
              />
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalNewConsulta;
