import Link from "next/link";

const SideBarItems = ({ name, path, icon: Icon, isActive, onClick, external }) => (
    external ? (
        <a
            onClick={onClick}
            href={path}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-4`}
        >
            <Icon className="w-6" />
            <li className="text-lg md:text-md">{name}</li>
        </a>
    ) : (
        <Link
            onClick={onClick}
            href={path}
            className={`flex items-center gap-4 ${isActive ? "text-[#487FFA]" : ""}`}
        >
            <Icon className="w-6" color={isActive ? "#487FFA" : "#B2B2B2"} />
            <li className="text-lg md:text-md">{name}</li>
        </Link>
    )
);

export default SideBarItems;
