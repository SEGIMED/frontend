'use client'

import { useEffect } from "react";

export default function Final({ handleDisabled }) {
    useEffect(() => {
        handleDisabled();
    }, []);

    return (
        <div className="w-full flex items-center gap-3">
            <p className="font-medium text-3xl leading-10 text-center">
                ¡Muchas gracias! Ya puede comenzar a utilizar Segimed
            </p>
        </div>
    );
}
