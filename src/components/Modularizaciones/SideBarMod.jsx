"use client";

import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/redux/hooks";
import { resetApp } from "@/redux/rootReducer";
import { socket } from "@/utils/socketio";
import SideBarItems from "./SideBarItems";
import Elboton from "../Buttons/Elboton";
import rutas from "@/utils/rutas";
import LogoSegimed from "../logo/LogoSegimed";
import IconOut from "../icons/iconOut";

export const SideBarMod = ({ toggleSidebar, isOpen, buttons }) => {
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        Cookies.remove("a");
        Cookies.remove("b");
        Cookies.remove("c");
        Cookies.remove("d");

        try {
            socket.disconnect();
        } catch (e) {
            console.log(e);
        }
        dispatch(resetApp());

        router.push("/");

        setTimeout(() => {
            window.location.reload(true);
        }, 2000);
    };

    return (
        <div
            className={`flex ${isOpen ? "lg:relative block fixed inset-0 z-50" : "hidden"} lg:flex`}
        >
            <div className="h-screen overflow-y-auto gap-2 w-[60%] px-4 md:w-72 md:px-6 md:border-r-[1px] md:border-[#D7D7D7] py-8 bg-white flex flex-col justify-between shadow-lg md:shadow-none">
                <div className="flex flex-col justify-center gap-4 sm:gap-10">
                    {/* <Link href={`${rutas.Doctor}`} className="block"> */}
                    <LogoSegimed className="w-40 md:w-[80%]" />
                    {/* </Link> */}
                    <ul className="flex flex-col gap-3 md:gap-4">
                        {buttons.map((button) => (
                            <SideBarItems
                                key={button.path}
                                name={button.name}
                                path={button.path}
                                icon={button.icon}
                                isActive={pathname === button.path}
                                onClick={toggleSidebar}
                                external={button.external} // Añade soporte para enlaces externos
                            />
                        ))}
                        <Elboton
                            icon={<IconOut />}
                            className={"font-bold h-[52px] flex sm:hidden text-[15px]"}
                            nombre={"Cerrar sesión"}
                            onPress={handleLogout}
                        />
                    </ul>
                </div>
                <Elboton
                    icon={<IconOut />}
                    className={"font-bold min-h-[45px] h-[52px] hidden sm:flex text-[15px]"}
                    nombre={"Cerrar sesión"}
                    onPress={handleLogout}
                />
            </div>
            <div className="flex-1 bg-black opacity-50" onClick={toggleSidebar}></div>
        </div>
    );
};