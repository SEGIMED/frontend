"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { ApiSegimed } from "@/Api/ApiSegimed";

import IconTStar3 from "../icons/iconStar3";
import IconArrowRight from "../icons/iconArrowRight";
import IconFatArrow from "../icons/iconFatarrowDash";
import IconTablillaEstrella from "../icons/iconTablillaEstrella";
import IconTablillaTilde from "../icons/iconTablillaTilde";
import Elboton from "../Buttons/Elboton";

export default function ReviewModal({ onClose, idDoc }) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [comments, setComments] = useState("");
  const myId = Cookies.get("c");

  const SendReview = async () => {
    if (rating === null) {
      Swal.fire({
        title: "Review?",
        text: "Es necesario ingresar una calificacion y un comentario",
        icon: "question",
      });
      return;
    }

    if (!comments) {
      Swal.fire({
        title: "Review?",
        text: "Es necesario ingresar una calificacion y un comentario",
        icon: "question",
      });
      return;
    }

    const payload = {
      physicianId: Number(idDoc),
      reviewsScore: Number(rating),
      comments: comments,
      // patientId: Number(myId),
    };

    const token = Cookies.get("a");

    try {
      const response = await ApiSegimed.post(
        `/physician-review/${idDoc}`,
        payload,
        { headers: { token: token } }
      );

      if (response.status === 200 || response.status === 201) {
        onClose();
        Swal.fire({
          title: "Review enviada con exito!",
          text: "",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error sending review:", error);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleClickOutside = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleClickOutside}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-[85%] max-h-screen md:w-[30%] relative font-poppins overflow-y-auto">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <span className="flex gap-4">
            <IconFatArrow />
            <h2 className="text-xl font-bold">Califique su consulta</h2>
          </span>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700">
            &#x2715;
          </button>
        </div>
        <div className="flex gap-4 mb-2">
          <span>
            <IconTablillaEstrella />
          </span>
          <span className="mb-2 font-medium">
            Cuantas estrellas le da a su experiencia?
          </span>
        </div>
        <div className="flex justify-center items-center border-b pb-2">
          {[...Array(5)].map((star, index) => (
            <label key={index} className="cursor-pointer">
              <input
                type="radio"
                name="rating"
                value={index + 1}
                onClick={() => setRating(index + 1)}
                style={{ display: "none" }}
              />
              <IconTStar3
                width="50"
                height="50"
                color={index < (hover || rating) ? "#FFC107" : "#FFFFFF"}
                onMouseEnter={() => setHover(index + 1)}
                onMouseLeave={() => setHover(0)}
                className="transition-colors duration-300 ease-in-out w-10 md:w-12"
              />
            </label>
          ))}
        </div>
        <div className="mb-4">
          <div className="flex gap-4 mb-2 mt-2">
            <span>
              <IconTablillaTilde />
            </span>
            <span className="mb-2 font-medium">
              Comentarios sobre el doctor
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
