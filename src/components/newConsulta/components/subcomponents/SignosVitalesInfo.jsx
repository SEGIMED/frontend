"use client";

import IconDown from "@/components/icons/IconDown";

const vitalSigns = [
  { label: "Estatura", unit: "cm", key: "height" },
  { label: "Peso", unit: "kg", key: "weight" },
  {
    label: "Índice de Masa Corporal",
    unit: "kg/m²",
    key: "bmi",
    readOnly: true,
  },
  { label: "Temperatura", unit: "°C", key: "temperature" },
  { label: "Frecuencia cardíaca", unit: "bpm", key: "heartRate" },
  { label: "P.A. Sistólica", unit: "mmHg", key: "systolicBP" },
  { label: "P.A. Diastólica", unit: "mmHg", key: "diastolicBP" },
  { label: "Frecuencia respiratoria", unit: "r/m", key: "respiratoryRate" },
  { label: "Saturación de Oxígeno", unit: "%", key: "oxygenSaturation" },
];

export default function SignosVitalesInfo({
  signosVitales,
  onSignosVitalesChange,
}) {
  const handleInputChange = (key, value) => {
    onSignosVitalesChange(key, value);
  };

  return (
    <div className="w-full p-6 ">
      <div className="space-y-2">
        {vitalSigns.map(({ label, unit, key, readOnly }) => (
          <div key={key} className="flex items-center justify-between">
            <label className="w-1/5 text-sm font-medium text-gray-600">
              {label}
            </label>
            <div className="flex w-1/2 items-center">
              <span className="text-sm w-1/6 text-gray-500">{unit}</span>
              <input
                type="number"
                className={`flex-1 p-2 border rounded ${
                  key === "bmi" ? "bg-purple-100" : ""
                }`}
                value={signosVitales[key] || ""}
                onChange={(e) => handleInputChange(key, e.target.value)}
                readOnly={readOnly}
                step="any"
              />
            </div>
          </div>
        ))}

        <div className="flex items-center space-x-2">
          <label className="w-48 text-sm font-medium text-gray-600">
            Clase funcional
          </label>
          <div className="relative flex-1">
            <select
              className="w-full p-2 border rounded appearance-none pr-8 bg-white"
              value={signosVitales.classFunctional || ""}
              onChange={(e) =>
                handleInputChange("classFunctional", e.target.value)
              }>
              <option value="">Seleccione clase funcional</option>
              {/* Agrega aquí las opciones */}
              <option value="I">Clase I</option>
              <option value="II">Clase II</option>
              <option value="III">Clase III</option>
              <option value="IV">Clase IV</option>
              <option value="V">Clase V</option>
            </select>
            <IconDown
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">
            Glucemia: ¿Tuvo valores fuera del rango normal en el último tiempo?
            (+ 140 mg/dl y - 80 mg/dl)
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={signosVitales.glucoseAbnormal}
              onChange={(e) =>
                handleInputChange("glucoseAbnormal", e.target.checked)
              }
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-600">
              {signosVitales.glucoseAbnormal ? "Sí" : "No"}
            </span>
          </label>
        </div>

        {signosVitales.glucoseAbnormal && (
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-600">
              Escriba los últimos 4 valores más anormales que tuvo.
            </label>
            <div className="flex space-x-2">
              {signosVitales.abnormalGlucoseValues.map((value, index) => (
                <input
                  key={index}
                  type="number"
                  className="flex-1 p-2 border rounded"
                  value={value}
                  onChange={(e) => {
                    const newValues = [...signosVitales.abnormalGlucoseValues];
                    newValues[index] = e.target.value;
                    handleInputChange("abnormalGlucoseValues", newValues);
                  }}
                  placeholder="100 mg/dl"
                  min="0"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
