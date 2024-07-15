import ButtonNext from "@/components/consulta/button";

export default function Genero({ handleDisabled }) {
    return (
        <div className=" w-full flex flex-col items-center gap-3">
            <p className="font-medium text-3xl leading-10 text-center">
                ¿Cuál es su género?
            </p>
            <div>
                <ButtonNext
                    handleDisabled={handleDisabled}
                    options={["Masculino", "Femenino"]}
                    name={"genre"}
                />
            </div>
        </div>
    );
}
