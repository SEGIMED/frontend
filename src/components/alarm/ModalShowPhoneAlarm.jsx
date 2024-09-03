import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import IconCurrentRouteNav from "../icons/IconCurrentRouteNav";
import Swal from "sweetalert2";

const ModalShowPhoneAlarm = ({ isOpen, onClose, cellphone }) => {
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(cellphone)
      .then(() => {
        // This part is optional, alert or a toast can be used to show success message
        Swal.fire({
          icon: "success",
          title: "Se copió el número con éxito",
        });
      })
      .catch((err) => {
        // Handle possible errors
        console.error("Error al copiar el número:", err);
        alert("Error al copiar el número");
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      placement={"center"}
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
                  Número de Celular
                </p>
              </div>
            </ModalHeader>
            <ModalBody className="py-1">
              <div className="flex items-center justify-center gap-2 p-2">
                <span className="font-bold text-xl">{cellphone}</span>
                <Button auto flat color="primary" onClick={copyToClipboard}>
                  Copiar
                </Button>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalShowPhoneAlarm;
