"use client";

import { useState } from "react";
import IconTStar3 from "../icons/iconStar3";
import IconArrowRight from "../icons/iconArrowRight";
import IconFatArrow from "../icons/iconFatarrowDash";
import IconTablillaEstrella from "../icons/iconTablillaEstrella";
import IconTablillaTilde from "../icons/iconTablillaTilde";
import Cookies from "js-cookie";
import { ApiSegimed } from "@/Api/ApiSegimed";

const ratingQuestions = [
  "Califique la adherencia terapéutica de su paciente",
  "Califique el autocuidado del paciente",
  "Califique el grado de recomendaciones que sigue su paciente",
  "Califique el comportamiento y la actitud de su paciente frente a usted.",
];

export default function ReviewModalApte({ onClose, id }) {
  const [ratings, setRatings] = useState(
    Array(ratingQuestions.length).fill(null)
  );
  const [hover, setHover] = useState(Array(ratingQuestions.length).fill(null));
  const [comments, setComments] = useState("");
  const myId = Cookies.get("c");

  const handleRating = (index, rating) => {
    const newRatings = [...ratings];
    newRatings[index] = rating;
    setRatings(newRatings);
  };

  const handleHover = (index, value) => {
    const newHover = [...hover];
    newHover[index] = value;
    setHover(newHover);
  };

  const SendReview = async () => {
    const payload = {
      physicianId: Number(myId),
      reviewScore: JSON.stringify(ratings), // Convert ratings array to JSON string
      comments: comments,
      patientId: Number(id), // Ensure patientId is a number
    };

    const token = Cookies.get("a");

    try {
      const response = await ApiSegimed.post(`/patient-review/${id}`, payload, {
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      });

      onClose();
    } catch (error) {
      console.error("Error sending review:", error);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white  p-4 rounded-lg shadow-lg w-[85%] max-h-screen md:w-[30%] relative font-poppins overflow-y-scroll">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <span className="flex gap-4">
            <IconFatArrow />
            <h2 className="text-xl font-bold">Califique a su paciente</h2>
          </span>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700">
            &#x2715;
          </button>
        </div>
        {ratingQuestions.map((question, qIndex) => (
          <div key={qIndex} className="mb-4">
            <div className="flex gap-4 mb-2 mt-2">
              <span>
                <IconTablillaEstrella />
              </span>
              <span className="mb-2 font-medium">{question}</span>
            </div>
            <div className="flex justify-center items-center border-b pb-2">
              {[...Array(5)].map((star, index) => (
                <label key={index} className="cursor-pointer">
                  <input
                    type="radio"
                    name={`rating-${qIndex}`}
                    value={index + 1}
                    onClick={() => handleRating(qIndex, index + 1)}
                    style={{ display: "none" }}
                  />
                  <IconTStar3
                    color={
                      index < (hover[qIndex] || ratings[qIndex])
                        ? "#FFC107"
                        : "#FFFFFF"
                    }
                    onMouseEnter={() => handleHover(qIndex, index + 1)}
                    onMouseLeave={() => handleHover(qIndex, 0)}
                    className="transition-colors duration-300 ease-in-out w-8 md:w-12"
                  />
                </label>
              ))}
            </div>
          </div>
        ))}
        <div className="mb-4">
          <div className="flex gap-4 mb-2 mt-2">
            <span>
              <IconTablillaTilde />
            </span>
            <span className="mb-2 font-medium">
              Comentarios sobre el paciente
            </span>
          </div>
          <textarea
            className="w-full p-2 border rounded-md"
            rows="4"
            placeholder="Ingrese sus comentarios sobre el paciente"
            value={comments}
            onChange={(e) => setComments(e.target.value)}></textarea>
        </div>
        <div className="flex justify-center items-center">
          <button
            onClick={SendReview}
            className="flex px-4 py-2 bg-blue-500 text-white rounded-md">
            <span>Guardar</span> <IconArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
