"use client";

import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { ApiSegimed } from "@/Api/ApiSegimed";

export default function CentroDetAtención({ handleDisabled, state, handleChange }) {
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
            handleDisabled(true)

            setSelectedKeys(keysFromState);
            setSelectedCenters(state.centerAttention2);
            setSelectedIds(idsFromState);
        }
    }, []);

    const handleSelectionChange = (keys) => {
        setSelectedKeys(keys);
        const centers = catalog.filter((item) => keys.has(item.name));
        const ids = centers.map((item) => item.id); // Obtenemos los IDs de los centros seleccionados
        setSelectedCenters(centers); // Actualizamos el estado con los centros seleccionados
        setSelectedIds(ids); // Actualizamos el estado con los IDs
        handleChange({ name: "centerAttention", option: ids });
        handleChange({ name: "centerAttention2", option: centers });
        handleDisabled(true);
    }

    return (
        <div className="w-full flex flex-col items-center gap-3">
            <p className="font-medium text-3xl leading-10 text-center">
                Seleccione su centro de atención
            </p>

            <Dropdown>
                <DropdownTrigger className="w-auto ">
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
                    closeOnSelect={false}
                    disallowEmptySelection
                    selectionMode="multiple"
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
