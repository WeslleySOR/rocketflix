import { useState } from "react";
import { instance } from "../services/axios";

interface IMovieList {
  page: number;
  results: IMovieListItem[];
  total_pages: number;
  total_results: number;
}

interface IMovieListItem {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface IMovie {
  poster_path: string;
  overview: string;
  title: string;
}

export function Home() {
  const [actualMovie, setActualMovie] = useState<IMovie>({} as IMovie);

  const getMoviesFromApi = async () => {
    const randomNumber = Math.floor(Math.random()*499) + 1;
    var discoverResponseMovies: IMovieListItem[] = [];
    await instance
    .get<IMovieList>(`https://api.themoviedb.org/3/discover/movie?api_key=e8aefbb791daa16e219a969379ba067e&language=pt-BR&page=${randomNumber}`)
    .then(response => discoverResponseMovies = response.data.results);
    const randomMovie = discoverResponseMovies[Math.floor(Math.random()*discoverResponseMovies.length)];
    await instance
      .get(
        `/${randomMovie.id}?api_key=` +
          import.meta.env.VITE_API_KEY +
          "&" +
          import.meta.env.VITE_LANGUAGE
      )
      .then((response) => {
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
        <div className="flex gap-9 min-w-max max-w-lg max-h-64 overflow-hidden">
          <div className="w-48 h-64">
            <img
              className="h-full w-full"
              src={`${import.meta.env.VITE_IMG_URL}${
                actualMovie.poster_path
              }`}
              alt={`Poster do filme ${actualMovie.title}`}
            />
          </div>
          <div className="flex flex-col gap-5 max-w-xs">
            <h2 className="text-xl font-semibold text-[#FFFCF9]">{actualMovie.title}</h2>
            <span className="text-[#FFFCF9] text-base font-normal overflow-y-auto">{actualMovie.overview !== "" ? actualMovie.overview : "Esse filme não tem uma descrição pré definida!"}</span>
          </div>
        </div>
      )}
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
