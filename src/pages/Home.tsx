import { useState } from "react";
import { instance } from "../services/axios";

interface IMovie {
  belongs_to_collection: {
    backdrop_path: string;
    id: number;
    name: string;
    poster_path: string;
  }
  overview: string;
  title: string;
}

export function Home() {
  const [actualMovie, setActualMovie] = useState<IMovie>({} as IMovie);
  const getMoviesFromApi = async () => {
    await instance
      .get(
        "/76341?api_key=" +
          import.meta.env.VITE_API_KEY +
          "&" +
          import.meta.env.VITE_LANGUAGE
      )
      .then((response) => {
        console.log(response.data);
        setActualMovie(response.data);
      });
  };
  return (
    <main className="h-screen flex flex-col items-center gap-8 py-32">
      <div className="flex flex-col w-fit items-center gap-3">
        <div className="w-20 h-14">
          <img
            className="h-full w-full"
            src="/assets/shuffle.svg"
            alt="Icone de sortear"
          />
        </div>
        <h1 className="text-[#FFFCF9] text-4xl font-bold">
          Não sabe o que assistir?
        </h1>
      </div>
      {Object.keys(actualMovie).length !== 0 && (
        <div className="flex gap-9">
          <div className="w-48 h-64">
            <img
              className="h-full w-full"
              src={`${import.meta.env.VITE_IMG_URL}${
                actualMovie.belongs_to_collection.poster_path
              }`}
              alt={`Poster do filme ${actualMovie.title}`}
            />
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="text-xl font-semibold text-[#FFFCF9]">{actualMovie.title}</h2>
            <span className="max-w-md text-[#FFFCF9] text-base font-normal">{actualMovie.overview}</span>
          </div>
        </div>
      )}
      {/* TODO: Aqui irá o component do filme escolhido */}
      <button
        onClick={() => getMoviesFromApi()}
        className="flex gap-4 justify-center items-center bg-[#E9E6E3] p-4 rounded-md"
      >
        <div className="w-9 h-6">
          <img
            className="h-full w-full"
            src="/assets/shuffle.svg"
            alt="Icone de sortear"
          />
        </div>
        <span className="text-[#000] text-sm font-bold">Encontrar filme</span>
      </button>
      <span className="text-[#FFFCF9] text-base font-normal">
        Clique em "Encontrar filme" que traremos informações de algum filme para
        você assistir hoje.
      </span>
    </main>
  );
}
