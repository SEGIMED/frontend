import IconAddPast from "../icons/IconAddPast";
import IconCircle from "../icons/IconCircle";
import IconDownload from "../icons/IconDownload";

const DownloadHistory = () => {
    return (
        <details className="relative">
            <summary className="flex justify-center items-center px-6 py-2 bg-[#487FFA] rounded-xl gap-3 cursor-pointer text-white font-bold">
                <IconDownload/>
                <p>Descargar</p>
            </summary>

            <ul className="absolute bg-white z-50 p-2 text-start w-64 right-0 border-2 border-[#D7D7D7] rounded-lg gap-4 mt-2 shadow-lg">
                <span className='flex items-center gap-2 justify-start text-sm font-medium'>
                    <IconAddPast/> Descargar Historial
                </span>
                                    
                <div className='p-5 flex flex-col gap-3'>
                    <li className='flex items-center justify-start gap-4 z-50'>
                        <IconCircle/>PDF
                    </li>

                    <li className='flex items-center justify-start gap-4 z-50'>
                        <IconCircle/>WORD
                    </li>

                    <li className='flex items-center justify-start gap-4 z-50'>
                        <IconCircle/>TXT
                    </li>
                </div>
            </ul>
        </details>
    )
};

export default DownloadHistory;