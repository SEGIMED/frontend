import ButtonNext from "@/components/consulta/button";

export default function DispElectronicos({ handleDisabled, state }) {
    return (
        <div className=" w-full flex flex-col items-center gap-3">
            <p className="font-medium text-3xl leading-10 text-center">
                ¿Tiene dificultad para utilizar dispositivos electrónicos?
            </p>
            <div>
                <ButtonNext
                    selectedOptions={state.hasTechUseDifficulty}
                    handleDisabled={handleDisabled}
                    options={["Si", "No"]}
                    name={"hasTechUseDifficulty"}
                />
            </div>
        </div>
    );
}
