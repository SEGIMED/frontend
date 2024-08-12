import Link from "next/link";

const DashboardButton = ({ href, icon: Icon, text }) => {
    return (
        <Link href={href} className="w-full lg:w-1/4">
            <div className="bg-gradient-to-br w-[100%] bg-bluePrimary flex justify-center items-center gap-1 xs:gap-3 text-white text-xl rounded-3xl h-24">
                <Icon className="w-[25%] md:w-12" color={"white"} />
                <span className="text-[16px] lg:text-2xl font-semibold">{text}</span>
            </div>
        </Link>
    );
};

export default DashboardButton;