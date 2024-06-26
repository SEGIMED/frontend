"use client"

import { useState } from "react";
import Cookies from "js-cookie";
import { ApiSegimed } from "@/Api/ApiSegimed";

import IconTStar3 from "../icons/iconStar3";
import IconArrowRight from "../icons/iconArrowRight";
import IconFatArrow from "../icons/iconFatarrowDash";
import IconTablillaEstrella from "../icons/iconTablillaEstrella";
import IconTablillaTilde from "../icons/iconTablillaTilde";


export default function ReviewModal({ onClose,idDoc }) {
    const [rating, setRating] = useState(null);
    const [hover, setHover]=useState(null)
    const [comments, setComments]= useState(null)
    const myId=Cookies.get("c")

    const SendReview = async () => {
        const payload = {
          physicianId: Number(myId),
          reviewScore: Number(rating), // Convert ratings array to JSON string
          comments: comments,
          patientId: Number(idDoc) // Ensure patientId is a number
        };
    
        const token = Cookies.get("a");
    
        try {
          const response = await ApiSegimed.post(
            `/physician-review/${idDoc}`,
            payload,
            {
              headers: {
                'token': token,
                'Content-Type': 'application/json'
              }
            }
          );
        
          onClose();
        } catch (error) {
          console.error("Error sending review:", error);
        }
      };
  
    
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50  ">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 relative font-poppin sm:h-3/4 md:h-1/2 lg:h-1/3 xl:h-1/4 overflow-y-auto">
                <div className="flex justify-between items-center border-b pb-2 mb-4">
                    <span className="flex gap-4">
                        <IconFatArrow />
                        <h2 className="text-xl font-bold">Califique su consulta</h2>
                    </span>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        &#x2715;
                    </button>
                </div>
                <div className="flex gap-4 mb-4">
                    <span><IconTablillaEstrella /></span>
                    <span className="mb-2 font-medium">Cuantas estrellas le da a su experiencia?</span>
                </div>
                <div className="flex justify-center items-center border-b pb-2">
                    
                   {[...Array(5)].map((star, index) => (
        <label key={index} className="cursor-pointer">
          <input
            type="radio"
            name="rating"
            value={index + 1}
            onClick={() => setRating(index + 1)}
            style={{ display: 'none' }}
          />
          <IconTStar3
            width="50"
            height="50"
            color={index < (hover || rating) ? "#FFC107" : "#FFFFF"}
            onMouseEnter={() => setHover(index + 1)}
            onMouseLeave={() => setHover(0)}
            className="transition-colors duration-300 ease-in-out"
          />
        </label>
      ))}
                </div>
                <div className=" mb-4">
                    <div className="flex gap-4 mb-2 mt-2">
                    <span><IconTablillaTilde/></span>
                    <span className="mb-2 font-medium">Comentarios sobre el doctor</span>
                    </div>
                    
                    <textarea
                       
                       className="w-full p-2 border rounded-md"
                       rows="4"
                       placeholder="Ingrese sus comentarios sobre el paciente"
                       value={comments}
                       onChange={(e) => setComments(e.target.value)}
                     
                    ></textarea>
                </div>
                <div className="flex justify-center items-center">
                    <button onClick={SendReview} className="flex px-4 py-2 bg-blue-500 text-white rounded-md">
                        <span>Guardar</span> <IconArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

