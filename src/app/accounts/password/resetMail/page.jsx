"use client";

import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Image from "next/image";
import LostPassword from "@/components/images/reset.png";
import IconSend from "@/components/icons/IconSend";
import { ApiSegimed } from "@/Api/ApiSegimed";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import IconPasswordClose from "@/components/icons/IconPasswordClose";
import IconPasswordOpen from "@/components/icons/IconPasswordOpen";
import { NavBar } from "@/components/NavBar/navbar";
import IconCheckBoton from "@/components/icons/iconCheckBoton";

export default function AuthSelect() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const router = useRouter();
    const [otp, setOtp] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const searchParams = useSearchParams();

    useEffect(() => {
        if (!searchParams.get("codeOTP") || !searchParams.get("userEmail")) {
            router.push("/");
        }
        searchParams.get("codeOTP") && setOtp(searchParams.get("codeOTP"));
        searchParams.get("userEmail") &&
            setUserEmail(searchParams.get("userEmail"));
    }, [searchParams, router]);
    const onSubmit = async (data) => {
        try {
            const body = {
                userEmail: userEmail,
                temporaryCode: otp,
                userPassword: data.newPassword,
            };

            const response = await ApiSegimed.post("/user/modify-password", body);

            Swal.fire({
                title: "¡Contraseña actualizada correctamente!",
                text: response.data.msg,
                icon: "success",
                confirmButtonColor: "#487FFA",
                confirmButtonText: "Aceptar",
            }).then(() => router.push("/"));
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "No pudo actualizar la contraseña",
                text: error?.response?.data.error,
                icon: "error",
                confirmButtonColor: "#487FFA",
                confirmButtonText: "Aceptar",
            });
        }
    };
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const newPassword = watch("newPassword");
    const confirmPass = watch("confirmPassword");

    const passwordCriteria = {
        hasUpperCase: newPassword && /[A-Z]/.test(newPassword),
        hasLowerCase: newPassword && /[a-z]/.test(newPassword),
        hasSpecialChar: newPassword && /[\W_]/.test(newPassword),
        hasMinLength: newPassword?.length >= 6,
        isEqual: newPassword && newPassword === confirmPass,
    };

    return (
        <div className="mx-auto h-screen flex justify-center items-center antialiased">
            <div className="md:w-1/2 mx-auto flex flex-col gap-10">
                <NavBar />
                <div className="flex flex-col gap-5 px-8 py-10">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <header className="px-8 pb-5">
                            <h2 className="text-2xl text-[#5F5F5F] text-center pb-3 font-semibold leading-7 capitalize">
                                Ingrese su nueva contraseña
                            </h2>
                            <p className="hidden md:flex text-center text-[#5F5F5F] font-normal text-base leading-7">
                                Ya puede establecer una nueva contraseña para su cuenta. Por
                                favor, asegúrese de que sea una combinación única que no haya
                                utilizado previamente. Esto es esencial para mantener la
                                seguridad de su cuenta.
                            </p>
                        </header>
                        <fieldset className="px-8 pb-5">
                            <input type="hidden" value={otp} />
                            <input type="hidden" value={userEmail} />

                            <label className="w-full">
                                <p className="text-[#5F5F5F] pb-2 leading-3 pt-10">
                                    Nueva contraseña
                                </p>
                                <input
                                    {...register("newPassword", {
                                        required: {
                                            value: true,
                                            message: "* Este dato es requerido *",
                                        },
                                        minLength: {
                                            value: 6,
                                            message:
                                                "La contraseña debe tener al menos 6 caracteres.",
                                        },
                                        maxLength: {
                                            value: 20,
                                            message:
                                                "La contraseña no debe exceder los 20 caracteres.",
                                        },
                                        pattern: {
                                            value:
                                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,20}$/,
                                            message:
                                                "La contraseña debe tener letras mayúscula, letras minúscula, un número y un carácter especial.",
                                        },
                                    })}
                                    type={showPassword ? "text" : "password"}
                                    className="text-[#808080] w-full bg-[#F2F2F2] px-6 py-2 border leading-3 rounded-lg border-[#DCDBDB] font-normal text-base focus:outline-[#808080]"
                                    placeholder="Ingrese su nueva contraseña"
                                />
                                <div className="relative">
                                    <button
                                        type="button"
                                        className="absolute right-2 focus:outline-none pb-14"
                                        onClick={togglePasswordVisibility}
                                        style={{ top: 0, bottom: 0, margin: "auto" }}>
                                        {showPassword ? (
                                            <IconPasswordOpen />
                                        ) : (
                                            <IconPasswordClose />
                                        )}
                                    </button>
                                </div>
                            </label>
                            <ul className="mt-2 text-sm ">
                                <li
                                    className={`flex gap-2  items-center whitespace-nowrap ${passwordCriteria.hasUpperCase ? "text-[#70C247]" : ""}`}>
                                    {passwordCriteria.hasUpperCase && (
                                        <IconCheckBoton className={"w-4"} />
                                    )}{" "}
                                    Debe contener una letra mayúscula
                                </li>
                                <li
                                    className={`flex gap-2  items-center whitespace-nowrap ${passwordCriteria.hasLowerCase ? "text-[#70C247]" : ""}`}>
                                    {passwordCriteria.hasLowerCase && (
                                        <IconCheckBoton className={"w-4"} />
                                    )}{" "}
                                    Debe contener una letra minúscula
                                </li>
                                <li
                                    className={`flex gap-2  items-center whitespace-nowrap ${passwordCriteria.hasSpecialChar ? "text-[#70C247]" : ""}`}>
                                    {passwordCriteria.hasSpecialChar && (
                                        <IconCheckBoton className={"w-4"} />
                                    )}{" "}
                                    Debe contener un carácter especial
                                </li>
                                <li
                                    className={`flex gap-2  items-center whitespace-nowrap ${passwordCriteria.hasMinLength ? "text-[#70C247]" : ""}`}>
                                    {passwordCriteria.hasMinLength && (
                                        <IconCheckBoton className={"w-4"} />
                                    )}{" "}
                                    Debe tener al menos 6 caracteres
                                </li>
                                <li
                                    className={`flex gap-2  items-center whitespace-nowrap ${passwordCriteria.isEqual ? "text-[#70C247]" : ""}`}>
                                    {passwordCriteria.isEqual && (
                                        <IconCheckBoton className={"w-4"} />
                                    )}{" "}
                                    Deben coincidir las contraseñas
                                </li>
                            </ul>

                            <label className="w-full">
                                <p className="text-[#5F5F5F] pb-2 pt-10 leading-3">
                                    Confirme su nueva contraseña
                                </p>
                                <input
                                    {...register("confirmPassword", {
                                        required: true,
                                        validate: (value) =>
                                            value === newPassword || "*Las contraseñas no coinciden",
                                    })}
                                    type={showPassword ? "text" : "password"}
                                    className="text-[#808080] w-full bg-[#F2F2F2] px-6 leading-3 py-2 border rounded-lg border-[#DCDBDB] font-normal text-base focus:outline-[#808080]"
                                    placeholder="Ingrese nuevamente su contraseña"
                                />
                                <div className="relative">
                                    <button
                                        type="button"
                                        className="absolute right-2 focus:outline-none pb-14"
                                        onClick={togglePasswordVisibility}
                                        style={{ top: 0, bottom: 0, margin: "auto" }}>
                                        {showPassword ? (
                                            <IconPasswordOpen />
                                        ) : (
                                            <IconPasswordClose />
                                        )}
                                    </button>
                                </div>
                            </label>
                        </fieldset>
                        <div className="flex items-center justify-center text-center">
                            <button
                                type="submit"
                                className="text-white text-center bg-[#70C247] px-10 py-3 rounded-md flex items-center gap-2 hover:bg-[#70C247] transition duration-300 ease-in-out transform hover:scale-105 active:scale-100 active:translate-y-1">
                                Establecer nueva contraseña <IconSend />
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="hidden md:flex md:w-1/2 h-full bg-gradient-to-br from-blue-400 via-blue-600 to-blue-400 items-center justify-center flex-col">
                <Image
                    src={LostPassword}
                    width={600}
                    height={300}
                    alt="Lost Password Image"
                />
                <h3 className="text-center px-8 py-2 text-lg font-normal leading-8 text-white">
                    SEGIMED es una novedosa plataforma médica interactiva que permite una
                    intercomunicación continua entre médicos y pacientes, generando un
                    vínculo entre ambos donde quieras que estés.
                </h3>
            </div>
        </div>
    );
}
