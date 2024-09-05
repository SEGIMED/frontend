"use client";
import React, { useState, useEffect } from "react";

import InputInfoText from "@/components/ordenMedica/inputInfo";

import IconCurrentRouteNav from "@/components/icons/IconCurrentRouteNav";


export default function ModalErrores({ state, disabled }) {

    return (
        <div className="w-full flex flex-col gap-3">
            <div >
                <InputInfoText
                    icon={<IconCurrentRouteNav color={"#808080"} className="w-[1.5rem]" />}
                    title={"Mensaje de error"}
                    classNameInput={'md:w-full'}
                    defaultValue={state?.reasonForConsultation}
                    disabled={disabled}
                />
            </div>
            <div >
                <InputInfoText
                    icon={<IconCurrentRouteNav color={"#808080"} className="w-[1.5rem]" />}
                    classNameInput={'md:w-full'}
                    title={"Área del error"}
                    defaultValue={state?.reasonForConsultation}
                    disabled={disabled}
                />
            </div>
            <div >
                <InputInfoText
                    icon={<IconCurrentRouteNav color={"#808080"} className="w-[1.5rem]" />}
                    text={true}
                    title={"Mensaje del usuario"}
                    defaultValue={state?.reasonForConsultation}
                    disabled={disabled}
                />
            </div>
        </div>
    );
}
