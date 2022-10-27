import { useContext, useState } from "react";
import { FiltersComponent } from "../components/FiltersComponent";
import { FiltersContext } from "../contexts/FiltersContext";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { instance } from "../services/axios";

import { IMovie } from "../types/Movie";
import { IMovieListItem, IMovieList } from "../types/MovieList";

export function Home() {
  const { width } = useWindowDimensions();
  const [actualMovie, setActualMovie] = useState<IMovie>({} as IMovie);

  const { sortBy, withGenres, voteCountGte, includeAdult } =
    useContext(FiltersContext);

  const convertStringDateTimeToDateTime = (stringDateTime: string) => {
    const dateTime = new Date(stringDateTime);
    return dateTime.getFullYear();
  };

  const getMoviesFromApi = async () => {
    const randomNumber = Math.floor(Math.random() * 499) + 1;
    var discoverResponseMovies: IMovieListItem[] = [];
    await instance
      .get<IMovieList>(
        `https://api.themoviedb.org/3/discover/movie?api_key=e8aefbb791daa16e219a969379ba067e&language=pt-BR&page=${randomNumber}${
          sortBy !== "" ? `&sort_by=${sortBy}` : ""
        }&include_adult=${includeAdult}&vote_count.gte=${voteCountGte}${
          withGenres !== undefined ? `&with_genres=${withGenres}` : ""
        }`
      )
      .then((response) => (discoverResponseMovies = response.data.results));
    const randomMovie =
      discoverResponseMovies[
        Math.floor(Math.random() * discoverResponseMovies.length)
      ];
    await instance
      .get(
        `/${randomMovie.id}?api_key=` +
          import.meta.env.VITE_API_KEY +
          "&" +
          import.meta.env.VITE_LANGUAGE
      )
      .then((response) => {
        setActualMovie(response.data);
        if (width < 768) window.scrollTo(0, 180);
      });
  };
  return (
    <main className="min-h-screen w-full flex flex-col justify-center gap-8">
      <div className="flex flex-col w-full items-center gap-3">
        <div className="w-20 h-14">
          <img
            className="h-full w-full"
            src="/assets/shuffle.svg"
            alt="Icone de sortear"
          />
        </div>
        <h1 className="text-center text-[#FFFCF9] text-4xl font-bold md:text-start">
          Não sabe o que assistir?
        </h1>
      </div>
      {Object.keys(actualMovie).length !== 0 && (
        <div className="flex flex-col gap-9 w-full md:w-[42.25rem] md:mx-auto md:flex-row md:h-96 md:overflow-hidden">
          <div className="relative w-full h-[calc(100vw+(100vw*0.3))] mx-auto sm:w-64 sm:h-96">
            <img
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = "/assets/image-not-found.png";
              }}
              className="h-full w-full"
              src={`${import.meta.env.VITE_IMG_URL}${actualMovie.poster_path}`}
              alt={`Poster do filme ${actualMovie.title}`}
            />
            <span
              className={`absolute top-0 right-0 text-base p-2 bg-purple-800 text-[#fff] rounded-bl-md`}
            >
              Média: {actualMovie.vote_average.toFixed(2)}
            </span>
          </div>
          <div className="flex flex-col gap-5 max-w-sm mx-auto md:mx-0">
            <h2 className="text-xl text-center font-semibold text-[#FFFCF9] md:text-start">
              {actualMovie.title} -{" "}
              <span className="underline underline-offset-4">
                {convertStringDateTimeToDateTime(actualMovie.release_date)}
              </span>
            </h2>
            <span className="text-center px-4 text-[#FFFCF9] text-base font-normal overflow-y-auto md:text-start md:px-0">
              {actualMovie.overview !== ""
                ? actualMovie.overview
                : "Esse filme não tem uma descrição pré definida!"}
            </span>
          </div>
        </div>
      )}
      <div className="flex gap-4 mx-auto">
        <button
          onClick={() => getMoviesFromApi()}
          className="w-fit flex gap-4 justify-center items-center bg-[#E9E6E3] p-4 rounded-md"
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
        <FiltersComponent />
      </div>
      <span className="w-fit text-center text-[#FFFCF9] text-base font-normal mx-auto md:text-start">
        Clique em "Encontrar filme" que traremos informações de algum filme para
        você assistir hoje.
      </span>
    </main>
  );
}
