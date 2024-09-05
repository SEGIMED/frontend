import { ApiSegimed } from '@/Api/ApiSegimed';
import IconDelete from '@/components/icons/IconDelete';
import IconUpload from '@/components/icons/IconUpload';
import React, { useState, useRef, useEffect } from 'react';
import IconCurrentRouteNav from '@/components/icons/IconCurrentRouteNav';
import InputInfoText from '@/components/ordenMedica/inputInfo';
import DropNext from '@/components/consulta/dropdown';

export default function ImportarHC({ onData, text, disabled, state }) {
    const fileInputRef = useRef(null);
    const [study, setStudy] = useState(null);
    const [studyBase, setStudyBase] = useState(null);
    const [title, setTitle] = useState("");
    const [studyType, setStudyType] = useState();
    const [description, setDescription] = useState("");
    const [catalog, setCatalog] = useState([]);

    useEffect(() => {
        const getCatalog = async () => {
            try {
                const response = await ApiSegimed.get(
                    "/catalog/get-catalog?catalogName=study_type"
                );
                if (response.data) {
                    setCatalog(response.data); // Guarda los objetos completos
                }
            } catch (error) {
                console.error(error);
            }
        };

        getCatalog();
    }, []);

    const handleButtonClick = (e) => {
        e.preventDefault(); // Previene el comportamiento predeterminado
        fileInputRef.current.click();
    };


    const handleOnChange = (e) => {
        try {
            if (e.target.files.length) {
                const selectedFile = e.target.files[0];
                setStudy(selectedFile)
                // Guarda el archivo en estado para referencia futura

                const reader = new FileReader();

                reader.onload = (event) => {
                    console.log(event.target.result);

                    const base64String = event.target.result; // Contenido del archivo en base64
                    setStudyBase(base64String);

                    sendData({ study: base64String, title, description, studyType }); // Envía el archivo en base64 al backend
                };

                reader.readAsDataURL(selectedFile); // Lee el archivo como una URL de datos (base64)
            }
        } catch (error) {
            console.error('Error al cargar archivo', error.message);
        }
    };

    const handleDeleteFile = () => {
        setStudy(null);
        sendData({ study: null, title, description, studyType });
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        sendData({ study: studyBase, title: e.target.value, description, studyType });
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
        sendData({ study: studyBase, title, description: e.target.value, studyType });
    };

    const handleStudyType = (name, value) => {
        const selectedStudy = catalog.find(item => item.name === value);
        if (selectedStudy) {
            setStudyType(selectedStudy.id); // Guarda el id en lugar del nombre
            sendData({ study: studyBase, title, description, studyType: selectedStudy.id });
        }
    };

    const sendData = (data) => {
        if (onData) {
            onData(data);
        }
    };

    return (
        <div className="w-full flex flex-col justify-start gap-2">
            <div className='gap-2 flex flex-col'>
                <div className='flex flex-col gap-2'>
                    <div className='flex gap-3 text-[#686868] font-medium text-base leading-5 items-center'>
                        <IconCurrentRouteNav className={'w-[1.5rem]'} />
                        <div>Tipo de archivo</div>
                    </div>
                    <DropNext
                        style={{
                            borderRadius: "0.5rem",
                            textAlign: "start",
                            borderWidth: "1px",
                            justifyContent: "flex-start",
                            opacity: "1",
                            color: "#686868",
                            background: "white"
                        }}
                        disabled={disabled}
                        name={"StudyType"}
                        handleOptionChange={handleStudyType}
                        options={catalog.map(item => item.name)} // Muestra solo los nombres
                        text2="Seleccionar tipo de archivo"
                        selectedOptions={state?.CatStudyTypePatientStudies?.name}

                    />
                </div>
                {!text && !disabled ?
                    <div className='flex flex-col gap-2'>
                        <div className='flex gap-3 text-[#686868] font-medium text-base leading-5 items-center'>
                            <IconCurrentRouteNav className={'w-[1.5rem]'} />
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
                                disabled={disabled}
                            />
                        </div>
                        <div>
                            {study && (
                                <div className="flex items-center gap-4">
                                    <span className='text-[#686868]'>{study.name}</span>
                                    <button onClick={handleDeleteFile}>
                                        <IconDelete />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div> : null}
                <div className='flex flex-col gap-3'>
                    <InputInfoText
                        onChange={handleTitleChange}
                        classNameInput={'md:w-full'}
                        title={"Titulo"}
                        placeholder={"Añadí un título"}
                        icon={<IconCurrentRouteNav className={'w-[1.5rem]'} />}
                        className={'md:px-0'}
                        disabled={disabled}
                        defaultValue={state?.title}
                    />
                    <InputInfoText
                        onChange={handleDescriptionChange}
                        text={true}
                        title={"Descripción"}
                        placeholder={"Añadí una descripción"}
                        icon={<IconCurrentRouteNav className={'w-[1.5rem]'} />}
                        disabled={disabled}
                        defaultValue={state?.description}
                    />
                </div>
            </div>
        </div>
    );
}
