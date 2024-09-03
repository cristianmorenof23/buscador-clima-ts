import { formatTemperatura } from "../helpers";
import { Clima } from "../hooks/useClima";

interface ClimaProps {
  clima: Clima;
}

const ClimaDetalles = ({ clima }: ClimaProps) => {
  return (
    <div
      className="w-full max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl py-5 border-l bg-white mt-5 rounded shadow text-center mx-auto"
    >
      <h2 className="text-xl md:text-2xl font-bold">
        Clima de :{" "}
        <span className="font-bold text-2xl md:text-3xl text-sky-400">
          {clima.name}
        </span>
      </h2>
      <div className="font-bold space-y-2 text-black-900 text-lg md:text-2xl">
        <p className="text-6xl">{formatTemperatura(clima.main.temp)}&deg;C</p>
        <p>
          Min: <span>{formatTemperatura(clima.main.temp_min)}&deg;C</span>
        </p>
        <p>
          Max: <span>{formatTemperatura(clima.main.temp_max)}&deg;C</span>
        </p>
        <p>
          Humedad: <span>{clima.main.humidity}%</span>
        </p>
      </div>
    </div>
  );
};

export default ClimaDetalles;
