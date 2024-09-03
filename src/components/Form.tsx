import { useState } from "react";
import { paises } from "../data/paises";
import { IBusqueda } from "../interface";
import Swal from "sweetalert2";

interface FormProps {
  fetchClima: (busqueda: IBusqueda) => Promise<void>
}

export default function Form({ fetchClima }: FormProps) {
  const [busqueda, setBusqueda] = useState<IBusqueda>({
    ciudad: "",
    pais: "",
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(busqueda).includes("")) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ambos campos son obligatorios!",
        confirmButtonText: "Reintentar",
      });
    }
    fetchClima(busqueda);
    setBusqueda({
      ciudad: "",
      pais: "",
    })
  };

  return (
    <form
      className="space-y-5  p-10 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="ciudad" className="font-bold text-3xl text-sky-400">
          Ciudad:{" "}
        </label>
        <input
          type="text"
          name="ciudad"
          id="ciudad"
          placeholder="Ingresa una ciudad"
          value={busqueda.ciudad}
          onChange={handleChange}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="pais" className="font-bold text-3xl text-sky-400">
          País:{" "}
        </label>
        <select
          id="pais"
          name="pais"
          onChange={handleChange}
          className="border border-cyan-300 p-2 rounded-lg w-full bg-white focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
          value={busqueda.pais}
        >
          <option value="" className="text-center">
            -- Seleccione un País --
          </option>
          {paises.map((pais) => (
            <option key={pais.code} value={pais.code}>
              {pais.name}
            </option>
          ))}
        </select>
      </div>

      <input
        type="submit"
        value="Consultar Clima"
        className="middle text-center none center w-full rounded-lg bg-cyan-500 py-4 px-6 font-sans text-sm font-bold uppercase text-white shadow-md shadow-cyan-500/20 transition-all hover:shadow-lg hover:shadow-cyan-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
      />
    </form>
  );
}
