import { useContext, useEffect, useState } from "react";
import { FiltersComponent } from "../components/FiltersComponent";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { FiltersContext } from "../contexts/FiltersContext";
import { MovieContext } from "../contexts/MovieContext";
import useWindowDimensions from "../hooks/useWindowDimensions";

export function Home() {
  const { width } = useWindowDimensions();
  const { movie, updateMovie, loadingImage, handleLoadingImage } =
    useContext(MovieContext);
  const { sortBy, withGenres, voteCountGte, includeAdult } =
    useContext(FiltersContext);

  const convertStringDateTimeToDateTime = (stringDateTime: string) => {
    const dateTime = new Date(stringDateTime);
    return dateTime.getFullYear();
  };
  useEffect(() => {
    if (
      width < 768 &&
      Object.keys(movie).length !== 0 &&
      window.scrollY !== 295
    ) {
      window.scrollTo(0, 295);
    }
  }, [movie]);
  return (
    <>
      <main
        className={`min-h-screen w-full flex flex-col justify-center gap-8 ${
          Object.keys(movie).length !== 0 ? "my-8" : "my-0"
        } md:my-0`}
      >
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
          <span className="block w-fit text-center text-[#FFFCF9] text-base font-normal mx-auto md:text-start md:hidden">
            Clique em "Encontrar filme" que traremos informações de algum filme
            para você assistir hoje.
          </span>
        </div>
        {Object.keys(movie).length !== 0 && (
          <div className="flex flex-col gap-9 w-full md:w-[42.25rem] md:mx-auto md:flex-row md:h-96 md:overflow-hidden">
            <div className="relative w-full h-[calc(100vw+(100vw*0.3))] mx-auto sm:w-64 sm:h-96">
              {loadingImage && (
                <div className="absolute left-[calc(50%-1.5rem)] top-[calc(50%-1.5rem)]">
                  <LoadingSpinner />
                </div>
              )}
              <img
                id="movie-poster"
                onLoad={() => handleLoadingImage(false)}
                className="h-full w-full"
                src={`${import.meta.env.VITE_IMG_URL}${movie.poster_path}`}
                alt={`Poster do filme ${movie.title}`}
              />
              <span
                className={`absolute top-0 right-0 text-base p-2 bg-purple-800 text-[#fff] rounded-bl-md`}
              >
                Média: {movie.vote_average.toFixed(2)}
              </span>
            </div>
            <div className="flex flex-col gap-5 max-w-sm mx-auto md:mx-0">
              <h2 className="text-xl text-center font-semibold text-[#FFFCF9] md:text-start">
                {movie.title} -{" "}
                <span className="underline underline-offset-4">
                  {convertStringDateTimeToDateTime(movie.release_date)}
                </span>
              </h2>
              <span className="text-center px-4 text-[#FFFCF9] text-base font-normal overflow-y-auto md:text-start md:px-0">
                {movie.overview !== ""
                  ? movie.overview
                  : "Esse filme não tem uma descrição pré definida!"}
              </span>
            </div>
          </div>
        )}
        {width >= 768 && (
          <footer id="web-footer" className="flex flex-col gap-4">
            <div className="flex justify-center gap-4">
              <button
                onClick={() => updateMovie(sortBy, withGenres, voteCountGte, includeAdult)}
                className="w-fit flex gap-4 justify-center items-center bg-[#E9E6E3] p-4 rounded-md"
              >
                <div className="w-9 h-6">
                  <img
                    className="h-full w-full"
                    src="/assets/shuffle.svg"
                    alt="Icone de sortear"
                  />
                </div>
                <span className="text-[#000] font-bold text-sm">
                  Encontrar filme
                </span>
              </button>
              <FiltersComponent />
            </div>
            <span className=" w-fit text-[#FFFCF9] text-base font-normal mx-auto">
              Clique em "Encontrar filme" que traremos informações de algum
              filme para você assistir hoje.
            </span>
          </footer>
        )}
      </main>
      {width < 768 && (
        <footer
          id="mobile-footer"
          className="flex flex-col gap-4 py-4 mx-auto sticky bottom-0 w-full bg-[#262626]"
        >
          <div className="flex justify-center gap-4">
            <button
              onClick={() => updateMovie(sortBy, withGenres, voteCountGte, includeAdult)}
              className="w-fit flex gap-2 justify-center items-center bg-[#E9E6E3] p-4 rounded-md"
            >
              <div className="w-7 h-4">
                <img
                  className="h-full w-full"
                  src="/assets/shuffle.svg"
                  alt="Icone de sortear"
                />
              </div>
              <span className="text-[#000] text-xs font-bold">
                Encontrar filme
              </span>
            </button>
            <FiltersComponent />
            <button
              onClick={() => window.scrollTo(0, document.body.scrollHeight)}
              className="flex gap-2 justify-center items-center bg-[#E9E6E3] p-2 rounded-md"
            >
              <img className="w-8 h-8" src="/assets/arrow-down.svg" alt="" />
            </button>
          </div>
          <span className="hidden w-fit text-center text-[#FFFCF9] text-base font-normal mx-auto">
            Clique em "Encontrar filme" que traremos informações de algum filme
            para você assistir hoje.
          </span>
        </footer>
      )}
    </>
  );
}
