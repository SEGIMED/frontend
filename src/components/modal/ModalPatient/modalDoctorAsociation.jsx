

export default function DoctorAsociado({ name }) {
    return (
        <div className=" w-full flex flex-col items-center justify-center gap-3">
            <p className="font-normal text-xl leading-7 text-center">
                ¿Deseas enviar una solicitud para asociarte a {name}

            </p>
            <p className="font-normal text-xl leading-7 text-center">


                El médico recibirá tu solicitud y deberá aceptarla.
            </p>

        </div>
    );
}
