import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import IconCurrentRouteNav from "../icons/IconCurrentRouteNav";
import IconClinicalHistory from "../icons/IconClinicalHistory";
import Elboton from "../Buttons/Elboton";
import IconArrowRight from "../icons/iconArrowRight";

const ModalInterconsulta = ({
  isOpen,
  onOpenChange,
  onClose,
  onSubmit,
  value,
  onChangeValue,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
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
                <IconCurrentRouteNav className={"w-4"} />
                <p className={`font-medium text-base leading-6`}>
                  Resolver Interconsulta
                </p>
              </div>
            </ModalHeader>
            <ModalBody className="py-1">
              <div className="flex items-center gap-2">
                <IconClinicalHistory />
                <label className="font-medium text-[14px] font-Poppins">
                  Respuesta
                </label>
              </div>
              <textarea
                className="border border-[#D7D7D7] outline-none h-[160px] p-2 font-normal text-[14px] resize-none"
                placeholder="Escriba la respuesta de la interconsulta."
                onChange={(e) => {
                  onChangeValue(e.target.value);
                }}
                value={value}
              />
            </ModalBody>
            <ModalFooter>
              <Elboton
                nombre="Resolver"
                className="mx-auto bg-[#70C247]"
                onPress={onSubmit}
                icon2={<IconArrowRight />}
              />
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalInterconsulta;
