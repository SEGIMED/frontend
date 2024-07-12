export default function ButtonBlueStandar ({text, funcion , iconLeft, iconRight}){
    return (
       
        <button onClick={funcion}
        className="flex rounded-xl items-center px-6 py-2 font-bold text-sm leading-5 bg-[#487FFA] text-white gap-1">
        {iconLeft}   
        {text}
        {iconRight}
        </button>

    )
}