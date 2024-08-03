import ButtonNext from "@/components/consulta/button";

export default function ViveSolo({ handleDisabled, state }) {
    return (
        <div className=" w-full flex flex-col items-center gap-3">
            <p className="font-medium text-3xl leading-10 text-center">
                ¿Vive solo?
            </p>
            <div>
                <ButtonNext
                    selectedOptions={state.liveAlone}
                    handleDisabled={handleDisabled}
                    options={["Si", "No"]}
                    name={"liveAlone"}
                />
            </div>
        </div>
    );
}
