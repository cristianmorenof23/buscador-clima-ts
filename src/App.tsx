import ClimaDetalles from "./components/ClimaDetalles";
import Form from "./components/Form";
import Spinner from "./components/Spinner";
import useClima from "./hooks/useClima";

export default function App() {
  const { fetchClima, clima, datoClima, loading } = useClima();

  return (
    <>
      <h1 className="text-white text-4xl font-black text-center mt-20">
        Buscador Clima
      </h1>

      <div
        className="w-[95%] max-w-[100rem] mx-auto 
            flex flex-col items-center gap-10
            md:grid md:grid-cols-2 md:gap-16 md:mt-20"
      >
        <Form fetchClima={fetchClima} />

        {loading && <Spinner/>}
        {datoClima && <ClimaDetalles clima={clima} />}
      </div>
    </>
  );
}
