"use client"
import React, { useState, useRef, useEffect } from 'react';
import IconUpload from '../icons/IconUpload';
import { useAppDispatch } from '@/redux/hooks';

import IconCurrentRouteNav from '../icons/IconCurrentRouteNav';
import IconDownload from '../icons/IconDownload';
import BotonPreconsulta from '../Buttons/BotonPreconsulta';
const FileUpload = ({ label, test, data, onTestSelectedOption, onTestActive, onUploadFile, onDescriptionChange, Link }) => {
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState("");
    const fileInputRef = useRef(null);
    const [orderedLinks, setOrderedLinks] = useState([])


    const handleButtonClick = (e) => {
        e.preventDefault(); // Previene el comportamiento predeterminado
        fileInputRef.current.click();
    };

    useEffect(() => {
        // Solo establece orderedLinks la primera vez que Links cambie
        if (!Link === "" && orderedLinks.length === 0) {// Captura el primer estado de Links
            setOrderedLinks(Link);
        }
    }, [Link]);
    console.log(orderedLinks);
    const handleOnChange = (e) => {
        try {
            if (e.target.files.length) {
                const selectedFile = e.target.files[0].name;
                setFile(selectedFile);
                const file = e.target.files[0];
                console.log(file);
                const reader = new FileReader();
                reader.onload = (event) => {
                    onUploadFile(test, event.target.result);
                };
                reader.readAsDataURL(file);
            }
        } catch (error) {
            console.error('Error al cargar archivo', error.message);
        }
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
        onDescriptionChange(test, e.target.value);
    };

    const handleDeleteFile = () => {
        setFile(null);
        setDescription("");
        onUploadFile(test, null);
    };

    return (
        <div className="p-6 pb-4 bg-[#fafafc]">
            <div className="mb-2 font-semibold text-ms color-[#5F5F5F] flex gap-3 ">
                <IconCurrentRouteNav className="w-4" />
                {label}
            </div>
            {(data?.binaryOptions && !data.file) && <div
                className='flex py-2 md:py-0 justify-evenly md:gap-3'>
                <BotonPreconsulta
                    label="Sí"
                    onClick={() => onTestActive(test, true)}
                    active={data.active}
                />
                <BotonPreconsulta
                    label="No"
                    onClick={() => onTestActive(test, false)}
                    active={data.active}
                />
            </div>}
            {test === 'lastAbnormalGlycemia' &&
                <input
                    type="text"
                    className="w-[20%] md:w-[8%] text-start text-[#5F5F5F] font-semibold text-base leading-6 bg-white border outline-[#a8a8a8] border-[#DCDBDB] rounded-lg px-2 md:px-4 py-1"
                    onChange={(e) => onTestSelectedOption(test, [Number(e.target.value)])}
                />
            }
            {(test !== 'pendingStudies' && test !== 'lastAbnormalGlycemia' && test !== 'abnormalGlycemia') &&
                <div className="flex flex-row gap-3">
                    <button
                        className="flex items-center justify-center gap-3 py-2 px-6 border-2 bg-white border-[#D7D7D7]  text-[#808080] rounded-lg text-base "
                        onClick={handleButtonClick}>
                        <IconUpload color="#808080" />
                        Adjuntar archivo/informe
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleOnChange}
                        accept="application/pdf, image/*"
                    />
                </div>
            }
            {test === 'pendingStudies' &&
                <div>
                    <textarea
                        className="w-full p-2 mt-2 border rounded"
                        placeholder="Describa el informe"
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                </div>
            }
            {orderedLinks && orderedLinks.length > 0 && (
                <a href={orderedLinks} className='mt-4'>
                    <div className='flex items-center justify-between gap-3 pt-4 text-base border-b-transparent border-b-2 hover:border-[#5F5F5F] w-min'>
                        {orderedLinks}
                    </div>
                </a>
            )}
            {file && (
                <div className="mt-4">
                    <div className="flex items-center gap-4">
                        <span>{file}</span>
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