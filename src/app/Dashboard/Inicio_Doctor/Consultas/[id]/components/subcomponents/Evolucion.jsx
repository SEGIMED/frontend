"use client";

const Evolucion = ({ data, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="border p-4 rounded bg-white">
      <h2 className="text-xl font-semibold mb-4">Evolución</h2>
      <textarea
        value={data}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        rows="4"
        placeholder="Descripción de la evolución..."></textarea>
    </div>
  );
};

export default Evolucion;
