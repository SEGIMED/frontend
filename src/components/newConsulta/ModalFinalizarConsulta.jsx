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
import { useEffect, useRef, useState } from "react";
import { ApiSegimed } from "@/Api/ApiSegimed";

const ModalFinalizarConsulta = ({
  isOpen,
  onOpenChange,
  onClose,
  onSubmit,
  diagnosticsData,
  primaryDiagnostic,
  setDiagnosticsData,
  setPrimaryDiagnostic,
}) => {
  const [searchTermDiagnostic, setSearchTermDiagnostic] = useState("");
  const [searchTerm, setSearchTerm] = useState([]);
  const [cie10, setCie10] = useState([]);
  const [errors, setErrors] = useState({});
  const autocompleteRef = useRef(null);
  const handleChange = (value) => {
    if (value === null) {
      setErrors((prev) => ({ ...prev, diagnostic: "" }));
      return;
    }

    const selectedItem = {
      id: value,
      description: cie10.find((cie) => cie.id === value).description,
    };
    const updatedDiagnostics = diagnosticsData.find(
      (diagnostic) => diagnostic.id === selectedItem.id
    )
      ? diagnosticsData.filter((item) => item !== selectedItem.id)
      : [...diagnosticsData, selectedItem];

    setDiagnosticsData("diagnostics", updatedDiagnostics);

    setTimeout(() => {
      setSearchTermDiagnostic("");
      autocompleteRef.current.blur();
    }, 500);
  };
  useEffect(() => {
    const fetchCie = async () => {
      if (searchTermDiagnostic.length >= 3) {
        try {
          const response = await ApiSegimed.get(
            `/cie10?search=${searchTermDiagnostic}`
          );

          if (response.data) {
            setCie10(response.data);
          }
        } catch (error) {
          console.error("Error fetching cie10:", error);
        }
      }
    };
    fetchCie();
  }, [searchTermDiagnostic]);

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
                <IconCurrentRouteNav className={"w-[1.5rem]"} />
                <p className={`font-medium text-base leading-6`}>
                  Finalizar consulta
                </p>
              </div>
            </ModalHeader>
            <ModalBody className="py-1">
              <div className="flex items-center gap-2">
                <IconClinicalHistory />
                <label className="font-medium text-[14px] font-Poppins">
                  Seleccionar diagnósticos
                </label>
              </div>
              <Autocomplete
                ref={autocompleteRef}
                aria-label="diagnostic"
                defaultItems={cie10}
                variant="bordered"
                listboxProps={{
                  emptyContent: "No se encontraron diagnósticos",
                }}
                onInputChange={(value) => setSearchTermDiagnostic(value)}
                inputValue={searchTermDiagnostic}
                placeholder="Ingresa el diagnóstico"
                className=" bg-white "
                isInvalid={errors.diagnostic ? true : false}
                onSelectionChange={(value) => {
                  handleChange(value);
                }}>
                {(cie) => (
                  <AutocompleteItem key={cie.id}>
                    {cie.description}
                  </AutocompleteItem>
                )}
              </Autocomplete>

              {diagnosticsData.length > 0 && (
                <>
                  <div className="flex items-center gap-2">
                    <IconClinicalHistory />
                    <label className="font-medium text-[14px] font-Poppins">
                      Selecciona el diagnóstico principal
                    </label>
                  </div>
                  {diagnosticsData.map((diagnostic) => (
                    <div key={diagnostic.id}>
                      <Checkbox
                        isSelected={primaryDiagnostic === diagnostic.id}
                        onValueChange={(value) =>
                          setPrimaryDiagnostic(
                            value ? diagnostic.id : primaryDiagnostic
                          )
                        }>
                        {diagnostic.description}
                      </Checkbox>
                    </div>
                  ))}
                </>
              )}
              {errors.diagnostic && (
                <span className="text-red-500 text-sm">
                  {errors.diagnostic}
                </span>
              )}
            </ModalBody>
            <ModalFooter>
              <Elboton
                nombre="Siguiente"
                className="mx-auto bg-[#70C247]"
                onPress={() => {
                  if (diagnosticsData.length === 0) {
                    setErrors((prev) => ({
                      ...prev,
                      diagnostic:
                        "Tiene que seleccionar al menos un diagnóstico.",
                    }));
                    return;
                  }
                  if (primaryDiagnostic === "") {
                    setErrors((prev) => ({
                      ...prev,
                      diagnostic:
                        "Tiene que seleccionar el diagnóstico principal.",
                    }));
                    return;
                  }
                  onSubmit();
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

export default ModalFinalizarConsulta;
