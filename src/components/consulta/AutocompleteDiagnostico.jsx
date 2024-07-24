import React, { useEffect, useState } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useAppDispatch } from "@/redux/hooks";
import { setSelectedOption as setSelectedOptionAction } from "@/redux/slices/doctor/formConsulta";
import { useFormContext } from "react-hook-form";

export default function AutocompleteDiagnostico({ options, text2, name, onOptionSelect }) {
  const [selectedOption, setSelectedOptionState] = useState(null);
  const { register } = useFormContext();
  const dispatch = useAppDispatch();

  const handleSelectionChange = (selectedValue) => {
    setSelectedOptionState(selectedValue);

    dispatch(setSelectedOptionAction({ name, option: selectedValue }));
    if (onOptionSelect) {
      onOptionSelect(selectedValue);
    }
  };
  const SwitchCatalogo  = (value) => {
    switch (value) {
      case "0":
        return "1";
      case "1":
        return "4";
      default:
        return "Medicamento Desconocido";
    }
  };
  return (
    <>
  
    <Autocomplete
      placeholder={text2}
      className="w-1/2 bg-white "
      aria-label="Dropdown menu with icons"
      style={{ border: 'none', boxShadow: 'none', outline: 'none' , backgroundColor: 'white', background: 'white',  }}
      onSelectionChange={(value) => {handleSelectionChange(SwitchCatalogo(value));}}
      {...register(name)}
      classNames={{
        base: 'white',
        popoverContent: 'bg-white',
        endContentWrapper: 'bg-white',
        
      }}
      variant="bordered"
    >
      {options.map((option, index) => (
        <AutocompleteItem
          key={index}
          value={option} // Utiliza el valor de la opción como el valor del AutocompleteItem
          aria-label={option}
        >
          {option}
        </AutocompleteItem>
      ))}
    </Autocomplete>
    </>
  );
}
