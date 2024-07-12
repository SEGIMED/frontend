"use client";

import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  AutocompleteItem
} from "@nextui-org/react";

import { useAppDispatch } from "@/redux/hooks";
import { setSelectedOption } from "@/redux/slices/doctor/formConsulta";
import { useFormContext } from "react-hook-form";
import DrugModal from "../modal/ModalDoctor/DrugModal";

export default function AutocompleteDiagnostico({ options, text2, name }) {
  const [selectedOption, setSelectedOptionState] = useState(null);
  const { setValue, register } = useFormContext();
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log(selectedOption);

  }, [selectedOption]);

  const handleSelectionChange = (key) => {
    const selectedOption = key;
    setSelectedOptionState(selectedOption);

    dispatch(setSelectedOption({ name, option: selectedOption }));
    
  }
  return (
      <>
      <Autocomplete
        placeholder={text2}
        className="w-1/2 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg"
        aria-label="Dropdown menu with icons"
        style={{ border: 'none', boxShadow: 'none', outline: 'none', borderRadius: 'none' }}
        onSelectionChange={(keys) =>
          handleSelectionChange(Array.from(keys)[1])
        }
        {...register(name)}
      >
        {options.map((option, index) => (
          <AutocompleteItem
            key={index}
            value={option}
            aria-label={option}

          >
            {option}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      </>
  );
}
