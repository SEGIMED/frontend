"use client";
import Image from "next/image";
import Segi from "@/components/InicioPaciente/chatSegi/segi.png";
import { useRef, useState } from "react";
import { ChatSegi } from "./ChatSegi";
import Draggable from "react-draggable";

export const SegiBot = () => {
  const [showChat, setShowChat] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const positionRef = useRef({ x: 0, y: 0 });

  const toggleChat = () => {
    if (!isDragging) {
      setShowChat(!showChat);
    }
  };

  const handleStart = (e, data) => {
    setIsDragging(false);
    positionRef.current = { x: data.x, y: data.y };
  };

  const handleDrag = (e, data) => {
    const deltaX = Math.abs(data.x - positionRef.current.x);
    const deltaY = Math.abs(data.y - positionRef.current.y);
    if (deltaX > 5 || deltaY > 5) {
      setIsDragging(true);
    }
  };
  const handleStop = (e, data) => {
    setPosition({ x: data.x, y: data.y });
  };

  return (
    <>
      {showChat ? (
        <ChatSegi toggleChat={toggleChat} />
      ) : (
        <Draggable
          bounds="parent"
          position={position}
          onStart={handleStart}
          onStop={handleStop}
          onDrag={handleDrag}>
          <div
            onClick={toggleChat}
            //Quitar margin y padding cuando se use el segi
            className="fixed z-30 h-[5rem] flex items-center justify-center w-[5rem] md:h-auto md:w-[7%] md:p-2 bottom-[4%] right-[2%] rounded-full bg-[#487FFA] cursor-pointer">
            {/* <Image src={Segi} alt="SegiBot" /> */}
            <Image
              src={Segi}
              alt="SegiBot"
              onDragStart={(e) => e.preventDefault()}
            />
          </div>
        </Draggable>
      )}
    </>
  );
};
