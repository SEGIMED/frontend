"use client"
import { useState } from "react";

const QuestionsLanding = () => {

    const [openSections, setOpenSections] = useState({
        costo: false,
        historial: false,
        agendar: false,
        consulta: false,
        datos: false,
        compartir: false,
        herramientas: false,
        pacientes: false,
        urgencia: false,
        pedidos: false,
    });
    
    const handleToggle = (section) => {

        setOpenSections({
            costo: false,
            historial: false,
            agendar: false,
            consulta: false,
            datos: false,
            compartir: false,
            herramientas: false,
            pacientes: false,
            urgencia: false,
            pedidos: false,

            [section]: !openSections[section]
        });
    };

    return (
        <div className="flex flex-col pt-20 pb-40 gap-10">

            <div className=" text-[#234C91] text-center">                
                <h1 className="font-semibold text-4xl font-['Libre_Baskerville']">
                    PREGUNTAS FRECUENTES
                </h1>            
            </div>
            
            <div className="flex flex-col gap-5 mx-40">
                <div className="flex flex-col gap-3">
                    <div 
                        onClick={() => handleToggle("costo")}
                        className={`text-2xl flex justify-between font-extrabold border-b border-[#D7D7D7] p-1 ${openSections.costo ? 'text-[#487FFA]' : 'hover:text-[#487FFA]'}`}
                    >
                        <h3>La aplicación tiene algún costo?</h3> 
                        <span className="text-4xl">{openSections.costo ? '-' : '+'}</span>
                    </div>
                    {openSections.costo && (
                        <p>
                            SEGIMED es completamente gratis y la puedes usar todo el tiempo que desees sin costos ni recargos. ¡Compartela! para que tu familia tus amigos y todos puedan beneficiarse.
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-3">
                    <div 
                        onClick={() => handleToggle("historial")}
                        className={`text-2xl flex justify-between font-extrabold border-b border-[#D7D7D7] p-1 ${openSections.historial ? 'text-[#487FFA]' : 'hover:text-[#487FFA]'}`}
                    >
                        <h3>Como puedo crear mi historial clínico?</h3> 
                        <span className="text-4xl">{openSections.historial ? '-' : '+'}</span>
                    </div>
                    {openSections.historial && (
                        <p>
                            Es muy fácil, siguiendo los pasos en la APP podrás crear un perfil donde agregaras tus datos personal, cargarás tus estudios medicos, y podrás añadir toda la información médica necesaria para que tus medicos puedas conocer con exactitud tu estado de salud, evitando papeleos y perdida de información vital durante las consultas lo cual te ahorrará muchísimo tiempo.
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-3">
                    <div 
                        onClick={() => handleToggle("agendar")}
                        className={`text-2xl flex justify-between font-extrabold border-b border-[#D7D7D7] p-1 ${openSections.agendar ? 'text-[#487FFA]' : 'hover:text-[#487FFA]'}`}
                    >
                        <h3>Como puedo agendar una cita o un turno con mi médico?</h3> 
                        <span className="text-4xl">{openSections.agendar ? '-' : '+'}</span>
                    </div>
                    {openSections.agendar && (
                        <p>
                            Una vez tu y tu médico tengan SEGIMED, podras entrar al panel de citas medicas y ver la disponibilidad que tenga para atenderte prontamente, a traves de las modalidades: presencial, en los centros autorizados de atención, teleconsulta y consulta por chat desde donde quiera que estés.
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-3">
                    <div 
                        onClick={() => handleToggle("consulta")}
                        className={`text-2xl flex justify-between font-extrabold border-b border-[#D7D7D7] p-1 ${openSections.consulta ? 'text-[#487FFA]' : 'hover:text-[#487FFA]'}`}
                    >
                        <h3>Las consultas y el seguimiento tienen algún costo?</h3> 
                        <span className="text-4xl">{openSections.consulta ? '-' : '+'}</span>
                    </div>
                    {openSections.consulta && (
                        <p>
                            Contamos con muchos servicios gratuitos de seguimiento al alcance de todos nuestros pacientes afiliados, algunos servicios adicionales están sujetos a los convenios de las coberturas medicas, diversos planes en salud con otras prestadoras y centros medicos, asi como servicios personalizados de atención de acuerdo a los requerimientos y necesidades de cada paciente
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-3">
                    <div 
                        onClick={() => handleToggle("datos")}
                        className={`text-2xl flex justify-between font-extrabold border-b border-[#D7D7D7] p-1 ${openSections.datos ? 'text-[#487FFA]' : 'hover:text-[#487FFA]'}`}
                    >
                        <h3>Cómo protegen mis datos personales?</h3> 
                        <span className="text-4xl">{openSections.datos ? '-' : '+'}</span>
                    </div>
                    {openSections.datos && (
                        <p>
                            Toda tu información y datos se encuentran resguardados y encriptados por sofisticados sistemas de ciberseguridad en nuestras bases de datos, vigiladas por entes regulatorios certificados. Es nuestro mayor deber garantizarte la tranquilidad de que la protección de tus datos se encuentra asegurada y lista para usarla cuando desees
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-3">
                    <div 
                        onClick={() => handleToggle("compartir")}
                        className={`text-2xl flex justify-between font-extrabold border-b border-[#D7D7D7] p-1 ${openSections.compartir ? 'text-[#487FFA]' : 'hover:text-[#487FFA]'}`}
                    >
                        <h3>Podré usar y compartir mi Historial Médico?</h3> 
                        <span className="text-4xl">{openSections.compartir ? '-' : '+'}</span>
                    </div>
                    {openSections.compartir && (
                        <p>
                            Por su puesto, Tu historial médico te pertenece, es nuestro deber mantenerlo protegido para que solo tu y tu grupo de medicos en seguimiento puedan usarlo de manera eficaz y segura, es por eso que contamos con herramientas como TOKENS, pruebas de reconocimiento biométrico y doble verificación para mayor confiabilidad y seguridad de su uso.
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-3">
                    <div 
                        onClick={() => handleToggle("herramientas")}
                        className={`text-2xl flex justify-between font-extrabold border-b border-[#D7D7D7] p-1 ${openSections.herramientas ? 'text-[#487FFA]' : 'hover:text-[#487FFA]'}`}
                    >
                        <h3>Con que herramientas cuenta SEGIMED para vigilar mi estado de salud?</h3> 
                        <span className="text-4xl">{openSections.herramientas ? '-' : '+'}</span>
                    </div>
                    {openSections.herramientas && (
                        <p>
                            SEGIMED esta diseñada para integrar distintos métodos tecnológicos que incluyen sistemas de alarmas vinculado a dispositivos telemétricos remotos (tensiometros, saturometros, termometros, basculas, etc) con tecnología WIRELESS y Bluetooth, que dan aviso en tiempo real a tu grupo de médicos de tu condición. También generan un perfil de riesgo individualizado que permite los médicos tomar acciones con mas prontitud que en condiciones normales. Incluye ademas soporte 24/7 en caso de dudas, preguntas, inquietudes y síntomas sospechosos, disminuyendo el riesgo de aparición de eventos desafortunados, brindando una excelente opcion para la prevención.
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-3">
                    <div 
                        onClick={() => handleToggle("pacientes")}
                        className={`text-2xl flex justify-between font-extrabold border-b border-[#D7D7D7] p-1 ${openSections.pacientes ? 'text-[#487FFA]' : 'hover:text-[#487FFA]'}`}
                    >
                        <h3>SEGIMED es solo para pacientes o es tambien para médicos?</h3> 
                        <span className="text-4xl">{openSections.pacientes ? '-' : '+'}</span>
                    </div>
                    {openSections.pacientes && (
                        <p>
                            SEGIMED es Para ambos, ya que los 2 tendrán configuraciones distintas en sus paneles y con opciones personalizadas para ambos como el panel estadístico, en donde los médicos observarán en graficos los cambios, las alarmas, generarán órdenes médicas, recetas y actualizará el historial medico cada vez que se requiera, esto y mucho más podrás tener en SEGIMED.
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-3">
                    <div 
                        onClick={() => handleToggle("urgencia")}
                        className={`text-2xl flex justify-between font-extrabold border-b border-[#D7D7D7] p-1 ${openSections.urgencia ? 'text-[#487FFA]' : 'hover:text-[#487FFA]'}`}
                    >
                        <h3>Qué hacer en caso de URGENCIA / EMERGENCIA?</h3> 
                        <span className="text-4xl">{openSections.urgencia ? '-' : '+'}</span>
                    </div>
                    {openSections.urgencia && (
                        <p>
                            SEGIMED cuenta con una opción de GUARDIA VIRTUAL, donde te orienta y acompaña de manera remota en todo tu proceso cuando requieras acudir a un centro de salud de manera inmediata en caso intercurrencias, eventualidades o verdaderas emergencias, de esta manera el seguimiento no se perderá y los nuevos médicos que te atiendan podrán conocer al instante tus antecedentes e incluso, tener contacto con tus médicos tratantes a través del CHAT MÉDICO – MÉDICO y recibir información valiosa para una conducta acertada.
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-3">
                    <div 
                        onClick={() => handleToggle("pedidos")}
                        className={`text-2xl flex justify-between font-extrabold border-b border-[#D7D7D7] p-1 ${openSections.pedidos ? 'text-[#487FFA]' : 'hover:text-[#487FFA]'}`}
                    >
                        <h3>SEGIMED podrá realizar pedidos de medicamentos, recetas y otras solicitudes?</h3> 
                        <span className="text-4xl">{openSections.pedidos ? '-' : '+'}</span>
                    </div>
                    {openSections.pedidos && (
                        <p>
                            SEGIMED podrá generar todo esto y mucho mas, se incluyen todas las coberturas médicas y obras sociales, brindamos un soporte en la gestión de trámites, certificaciones, resúmenes de historias clinicas, autorización de medicamentos, procedimientos medicos, cirugias, Etc.
                        </p>
                    )}
                </div>
                
            </div>            
        </div>
    );
};

export default QuestionsLanding;