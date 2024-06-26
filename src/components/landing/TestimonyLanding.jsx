"use client"
import React from "react";
import ImTestimony1 from "../icons/ImTestimony1";
import ImTestimony2 from "../icons/ImTestimony2";
import ImTestimony3 from "../icons/ImTestimony3";
import ImTestimony4 from "../icons/ImTestimony4";

const TestimonyLanding = () => {

    return (
        <div className="flex flex-col gap-10 py-20 px-10">
            <h1 className="text-center text-[#234C91] text-4xl font-['Libre_Baskerville'] font-semibold">
                VIDEOS TESTIMONIOS
            </h1>
            <div className="flex items center justify-center gap-5">
                
                <ImTestimony1/>
                <ImTestimony2/>
                <ImTestimony3/>
                <ImTestimony4/>

                {/* <button onClick={prevPage}>
                    <IconArrowPrev className="w-10"/>
                </button>

                <div className="overflow-hidden">
                    <div className="grid transition duration-500 grid-cols-3 gap-10 flex-row p-10"
                        >
                        {testimonyUsers
                            .slice(startIndex, endIndex)
                            .map((user, i) => (
                                <TestimonyCardUsers 
                                    key={i} 
                                    image={user.image} 
                                    name={user.name} 
                                    value={user.value} 
                                    title={user.title} 
                                    text={user.text} 
                                />
                         ))}
                    </div>
                </div>

                <button onClick={nextPage}>
                    <IconArrowNext className="w-10"/>
                </button> */}

            </div>
            
        </div>
    );
};

export default TestimonyLanding;