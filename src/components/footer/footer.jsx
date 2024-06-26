import LogoSegimed from "../logo/LogoSegimed"
import IconMail from "../icons/iconMail.jsx"
import IconPhone from "../icons/iconPhone.jsx"
import IconCopyright from "../icons/iconCopyright"
import IconIg from "../icons/iconIg"
import IconFacebook from "../icons/iconFacebook"
import IconYoutube from "../icons/iconYoutube"
import IconX from "../icons/inconX"
import IconTikTok from "../icons/iconTikTok"

export const Footer = () => {
    return (
        <div className="flex flex-col w-screen  bg-[#F2F2F2]">
            <div className="p-10 flex items-center justify-center">
                <LogoSegimed />
            </div>
            <div className="flex flex-row justify-center items-center">
                <span className="w-full md:w-1/2 flex flex-col justify-start items-center p-10">
                    <h3 className="text-gray-500 font-poppins text-base font-medium leading-6 tracking-normal text-left">Sobre nosotros</h3>
                    <p className="text-gray-500 font-inter text-base font-normal leading-5 tracking-normal text-center">SEGIMED es una novedosa plataforma médica interactiva que permite una intercomunicación continua entre médicos y pacientes, generando un vínculo 
                        entre ambos donde quieras que estés.</p>
                </span>
                <span className="w-full md:w-1/2 flex flex-col justify-start items-start p-10">
                    <h3 className="text-gray-500 font-poppins text-base font-medium leading-6 tracking-normal text-left">Contactos</h3>
                    <ul>
                    <li className="flex items-center">
                        <span><IconMail/></span>
                        <span className="font-bold ml-2 mr-2"> Pacientes: </span>
                        <span>segimedpacientes@gmail.com</span>
                    </li>
                    <li className="flex items-center">
                        <span><IconMail/></span>
                        <span className="font-bold ml-2 mr-2">Corporativo: </span>
                        <span>segimedcontacto@gmail.com </span>
                    </li>
                        <li className="flex items-center">
                            <span><IconPhone color="#808080"/></span>
                            <span className="font-bold ml-2 mr-2">Teléfono: </span>
                            <span>+54 1156008013</span>
                        </li>
                    </ul>
                </span>
            </div>
                <div className="w-screen bg-gray-200 flex justify-center items-center">
                    <ul className="flex flex-col items-center">
                        <li className="flex items-center">
                            <span className="ml-2 mr-2"><IconIg/></span> 
                            <span className="ml-2 mr-2"><IconYoutube/></span>
                            <span className="ml-2 mr-2"><IconFacebook/></span>
                            <span className="ml-2 mr-2"><IconX/></span>
                            <span className="ml-2 mr-2"><IconTikTok/></span>
                        </li>
                        <li className="flex items-center">
                            <span className="ml-2 mr-1"><IconCopyright/></span>
                            <span className="text-gray-600 font-inter text-base font-normal leading-5 tracking-normal text-left">2024 desarrollado por SEGIMED® | 
                            Todos los derechos reservados.</span>
                        </li>
                    </ul>
                </div>
        </div>
    )
}
