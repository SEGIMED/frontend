import ButtonNext from "@/components/consulta/button";

export default function ViveSolo({ handleDisabled }) {
    return (
        <div className=" w-full flex flex-col items-center gap-3">
            <p className="font-medium text-3xl leading-10 text-center">
                ¿Vive solo?
            </p>
            <div>
                <ButtonNext
                    handleDisabled={handleDisabled}
                    options={["Si", "No"]}
                    name={"ViveSolo"}
                />
            </div>
        </div>
    );
}
