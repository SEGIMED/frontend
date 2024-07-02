"use client"
import React, { useState, useRef } from 'react';
import IconUpload from '../icons/IconUpload';
import { useAppDispatch } from '@/redux/hooks';

import IconCurrentRouteNav from '../icons/IconCurrentRouteNav';
import IconDownload from '../icons/IconDownload';

const FileUpload = ({ label , Link, Links}) => {
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
        <div className="p-6 mb-4">
            <div className="mb-2 font-semibold text-ms color-[#5F5F5F] flex gap-3 ">
                <IconCurrentRouteNav className="w-4" />{label}
            </div>
            <div className="flex flex-row gap-3">
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
            {Link && <a href={Link} className='mt-4"'>
                    <div className='flex items-center justify-between gap-3 pt-4 text-base border-b-transparent border-b-2 hover:border-[#5F5F5F] w-min'>
                    {Link}
                    </div>
                </a>}
                {Links?.map((sub, index) => (
                    <a href={sub} key={index} >
                    <div className='flex items-center justify-between gap-3 pt-4 text-base border-b-transparent border-b-2 hover:border-[#5F5F5F] w-min'>
                    {sub}
                    </div>
                </a>))} 
            {file && (
                <div className="mt-4">
                    <div className="flex items-center gap-4">
                        <span>{file.name}</span>
                        <button onClick={handleDeleteFile}>
                            <IconUpload className="w-4 text-red-500" />
                        </button>
                    </div>
                    {/* <textarea
                        className="w-full p-2 mt-2 border rounded"
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