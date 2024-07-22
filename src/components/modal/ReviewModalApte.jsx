"use client";

import { useState, useEffect } from "react";
import IconTStar3 from "../icons/iconStar3";
import IconArrowRight from "../icons/iconArrowRight";
import IconFatArrow from "../icons/iconFatarrowDash";
import IconTablillaEstrella from "../icons/iconTablillaEstrella";
import IconTablillaTilde from "../icons/iconTablillaTilde";
import Cookies from "js-cookie";
import { ApiSegimed } from "@/Api/ApiSegimed";
import Elboton from "../Buttons/Elboton";

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
    console.log("ratings", ratings);
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

  useEffect(() => {
    function onClose2(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (typeof window !== "undefined")
      window.addEventListener("keydown", onClose2);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", onClose2);
    };
  }, [onClose]);

  function handleClickOutside(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }
  return (
    <div
      onClick={handleClickOutside}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white  p-4 rounded-lg shadow-lg w-[85%] max-h-screen md:w-[30%] relative font-poppins overflow-y-auto">
        <div className="flex justify-between items-center border-b pb-2 mb-2 h-[10%]">
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
          <div key={qIndex} className="mb-3">
            <div className="flex gap-4 mb-2 mt-2">
              <span>
                <IconTablillaEstrella />
              </span>
              <span className="mb-2 font-medium">{question}</span>
            </div>
            <div className="flex justify-center items-center border-b pb-1">
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
        <div className="mb-2 ">
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
        <div className="flex justify-center items-center h-[20%]">
          <Elboton
            className="bg-[#70C247]"
            onPress={SendReview}
            nombre="Guardar"
            icon2={<IconArrowRight />}
          />
        </div>
      </div>
    </div>
  );
}
