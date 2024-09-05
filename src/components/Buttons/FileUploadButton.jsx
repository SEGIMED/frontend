import { useRef } from "react";
import Elboton from "./Elboton";
import IconUpload from "../icons/IconUpload";

export default function FileUploadButton({
  onFileSelect,
  accept = ".doc,.docx,.xls,.xlsx,.pdf,image/*",
}) {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0 && onFileSelect) {
      onFileSelect(files);
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        accept={accept}
      />
      <Elboton
        onPress={handleButtonClick}
        nombre="Adjuntar archivo"
        icon={<IconUpload color="#808080" />}
        className="bg-white text-[#808080] border border-[#D7D7D7] font-Poppins font-semibold"
      />
    </>
  );
}
