import { ApiSegimed } from '@/Api/ApiSegimed';
import IconDelete from '@/components/icons/IconDelete';
import IconUpload from '@/components/icons/IconUpload';
import React, { useState, useRef, useEffect } from 'react';
import IconCurrentRouteNav from '@/components/icons/IconCurrentRouteNav';
import InputInfoText from '@/components/ordenMedica/inputInfo';
import DropNext from '@/components/consulta/dropdown';

export default function ImportarMultiple({ onData, text, disabled, state, errors = [] }) {
    const fileInputRef = useRef(null);
    const [studies, setStudies] = useState([]);
    const [catalog, setCatalog] = useState([]);
    const [SizeFile, setSizeFile] = useState("");

    useEffect(() => {
        const getCatalog = async () => {
            try {
                const response = await ApiSegimed.get(
                    "/catalog/get-catalog?catalogName=study_type"
                );
                if (response.data) {
                    setCatalog(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        getCatalog();
    }, []);

    const handleButtonClick = (e) => {
        e.preventDefault();
        fileInputRef.current.click();
    };

    const handleOnChange = (e) => {
        try {
            if (e.target.files.length) {
                const selectedFiles = Array.from(e.target.files);
                const MAX_SIZE_MB = 10 * 1024 * 1024; // 10MB en bytes
                const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/gif"]; // Tipos de archivo permitidos

                selectedFiles.forEach(file => {
                    // Validar tipo de archivo
                    if (!allowedTypes.includes(file.type)) {
                        setSizeFile(`El tipo de archivo "${file.name}" no es permitido. Solo se aceptan imágenes y archivos PDF.`);
                        return; // Salir si el tipo de archivo no es permitido
                    }

                    if (file.size > MAX_SIZE_MB) {
                        setSizeFile(`El archivo supera los 10MB: ${file.name}`);
                        return; // Salir si el archivo es demasiado grande
                    }

                    const reader = new FileReader();
                    setSizeFile("");
                    reader.onload = (event) => {
                        const base64String = event.target.result;
                        const newStudy = {
                            file,
                            study: base64String,
                            title: '',
                            description: '',
                            studyType: null
                        };

                        setStudies(prevStudies => {
                            const updatedStudies = [...prevStudies, newStudy];
                            onData(updatedStudies); // Enviar los estudios actualizados al componente padre
                            return updatedStudies;
                        });
                    };

                    reader.readAsDataURL(file);
                });
            }
        } catch (error) {
            console.error('Error al cargar archivo', error.message);
        }
    };

    const handleDeleteFile = (index) => {
        const updatedStudies = studies.filter((_, i) => i !== index);
        setStudies(updatedStudies);
        onData(updatedStudies);
    };

    const handleInputChange = (index, field, value) => {
        const updatedStudies = [...studies];
        updatedStudies[index][field] = value;
        setStudies(updatedStudies);
        onData(updatedStudies);
    };

    const handleStudyType = (index, value) => {
        const selectedStudy = catalog.find(item => item.name === value);
        if (selectedStudy) {
            const updatedStudies = [...studies];
            updatedStudies[index].studyType = Number(selectedStudy.id);
            setStudies(updatedStudies);
            onData(updatedStudies);
        }
    };

    return (
        <div className="w-full h-full flex flex-col justify-start items-center gap-2">
            <div className='gap-2 w-full flex flex-col'>
                <div className='flex w-full flex-col gap-2'>
                    {!text && !disabled ? (
                        <div className='flex w-full flex-col gap-2 justify-center items-center'>
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
                                    multiple
                                    disabled={disabled}
                                />

                            </div>
                            <span className='text-red-500 text-center'> {SizeFile}</span>
                            {errors[0] && errors[0].message ? <span className='text-red-500'>Seleccione un archivo</span> : null}
                            <div className='w-full max-h-[20rem] flex flex-col overflow-y-auto'>
                                {studies.map((study, index) => (
                                    <div key={index} className="flex flex-col w-full gap-4  mt-4">
                                        <div className="flex items-center gap-4">
                                            <span className='text-[#686868]'>{study.file.name}</span>
                                            <button onClick={() => handleDeleteFile(index)}>
                                                <IconDelete />
                                            </button>
                                        </div>

                                        <div className='flex flex-col md:flex-row gap-3 items-center w-full justify-start'>
                                            <DropNext
                                                style={{
                                                    borderRadius: "0.5rem",
                                                    textAlign: "start",
                                                    borderWidth: "1px",
                                                    justifyContent: "flex-start",
                                                    opacity: "1",
                                                    color: "#686868",
                                                    background: "white",
                                                }}
                                                disabled={disabled}
                                                name={"StudyType"}
                                                handleOptionChange={(name, value) => handleStudyType(index, value)}
                                                options={catalog.map(item => item.name)}
                                                text2="Seleccionar tipo de archivo"
                                            />

                                            <InputInfoText
                                                onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                                                classNameInput={`md:w-full ${errors[index]?.title ? 'border-red-500' : ''}`}  // Si hay un error, agregar clase 'border-red-500'
                                                placeholder={"Añadí un título"}
                                                icon={<IconCurrentRouteNav className={'w-[1.5rem]'} />}
                                                className={'md:px-0 w-full'}
                                                disabled={disabled}
                                                defaultValue={study.title}
                                            />

                                            <InputInfoText
                                                onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                                                classNameInput={`md:w-[24rem] ${errors[index]?.description ? 'border-red-500' : ''}`}  // Si hay un error, agregar clase 'border-red-500'
                                                className={'md:px-0 w-full'}
                                                placeholder={"Añadí una descripción"}
                                                icon={<IconCurrentRouteNav className={'w-[1.5rem]'} />}
                                                disabled={disabled}
                                                defaultValue={study.description}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}