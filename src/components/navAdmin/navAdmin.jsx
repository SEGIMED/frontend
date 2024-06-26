'use client'

import { usePathname, useRouter } from 'next/navigation';
import Link from "next/link";
import Cookies from "js-cookie";

import LogoSegimed from "../logo/LogoSegimed"
import IconOut from "../icons/iconOut";

import IconPatientNav from "../icons/IconPatientNav"

import IconCube from "../icons/IconCube"
import IconDoctorNav from "../icons/IconDoctorNav"

import SoporteTecnico from "../icons/IconSoporte";
import Sugerencias from "../icons/IconSugerencias";
import rutas from "@/utils/rutas";
export const NavAdmin = () => {
    
    const pathname = usePathname()
    const router = useRouter()

    const handleLogout = () => {
        Cookies.remove('a')
        Cookies.remove('b')
        Cookies.remove('c')

        router.push('/');
    };

    return (

        <div className="h-screen w-fit px-6 py-5 border-r-2 border-[#cecece] flex flex-col justify-between" >
            <div className="flex flex-col justify-center gap-5 ">            
                <Link href="/" >
                    <LogoSegimed/>
                </Link>

                <div className="justify-center">
                    <ul className="flex flex-col gap-4" >
                        <Link 
                            href={rutas.Admin} 
                            className={`flex items-center gap-4 ${pathname === rutas.Admin ? 'text-[#487FFA]' : ''}`}>
                            <IconCube 
                                className="w-5" 
                                    iconColor={`${pathname === rutas.Admin ? '#487FFA' : '#B2B2B2'}`} />
                            <li >Tablero</li>
                        </Link>

                        <Link 
                            href={`${rutas.Admin}${rutas.Mi_Perfil}`} 
                            className={`flex items-center gap-4 ${pathname === `${rutas.Doctor}${rutas.Mi_Perfil}` ? 'text-[#487FFA]' : ''}`}>
                            <IconDoctorNav 
                                className="w-6" 
                                color={`${pathname === `${rutas.Admin}${rutas.Mi_Perfil}` ? '#487FFA' : '#B2B2B2'}`} />
                            <li>Mi perfil</li>
                        </Link>

                
                       

                        <Link 
                            href={`${rutas.Admin}${rutas.Pacientes}`} 
                            className={`flex items-center gap-4 ${pathname === `${rutas.Admin}${rutas.Pacientes}` ? 'text-[#487FFA]' : ''}`}>
                            <IconPatientNav 
                                className="w-6" 
                                color={`${pathname === `${rutas.Admin}${rutas.Pacientes}` ? '#487FFA' : '#B2B2B2'}`} />
                            <li>Pacientes</li>
                        </Link>

                        <Link 
                            href={`${rutas.Admin}${rutas.Doctores}`} 
                            className={`flex items-center gap-4 ${pathname === `${rutas.Admin}${rutas.Doctores}` ? 'text-[#487FFA]' : ''}`}>
                            <SoporteTecnico 
                                className="w-6" 
                                color={`${pathname === `${rutas.Admin}${rutas.Doctores}` ? '#487FFA' : '#B2B2B2'}`} />
                            <li>Doctores</li>
                        </Link>

                        <Link 
                            href={`${rutas.Admin}${rutas.Sugerencias}`} 
                            className={`flex items-center gap-4 ${pathname === `${rutas.Admin}${rutas.Sugerencias}` ? 'text-[#487FFA]' : ''}`}>
                            <Sugerencias 
                                className="w-6" 
                                color={`${pathname === `${rutas.Admin}${rutas.Sugerencias}` ? '#487FFA' : '#B2B2B2'}`} />
                            <li>Sugerencias</li>
                        </Link>
                    </ul>
                </div>
                
            </div>
            
            <button 
                className="w-full flex items-center justify-center gap-3 text-white bg-[#487FFA] p-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105 active:scale-100 active:translate-y-1" 
                onClick={handleLogout}
            >
                <IconOut/>Cerrar sesión
            </button>            
        </div >
    )
}