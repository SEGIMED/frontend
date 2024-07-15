import ButtonNext from "@/components/consulta/button";
import { useAppDispatch } from "@/redux/hooks";
import { setSelectedOption } from "@/redux/slices/doctor/formConsulta";

export default function Nacimiento({ handleDisabled }) {
    const dispatch = useAppDispatch();

    const handleSelect = (event) => {
        const date = event.target.value;
        dispatch(setSelectedOption({ name: 'date', option: date }));
        handleDisabled()
    }

    return (
        <div className="w-full flex flex-col items-center gap-3">
            <p className="font-medium text-3xl leading-10 text-center">
                Ingrese su fecha de nacimiento
            </p>
            <div className="flex flex-row md:flex-col w-full justify-between gap-2">
                <input
                    onChange={handleSelect}
                    id="date"
                    type="date"
                    placeholder=""
                    className="w-full p-2 bg-[#FBFBFB] border border-[#DCDBDB] rounded"
                />
                {/* {errors.date && (
                    <span className="text-red-500 text-sm font-medium">
                        {errors.date.message}
                    </span>
                )} */}
            </div>
        </div>
    );
}
