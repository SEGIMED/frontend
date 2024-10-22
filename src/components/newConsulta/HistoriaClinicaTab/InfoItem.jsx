import IconCircle from "@/components/icons/IconCircle";

export function InfoItem({ label, value }) {
  return (
    <div
      className={`md:p-2 p-1 flex flex-row items-center gap-2 ${
        label == "Nombre completo:" && "border-t border-gray-300 w-full"
      }`}>
      <IconCircle className={"w-3 md:block hidden"} />
      <span className="text-sm md:text-lg font-medium">{label}</span>
      <span className="text-sm md:text-lg text-gray-600">
        {value || "Sin información"}
      </span>
    </div>
  );
}
