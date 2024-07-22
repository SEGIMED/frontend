import { useState, useEffect } from "react";
import IconTStar3 from "../icons/iconStar3";
import IconArrowRight from "../icons/iconArrowRight";
import IconCurrentRouteNav from "../icons/IconCurrentRouteNav";
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
  const [ratings, setRatings] = useState(Array(ratingQuestions.length).fill(null));
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
      reviewScore: JSON.stringify(ratings),
      comments: comments,
      patientId: Number(id),
    };

    const token = Cookies.get("a");

    try {
      await ApiSegimed.post(`/patient-review/${id}`, payload, {
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
    const onClose2 = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("keydown", onClose2);
    }

    return () => {
      window.removeEventListener("keydown", onClose2);
    };
  }, [onClose]);

  const handleClickOutside = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div onClick={handleClickOutside} className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-3 rounded-lg shadow-lg w-[85%] min-h-fit max-h-[95%] md:w-[40%] relative font-poppins overflow-y-auto">
        <div className="flex justify-between items-center border-b pb-2 h-fit">
          <span className="flex gap-4">
            <IconCurrentRouteNav className={"w-4"} />
            <h2 className="text-lg font-normal leading-6">Califique a su paciente</h2>
          </span>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &#x2715;
          </button>
        </div>
        {ratingQuestions.map((question, qIndex) => (
          <div key={qIndex} className="mb-3">
            <div className="flex gap-3 mb-2 mt-2">
              <span><IconTablillaEstrella /></span>
              <span className="font-medium text-base">{question}</span>
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
                        ? "#F5E400"
                        : "white"
                    }
                    onMouseEnter={() => handleHover(qIndex, index + 1)}
                    onMouseLeave={() => handleHover(qIndex, 0)}
                    className="transition-colors duration-300 ease-in-out w-8 md:w-10"
                  />
                </label>
              ))}
            </div>
          </div>
        ))}
        <div className="mb-2">
          <div className="flex gap-4 mt-2">
            <span><IconTablillaTilde /></span>
            <span className="mb-2 font-medium">Comentarios sobre el paciente</span>
          </div>
          <textarea
            className="w-full p-2 border rounded-md"
            rows="4"
            placeholder="Ingrese sus comentarios sobre el paciente"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          ></textarea>
        </div>
        <div className="flex justify-center items-center h-[10%]">
          <button
            onClick={SendReview}
            className="py-2 px-4 items-center flex rounded-lg bg-greenPrimary gap-2 w-fit disabled:bg-gray-400"
          >
            <p className="text-white font-bold flex gap-2 items-center">Guardar <IconArrowRight /></p>
          </button>
        </div>
      </div>
    </div>
  );
}
