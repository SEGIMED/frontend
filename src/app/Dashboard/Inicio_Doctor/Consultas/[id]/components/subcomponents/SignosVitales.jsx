"use client";

const SignosVitales = ({ data, onChange }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  return (
    <div className="border p-4 rounded bg-white">
      <h2 className="text-xl font-semibold mb-4">Signos Vitales</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Temperatura (°C):</label>
          <input
            type="number"
            name="temperatura"
            value={data.temperatura || ""}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
            min="0"
            step="0.1"
          />
        </div>
        <div>
          <label className="block font-medium">Presión Sistólica (mmHg):</label>
          <input
            type="number"
            name="presionSistolica"
            value={data.presionSistolica || ""}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
            min="0"
          />
        </div>
        <div>
          <label className="block font-medium">
            Presión Diastólica (mmHg):
          </label>
          <input
            type="number"
            name="presionDiastolica"
            value={data.presionDiastolica || ""}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
            min="0"
          />
        </div>
        <div>
          <label className="block font-medium">
            Frecuencia Respiratoria (rpm):
          </label>
          <input
            type="number"
            name="frecuenciaRespiratoria"
            value={data.frecuenciaRespiratoria || ""}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
            min="0"
          />
        </div>
        <div>
          <label className="block font-medium">
            Saturación de Oxígeno (%):
          </label>
          <input
            type="number"
            name="saturacionOxigeno"
            value={data.saturacionOxigeno || ""}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
            min="0"
            max="100"
          />
        </div>
        <div>
          <label className="block font-medium">
            Frecuencia Cardiaca (ppm):
          </label>
          <input
            type="number"
            name="frecuenciaCardiaca"
            value={data.frecuenciaCardiaca || ""}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
            min="0"
          />
        </div>
        <div>
          <label className="block font-medium">Estatura (cm):</label>
          <input
            type="number"
            name="estatura"
            value={data.estatura || ""}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
            min="0"
          />
        </div>
        <div>
          <label className="block font-medium">Peso (kg):</label>
          <input
            type="number"
            name="peso"
            value={data.peso || ""}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
            min="0"
            step="0.1"
          />
        </div>
        <div>
          <label className="block font-medium">IMC:</label>
          <input
            type="number"
            name="imc"
            value={data.imc || ""}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
            min="0"
            step="0.1"
          />
        </div>
      </div>
    </div>
  );
};

export default SignosVitales;
