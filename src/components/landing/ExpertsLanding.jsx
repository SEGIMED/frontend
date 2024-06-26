'use client';

import React, { useState } from "react";
import IconArrowNext from "../icons/IconArrowNext";
import IconArrowPrev from "../icons/IconArrowPrev";
import CardExperts from "./experts/CardExperts";

const ExpertsLanding = () => {
    const experts = [
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEHecKOxN0USO6snOV7LdlpeMQ66F4WJv3feMQFCG94g&s",
            name: "Andrea",
            value: 5,
            title: "Esta es mi experiencia",
            text: "Desde que me uní a este servicio de atención médica, la tranquilidad me acompaña en cada viaje. No importa si estoy en una conferencia en Asia o de vacaciones en Europa, sé que tengo un equipo de profesionales listos para asistirme. ¡Es como llevar un hospital de primer nivel en mi bolsillo!"
        },
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEHecKOxN0USO6snOV7LdlpeMQ66F4WJv3feMQFCG94g&s",
            name: "Carlos",
            value: 4,
            title: "Esta es mi experiencia",
            text: "Desde que me uní a este servicio de atención médica, la tranquilidad me acompaña en cada viaje. No importa si estoy en una conferencia en Asia o de vacaciones en Europa, sé que tengo un equipo de profesionales listos para asistirme. ¡Es como llevar un hospital de primer nivel en mi bolsillo!"
        },
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEHecKOxN0USO6snOV7LdlpeMQ66F4WJv3feMQFCG94g&s",
            name: "Sebastian",
            value: 3,
            title: "Esta es mi experiencia",
            text: "Desde que me uní a este servicio de atención médica, la tranquilidad me acompaña en cada viaje. No importa si estoy en una conferencia en Asia o de vacaciones en Europa, sé que tengo un equipo de profesionales listos para asistirme. ¡Es como llevar un hospital de primer nivel en mi bolsillo!"
        },
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEHecKOxN0USO6snOV7LdlpeMQ66F4WJv3feMQFCG94g&s",
            name: "Jose",
            value: 1,
            title: "Esta es mi experiencia",
            text: "Desde que me uní a este servicio de atención médica, la tranquilidad me acompaña en cada viaje. No importa si estoy en una conferencia en Asia o de vacaciones en Europa, sé que tengo un equipo de profesionales listos para asistirme. ¡Es como llevar un hospital de primer nivel en mi bolsillo!"
        },
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEHecKOxN0USO6snOV7LdlpeMQ66F4WJv3feMQFCG94g&s",
            name: "Camilo",
            value: 2,
            title: "Esta es mi experiencia",
            text: "Desde que me uní a este servicio de atención médica, la tranquilidad me acompaña en cada viaje. No importa si estoy en una conferencia en Asia o de vacaciones en Europa, sé que tengo un equipo de profesionales listos para asistirme. ¡Es como llevar un hospital de primer nivel en mi bolsillo!"
        },
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEHecKOxN0USO6snOV7LdlpeMQ66F4WJv3feMQFCG94g&s",
            name: "Andres",
            value: 5,
            title: "Esta es mi experiencia",
            text: "Desde que me uní a este servicio de atención médica, la tranquilidad me acompaña en cada viaje. No importa si estoy en una conferencia en Asia o de vacaciones en Europa, sé que tengo un equipo de profesionales listos para asistirme. ¡Es como llevar un hospital de primer nivel en mi bolsillo!"
        },
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEHecKOxN0USO6snOV7LdlpeMQ66F4WJv3feMQFCG94g&s",
            name: "Fabio",
            value: 5,
            title: "Esta es mi experiencia",
            text: "Desde que me uní a este servicio de atención médica, la tranquilidad me acompaña en cada viaje. No importa si estoy en una conferencia en Asia o de vacaciones en Europa, sé que tengo un equipo de profesionales listos para asistirme. ¡Es como llevar un hospital de primer nivel en mi bolsillo!"
        },
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEHecKOxN0USO6snOV7LdlpeMQ66F4WJv3feMQFCG94g&s",
            name: "Karen",
            value: 4,
            title: "Esta es mi experiencia",
            text: "Desde que me uní a este servicio de atención médica, la tranquilidad me acompaña en cada viaje. No importa si estoy en una conferencia en Asia o de vacaciones en Europa, sé que tengo un equipo de profesionales listos para asistirme. ¡Es como llevar un hospital de primer nivel en mi bolsillo!"
        },
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEHecKOxN0USO6snOV7LdlpeMQ66F4WJv3feMQFCG94g&s",
            name: "Sofia",
            value: 3,
            title: "Esta es mi experiencia",
            text: "Desde que me uní a este servicio de atención médica, la tranquilidad me acompaña en cada viaje. No importa si estoy en una conferencia en Asia o de vacaciones en Europa, sé que tengo un equipo de profesionales listos para asistirme. ¡Es como llevar un hospital de primer nivel en mi bolsillo!"
        },
    ];

    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 4;

    const nextPage = () => {
        if (startIndex + 1 < experts.length) {
            setStartIndex(startIndex + 1);
        }
    };

    const prevPage = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    };

    return (
        <div className="flex flex-col gap-5 bg-[#F8F8F8] py-20 px-10">
            <div className="text-[#234C91] flex flex-col items-center justify-center gap-5">
                <h1 className="text-center text-4xl font-['Libre_Baskerville'] font-semibold">
                    NUESTROS EXPERTOS A TU ALCANCE
                </h1>
                <p className="w-7/12 text-center">
                    Contamos con una amplia variedad de excelentes profesionales que trabajan con la mejor disposición para atenderte, una cálida atención humana y un trato personalizado, los cuales a su vez trabajan en los más grandes y reconocidos centros médicos, avalados por diversas sociedades científicas.
                </p>
            </div>

            <div className="flex justify-between items-center">
                <button onClick={prevPage} disabled={startIndex === 0}>
                    <IconArrowPrev className="w-10 mr-5" />
                </button>

                <div className="overflow-hidden w-full">
                    <div 
                        className="flex transition-transform duration-500 pt-20" 
                        style={{ transform: `translateX(-${startIndex * (100 / itemsPerPage)}%)` }}>
                            {experts.map((user, i) => (
                                <div key={i} className="w-1/4 flex-shrink-0 px-2">
                                    <CardExperts
                                        image={user.image}
                                        name={user.name}
                                        value={user.value}
                                        title={user.title}
                                        text={user.text}
                                    />
                                </div>
                             ))}
                    </div>
                </div>

                <button onClick={nextPage} disabled={startIndex + itemsPerPage >= experts.length}>
                    <IconArrowNext className="w-10" />
                </button>
            </div>
        </div>
    );
};

export default ExpertsLanding;