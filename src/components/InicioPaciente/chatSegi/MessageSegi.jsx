import Segi from "@/components/InicioPaciente/chatSegi/segi.png";
import Image from "next/image";
import DefaultPhoto from "@/components/images/defaultPhoto.png";
import Markdown from "react-markdown";
export const MessageSegi = ({ key, message, sender, name, avatar }) => {
  return (
    <div
      key={key}
      className={`p-2 animate-fade-in font-poppins flex gap-1 flex-col ${
        sender != "bot" ? "justify-end items-end" : "justify-start items-start"
      }`}>
      <div
        className={`flex gap-2 items-center justify-center text-xs ${
          sender != "bot" ? "self-end flex-row-reverse" : "self-start "
        }`}>
        <Image
          src={sender != "bot" ? avatar || DefaultPhoto : Segi}
          alt="SegiBot"
          className="border border-bluePrimary rounded-full"
          width={36}
          height={36}
        />
        <span className="text-bluePrimary text-lg font-medium">
          {sender != "bot" ? name : "Segi"}
        </span>
      </div>
      <div
        className={`md:px-5 px-2 py-1 relative md:py-2 w-fit max-w-[85%] rounded-xl shadow-sm ${
          sender != "bot"
            ? "rounded-tr-none bg-[#487FFA] right-5 md:right-10"
            : "rounded-tl-none bg-white border border-bluePrimary left-5 md:left-10"
        }`}>
        <Markdown
          className={`rounded-lg md:text-base font-medium ${
            sender != "bot" ? "text-white" : "text-bluePrimary"
          }`}>
          {message}
        </Markdown>
      </div>
    </div>
  );
};
