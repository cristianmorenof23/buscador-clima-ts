import axios from "axios";
import { z } from "zod";
import { IBusqueda } from "../interface";
import { useMemo, useState } from "react";
import Swal from "sweetalert2";

// Zod
const ClimaSchema = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
    humidity: z.number(),
  }),
});

export type Clima = z.infer<typeof ClimaSchema>;

export default function useClima() {
  const [clima, setClima] = useState<Clima>({
    name: "",
    main: {
      temp: 0,
      temp_max: 0,
      temp_min: 0,
      humidity: 0,
    },
  });

  // spinner
  const [loading, setLoading] = useState(false);

  const fetchClima = async (busqueda: IBusqueda) => {
    const appId = import.meta.env.VITE_API_KEY;
    setLoading(true);
    setClima({
      name: "",
      main: {
        temp: 0,
        temp_max: 0,
        temp_min: 0,
        humidity: 0,
      },
    });
    try {
      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${busqueda.ciudad},${busqueda.pais}&appid=${appId}`;

      const { data } = await axios.get(geoUrl);

      // comprobar si existe
      if(!data[0]){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se encontro esa ciudad!",
          confirmButtonText: "Reintentar",
        });
        setLoading(false)
        return
      }
      const lat = data[0].lat;
      const lon = data[0].lon;

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;

      // // Castear la interface
      // const {data: weatherResult} = await axios<Clima>(weatherUrl)
      // console.log(weatherResult.name);

      const { data: weatherResultado } = await axios(weatherUrl);
      console.log(weatherResultado);

      // zod
      const { data: wheaterResult } = await axios.get(weatherUrl);
      console.log(data);
      const result = ClimaSchema.safeParse(wheaterResult);
      if (result.success) {
        setClima(result.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const datoClima = useMemo(() => clima.name, [clima]);

  return {
    clima,
    loading,
    fetchClima,
    datoClima,
  };
}
