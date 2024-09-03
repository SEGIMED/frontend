"use client";

import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { ApiSegimed } from "@/Api/ApiSegimed";

export default function CentroDetAtención({ handleDisabled, state, handleChange, rol }) {
    const [selectedKeys, setSelectedKeys] = useState(new Set());
    const [selectedCenters, setSelectedCenters] = useState([]); // Estado para los centros seleccionados
    const [selectedIds, setSelectedIds] = useState([]); // Estado para almacenar los IDs de los centros seleccionados
    const [catalog, setCatalog] = useState([]);

    const getCatalog = async () => {
        try {
            const response = await ApiSegimed.get("/catalog/get-catalog?catalogName=center_att");
            if (response.data) {
                setCatalog(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getCatalog();

        // Si hay centros seleccionados en el estado, los establecemos por defecto
        if (state.centerAttention2) {
            const keysFromState = new Set(state.centerAttention2.map((center) => center.name));
            const idsFromState = state.centerAttention2.map((center) => center.id);
            handleDisabled(true);

            setSelectedKeys(keysFromState);
            setSelectedCenters(state.centerAttention2);
            setSelectedIds(idsFromState);
        }
    }, []);

    const handleSelectionChange = (keys) => {
        setSelectedKeys(keys);
        const centers = catalog.filter((item) => keys.has(item.name));
        const ids = centers.map((item) => item.id); // Obtenemos los IDs de los centros seleccionados
        const numericIds = ids.map(id => Number(id));
        setSelectedCenters(centers); // Actualizamos el estado con los centros seleccionados
        setSelectedIds(ids); // Actualizamos el estado con los IDs
        handleChange({ name: "centerAttention", option: numericIds });
        handleChange({ name: "centerAttention2", option: centers });
        if (rol === "Paciente") {
            handleChange({ name: "centerAttention", option: Number(ids[0]) });
        }

        handleDisabled(true);
    };

    return (
        <div className="w-full flex flex-col items-center gap-3">
            <p className="font-medium text-3xl leading-10 text-center">
                Seleccione su centro de atención
            </p>

            <Dropdown>
                <DropdownTrigger className="max-w-[25rem] md:max-w-[45rem]">
                    <Button
                        style={{
                            borderRadius: "0.5rem",
                            textAlign: "start",
                            borderWidth: "1px",
                            justifyContent: "flex-start",
                            opacity: "1",
                            color: "#686868",
                        }}
                        variant="bordered"
                    >
                        {selectedCenters.length > 0
                            ? Array.from(selectedKeys).join(", ")
                            : "Seleccione su centro de atención"}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="Seleccionar centro de atención"
                    variant="flat"
                    closeOnSelect={rol === "Paciente"}  // Cerrar al seleccionar si es "Paciente"
                    disallowEmptySelection
                    selectionMode={rol === "Paciente" ? "single" : "multiple"} // Modo de selección basado en el rol
                    selectedKeys={selectedKeys}  // Aseguramos que se mantengan seleccionadas las opciones
                    onSelectionChange={handleSelectionChange}
                >
                    {catalog?.map((item) => (
                        <DropdownItem key={item.name} value={item.name}>
                            {item.name}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}
