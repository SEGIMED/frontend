import ButtonNext from "@/components/consulta/button";


export default function Hipertension({ handleDisabled, state }) {
    return (
        <div className=" w-full flex flex-col items-center gap-3">
            <p className="font-medium text-3xl leading-10 text-center">
                ¿Padece de Hipertensión Pulmonar?
            </p>
            <div>
                <ButtonNext
                    selectedOptions={state.hipertension}
                    handleDisabled={handleDisabled}
                    options={["Si", "No"]}
                    name={"hipertension"}
                />
            </div>
        </div>
    );
}
