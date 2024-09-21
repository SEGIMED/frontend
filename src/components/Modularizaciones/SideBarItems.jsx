import Link from "next/link";

const SideBarItems = ({ name, path, icon: Icon, isActive, onClick, external, id }) => (
    external ? (
        <a
            id={id}  // Asignamos el id dinámicamente
            onClick={onClick}
            href={path}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-4`}
        >
            <Icon className="w-6" />
            <li className="text-lg md:text-md text-[#808080]">{name}</li>
        </a>
    ) : (
        <Link
            id={id}  // Asignamos el id dinámicamente
            onClick={onClick}
            href={path}
            className={`flex items-center gap-4 ${isActive ? "text-[#487FFA]" : "text-[#808080]"}`}
        >
            <Icon className="w-6" color={isActive ? "#487FFA" : "#B2B2B2"} />
            <li className="text-lg md:text-md">{name}</li>
        </Link>
    )
);

export default SideBarItems;