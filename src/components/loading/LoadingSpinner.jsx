export default function LoadingSpinner() {
  return (
    <div className="flex flex-col gap-1 items-center justify-center min-h-full">
      <div className="w-12 h-12 border-4 border-gray-300 rounded-full border-t-primary animate-spin"></div>
      <span>Cargando...</span>
    </div>
  );
}
