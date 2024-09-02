

export default function ModalVitalSings({ text, subtitle }) {
    return (
        <div className=" w-full flex items-center gap-3 flex-col">
            <p className="font-medium text-3xl leading-10 text-center text-bluePrimary">
                {text}
            </p>
            <p className="font-medium text-xl leading-10 text-center text-[#686868]">{subtitle}</p>

        </div>
    );
}
