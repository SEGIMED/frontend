import IconCircle from "@/components/icons/IconCircle";

export function InfoItem({ label, value }) {
  return (
    <div className="lg:p-2 p-1 flex flex-row items-center gap-2">
      <IconCircle className={"w-3 lg:block hidden"} />
      <span className="text-sm lg:text-lg font-medium">{label}</span>
      <span className="text-sm lg:text-lg text-gray-600">{value}</span>
    </div>
  );
}
