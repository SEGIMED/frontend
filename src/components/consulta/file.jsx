"use client"
import React, { useState, useRef } from 'react';
import IconUpload from '../icons/IconUpload';
import { useAppDispatch } from '@/redux/hooks';

import IconCurrentRouteNav from '../icons/IconCurrentRouteNav';

const FileUpload = ({ label }) => {
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState("");
    const fileInputRef = useRef(null);
    const dispatch = useAppDispatch();

    const handleButtonClick = (e) => {
        e.preventDefault(); // Previene el comportamiento predeterminado
        fileInputRef.current.click();
    };

    const handleOnChange = (e) => {
        try {
            if (e.target.files.length) {
                const selectedFile = e.target.files[0];
                setFile(selectedFile);
                console.log({ msj: 'documento cargado con éxito', selectedFile });
            }
        } catch (error) {
            console.error('Error al cargar archivo', error.message);
        }
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleDeleteFile = () => {
        setFile(null);
        setDescription("");
    };

    return (
        <div className="mb-4 p-6">
            <div className="mb-2 font-semibold text-ms color-[#5F5F5F] flex gap-3 ">
                <IconCurrentRouteNav className="w-4" />{label}
            </div>
            <div>
                <button
                    className="flex items-center justify-center gap-3 py-2 px-6 border-2 border-[#D7D7D7]  text-[#808080] rounded-lg text-base "
                    onClick={handleButtonClick}
                >
                    <IconUpload /> Adjuntar archivo/informe
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleOnChange}
                    accept="application/pdf, image/*"
                />
            </div>
            {file && (
                <div className="mt-4">
                    <div className="flex items-center gap-4">
                        <span>{file.name}</span>
                        <button onClick={handleDeleteFile}>
                            <IconUpload className="w-4 text-red-500" />
                        </button>
                    </div>
                    {/* <textarea
                        className="mt-2 p-2 border rounded w-full"
                        placeholder="Describa el informe"
                        value={description}
                        onChange={handleDescriptionChange}
                    /> */}
                </div>
            )}
        </div>
    );
};

export default FileUpload;