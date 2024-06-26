"use client"

import React, { useEffect, useRef, useState } from 'react';
import IconClose from "@/components/icons/IconClose";
import IconCurrentRouteNav from "@/components/icons/IconCurrentRouteNav";
import IconUpload from "@/components/icons/IconUpload";
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { adduser } from '@/redux/slices/user/user';
import Elboton from '@/components/Buttons/Elboton';
import { ApiSegimed } from '@/Api/ApiSegimed';
import Cookies from 'js-cookie';

const PhotoModalPte = ({ isOpen, onClose }) => {
    const dispatch = useAppDispatch();
    const fileInputRef = useRef(null);

    const avatar = useAppSelector(state => state.user.avatar);
    const user = useAppSelector(state => state.user);
    const [url, setUrl] = useState(avatar);
    const [tempUrl, setTempUrl] = useState(url);

    useEffect(() => {
        setUrl(avatar);
    }, [avatar]);

    useEffect(() => {
        setTempUrl(url);
    }, [url]);


    const handleClose = () => {
        setTempUrl(url); // Restablecer URL temporal al valor original
        onClose();
    };

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleOnChange = (e) => {
        try {
            if (e.target.files.length) {
                const file = e.target.files[0];
                const reader = new FileReader();

                reader.onload = (event) => {
                    setTempUrl(event.target.result);
                };

                reader.readAsDataURL(file);
            }
        } catch (error) {
            showNotify('error', 'Error al cargar imagen');
        }
    };

    const handleSaveChanges = async () => {
        setUrl(tempUrl);
        dispatch(adduser({ ...user, avatar: tempUrl }));
        const id = Cookies.get("c");
        const token = Cookies.get("a");
        const body = {
            avatar: JSON.stringify(tempUrl),
            patientId: Number(id)
        };
        await ApiSegimed.patch(`/update-full-patient`, body, { headers: { 'token': token } });

        onClose();
    };

    return isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none" onClick={handleClose}>
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="relative z-50 bg-white rounded w-[30rem] h-96 flex flex-col items-center gap-5" onClick={stopPropagation}>
                <div className="h-full w-full flex flex-col">
                    <div className="h-16 flex items-center justify-start gap-3 p-5 border-b-2 font-semibold">
                        <IconCurrentRouteNav className="w-4" /> Editar foto de perfil
                    </div>
                    <div className="w-full h-full flex flex-col items-center justify-between p-5">
                        <div className="flex justify-center items-center">
                            <div className="w-48 h-48 flex justify-center items-center">
                                <img
                                    src={tempUrl}
                                    alt="Perfil"
                                    className="w-full h-full object-cover rounded-full"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-around gap-3">
                            <Elboton icon={<IconUpload />} nombre={"Subir Foto"} onPress={handleButtonClick} />
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleOnChange}
                                accept="image/*"
                            />
                            <button
                                onClick={handleSaveChanges}
                                className="text-[#487FFA] text-sm font-medium"
                            >
                                Guardar Cambios
                            </button>
                        </div>
                    </div>
                </div>
                <button onClick={handleClose} className="absolute top-0 right-0 m-4 hover:transition duration-300 ease-in-out transform hover:scale-105 active:scale-100 active:translate-y-1">
                    <IconClose className="w-8" />
                </button>
            </div>
        </div>
    ) : null;
};

export default PhotoModalPte;