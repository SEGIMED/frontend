import ButtonNext from "@/components/consulta/button";

export default function UsoCelular({ handleDisabled, state }) {
    return (
        <div className=" w-full flex flex-col items-center gap-3">
            <p className="font-medium text-3xl leading-10 text-center">
                ¿Necesita acompañamiento para utilizar su celular?
            </p>
            <div>
                <ButtonNext
                    selectedOptions={state.UsoCelular}
                    handleDisabled={handleDisabled}
                    options={["Si", "No"]}
                    name={"UsoCelular"}
                />
            </div>
        </div>
    );
}
