

export default function ModalInputVitalSings({ text, unit, handleChange, input, name, state, name2 }) {



    return (
        <div className=" w-full flex items-center gap-10 flex-col">
            <p className="font-medium text-3xl leading-10 text-center text-bluePrimary">
                {text}
            </p>
            <div className={`flex ${input ? '' : 'gap-2'} items-center justify-center`}>
                {input ?
                    <div className="flex justify-center gap-5">
                        <input defaultValue={state.find(vs => vs.measureType === name)?.measure || ''} className="px-2 border rounded-lg h-20 w-2/5 border-[#D7D7D7] text-5xl outline-none text-[#686868]" onChange={(e) => handleChange(name, e.target.value)} />
                        <input defaultValue={state.find(vs => vs.measureType === name2)?.measure || ''} className="px-2 border rounded-lg h-20 w-2/5 border-[#D7D7D7] text-5xl outline-none text-[#686868]" onChange={(e) => handleChange(name2, e.target.value)} />
                    </div> :
                    <input defaultValue={state.find(vs => vs.measureType === name)?.measure || ''} className="px-2 border rounded-lg h-20 w-1/3 border-[#D7D7D7] text-5xl outline-none text-[#686868]" onChange={(e) => handleChange(name, e.target.value)} />
                }
                <p className="text-[#686868] font-normal text-2xl">{unit}</p>
            </div>
        </div>
    );
}
