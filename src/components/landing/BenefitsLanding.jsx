"use client"
import { useState } from "react";
import IconAlarm from "../icons/IconAlarm";
import IconCalendar from "../icons/IconCalendar";
import IconMessage from "../icons/IconMessage";
import IconRecord from "../icons/IconRecord";

const BenefitsLanding = () => {

    const [openSections, setOpenSections] = useState({
        atencion: false,
        equipo: false,
        asesoria: false,
        educacion: false,
    });
    
    const handleToggle = (section) => {
        setOpenSections({
            atencion: false,
            equipo: false,
            asesoria: false,
            educacion: false,
            [section]: !openSections[section]
        });
    };

    return (
        <div className="flex flex-col bg-white py-12 gap-10 shadow-xl">
            <div className="flex flex-col text-[#234C91] gap-10 w-full text-center">
                <div className="font-semibold text-4xl font-['Libre_Baskerville']">
                    <h1>BENEFICIOS</h1>
                </div>
                <div className="text-xl font-medium flex items-center justify-center">
                    <p className="w-7/12">Tu grupo de médicos y tu historial clínico te seguirán a donde quiera que estés, brindándote de manera rápida y eficaz una atención medica al instante.</p>
                </div>
            </div>
            <div className="text-[#234C91] text-2xl grid grid-cols-2 mx-40 font-extrabold">
                <h2>Tu bienestar es nuestra prioridad, te seguimos a donde vayas, únete a SEGIMED, empieza HOY!</h2>
            </div>
            <div className="grid grid-cols-2 mx-40 gap-10">
            <div className="flex flex-col justify-between gap-3">
                <div className="flex flex-col gap-3">
                    <div 
                        onClick={() => handleToggle("atencion")}
                        className={`text-2xl flex justify-between font-extrabold border-b border-[#D7D7D7] p-1 ${openSections.atencion ? 'text-[#487FFA]' : 'hover:text-[#487FFA]'}`}
                    >
                        <h3>Atención 24/7</h3> 
                        <span className="text-4xl">{openSections.atencion ? '-' : '+'}</span>
                    </div>
                    {openSections.atencion && (
                        <p>
                            Las hojas y los papeles son cosa del pasado, únete a la virtualidad de tu salud con SEGIMED. Recuerda, ¡Tu historial clínico te pertenece!
                        </p>
                    )}
                </div>
        
                <div className="flex flex-col gap-3">
                    <div 
                        onClick={() => handleToggle("equipo")}
                        className={`text-2xl flex justify-between font-extrabold border-b border-[#D7D7D7] p-1 ${openSections.equipo ? 'text-[#487FFA]' : 'hover:text-[#487FFA]'}`}
                    >
                        <h3 >Equipo especialista</h3> 
                        <span className="text-4xl">{openSections.equipo ? '-' : '+'}</span>
                    </div>
                    {openSections.equipo && (
                        <p>
                            Nuestro equipo de expertos se comunican entre ellos y a su vez contigo para que todos estén conjuntamente unidos en la lucha contra tus enfermedades y proporcionar un acompañamiento en el proceso de tu mejoría y bienestar.
                        </p>
                    )}
                </div>
        
                <div className="flex flex-col gap-3">
                    <div 
                        onClick={() => handleToggle("asesoria")}
                        className={`text-2xl flex justify-between font-extrabold border-b border-[#D7D7D7] p-1 ${openSections.asesoria ? 'text-[#487FFA]' : 'hover:text-[#487FFA]'}`}
                    >
                        <h3 >Asesoría gratuita</h3> 
                        <span className="text-4xl">{openSections.asesoria ? '-' : '+'}</span>
                    </div>
                    {openSections.asesoria && (
                        <p>
                            Nuestro equipo de asesores te brindarán el soporte que requieres para que aprendas a manejar la aplicación y todas sus funciones, como también individualizar el mejor plan de salud de acuerdo a tu estado clínico.
                        </p>
                    )}
                </div>
        
                <div className="flex flex-col gap-3">
                    <div 
                        onClick={() => handleToggle("educacion")}
                        className={`text-2xl flex justify-between font-extrabold border-b border-[#D7D7D7] p-1 ${openSections.educacion ? 'text-[#487FFA]' : 'hover:text-[#487FFA]'}`}
                    >
                        <h3 >Educación continua</h3> 
                        <span className="text-4xl">{openSections.educacion ? '-' : '+'}</span>
                    </div>
                    {openSections.educacion && (
                        <p>
                            Queremos que conozcas con detalle tu estado de salud, las últimas terapias médicas disponibles para ti, cómo enfrentar los retos diarios que presentas y responder a tus dudas e inquietudes a través de contenido interactivo educativo.
                        </p>
                    )}
                </div>
            </div>
                <div className="flex flex-col justify-between text-[#173D7D] text-xl gap-5">
                    <div className="flex items-center justify-center gap-5">
                        <div>
                            <IconMessage className="w-16"/>
                        </div>
                        <div className="font-bold">
                            Intercomunicación directa 
                            <span className="font-normal"> A través de chats y llamadas con tus médicos de preferencia donde quiera que estés.</span>                        
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-5">
                        <div>
                            <IconCalendar className="w-16"/>
                        </div>
                        <div className="font-bold">
                            Agenda citas
                            <span className="font-normal"> Con nuestro sistema de forma rápida y eficiente, garantizando así un proceso sin complicaciones.</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-5">
                        <div>
                            <IconAlarm className="w-16"/>
                        </div>
                        <div className="font-bold">
                            Sistema de alarmas
                            <span className="font-normal"> Conectado a dispositivos médicos que le permiten al grupo médico actuar con rapidez para prevenir y controlar tu salud.</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-5">
                        <div>
                            <IconRecord className="w-16"/>
                        </div>
                        <div className="font-bold">
                            Crea tu historial médico,
                            <span className="font-normal"> Usalo y compártelo con tu grupo de medico de manera fácil, rapida y segura.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BenefitsLanding;