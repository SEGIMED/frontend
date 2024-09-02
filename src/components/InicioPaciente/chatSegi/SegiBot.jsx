"use client";
import Image from "next/image";
import Segi from "@/components/InicioPaciente/chatSegi/segi.png";
import { useRef, useState } from "react";
import { ChatSegi } from "./ChatSegi";
import Draggable from "react-draggable";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toogleChat } from "@/redux/slices/chat/chatBot";

export const SegiBot = () => {
  // const [showChat, setShowChat] = useState(false);
  const showChat = useAppSelector((state) => state.chatBot.showChat);
  const dispatch = useAppDispatch();
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const positionRef = useRef({ x: 0, y: 0 });

  const toggleChatDrag = () => {
    if (!isDragging) {
      dispatch(toogleChat(!showChat));
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
    if (position.x - data.x < 2 || position.y - data.y < 2) {
      toggleChatDrag();
    }
    setPosition({ x: data.x, y: data.y });
  };

  return (
    <>
      {showChat ? (
        <ChatSegi toggleChat={toggleChatDrag} />
      ) : (
        <Draggable
          bounds="parent"
          position={position}
          onStart={handleStart}
          onStop={handleStop}
          onDrag={handleDrag}>
          <div
            onClick={toggleChatDrag}
            //Quitar margin y padding cuando se use el segi
            className="fixed z-50 h-[5rem] flex items-center justify-center w-[5rem] md:h-auto md:w-[7%] p-2 bottom-[4%] right-[2%] rounded-full bg-[#487FFA] cursor-pointer shadow-[0_4px_26px_7px_rgba(0,0,0,0.25)]">
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
