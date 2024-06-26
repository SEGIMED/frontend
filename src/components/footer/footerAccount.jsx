import IconCopyright from "@/components/icons/iconCopyright"

export const FooterAccount = () => {
    return (
        <div className="bg-[#F8F8F8] p-5 w-full flex items-center justify-center gap-3">
            <IconCopyright className="w-4"/>
            <p className="text-[#808080] text-xs">2024 desarrollado por SEGIMED® | Todos los derechos reservados.</p>
        </div>
    )
}