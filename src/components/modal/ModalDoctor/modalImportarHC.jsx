// ImportarHC.jsx
import IconDelete from '@/components/icons/IconDelete';
import IconUpload from '@/components/icons/IconUpload';
import React, { useState, useRef } from 'react';
import IconCurrentRouteNav from '@/components/icons/IconCurrentRouteNav';
import InputInfoText from '@/components/ordenMedica/inputInfo';

export default function ImportarHC({ onData }) {
    const fileInputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleButtonClick = (e) => {
        e.preventDefault(); // Previene el comportamiento predeterminado
        fileInputRef.current.click();
    };

    const handleOnChange = (e) => {
        try {
            if (e.target.files.length) {
                const selectedFile = e.target.files[0];
                setFile(selectedFile);
                sendData({ file: selectedFile, title, description });
            }
        } catch (error) {
            console.error('Error al cargar archivo', error.message);
        }
    };

    const handleDeleteFile = () => {
        setFile(null);
        sendData({ file: null, title, description });
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        sendData({ file, title: e.target.value, description });
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
        sendData({ file, title, description: e.target.value });
    };

    const sendData = (data) => {
        if (onData) {
            onData(data);
        }
    };

    return (
        <div className="w-full flex flex-col justify-start gap-2">
            <div className='gap-2 flex flex-col'>
                <div className='flex gap-3'>
                    <IconCurrentRouteNav className={'w-4'} />
                    <div>Selecciona el archivo</div>
                </div>
                <div className="flex flex-row gap-3">
                    <button
                        className="flex items-center justify-start gap-3 py-2 px-6 border-2 bg-white border-[#D7D7D7] text-[#808080] rounded-lg text-base"
                        onClick={handleButtonClick}>
                        <IconUpload color="#808080" />
                        Adjuntar archivo
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleOnChange}
                        accept="application/pdf, image/*"
                    />
                </div>
                <div>
                    {file && (
                        <div className="flex items-center gap-4">
                            <span>{file.name}</span>
                            <button onClick={handleDeleteFile}>
                                <IconDelete />
                            </button>
                        </div>
                    )}
                </div>
                <div className='flex flex-col gap-3'>
                    <InputInfoText
                        onChange={handleTitleChange}
                        text={true}
                        title={"Titulo"}
                        placeholder={"Añadí un título"}
                        icon={<IconCurrentRouteNav className={'w-4'} />}
                        className={'md:px-0'}
                    />
                    <InputInfoText
                        onChange={handleDescriptionChange}
                        text={true}
                        title={"Descripción"}
                        placeholder={"Añadí una descripción"}
                        icon={<IconCurrentRouteNav className={'w-4'} />}
                    />
                </div>
            </div>
        </div>
    );
}
