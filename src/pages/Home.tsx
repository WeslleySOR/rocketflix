import { useState } from "react";
import { instance } from "../services/axios";

import { IMovie } from "../types/Movie";
import { IMovieListItem, IMovieList } from "../types/MovieList";

export function Home() {
  const [actualMovie, setActualMovie] = useState<IMovie>({} as IMovie);

  const [sortBy, setSortBy] = useState("");
  const [withGenres, setWithGenres] = useState<number>();
  
  const [voteCountGte, setVoteCountGte] = useState(0);
  const [includeAdult, setIncludeAdult] = useState(false);

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
      });
  };
  return (
    <main className="min-h-screen w-full flex flex-col justify-center gap-8 pt-12 pb-16">
      <div className="flex flex-col w-full items-center gap-3">
        <div className="w-20 h-14">
          <img
            className="h-full w-full"
            src="/assets/shuffle.svg"
            alt="Icone de sortear"
          />
        </div>
        <h1 className="text-center text-[#FFFCF9] text-4xl font-bold lg:text-start">
          Não sabe o que assistir?
        </h1>
      </div>
      {Object.keys(actualMovie).length !== 0 && (
        <div className="flex flex-col gap-9 lg:mx-16 lg:flex-row lg:h-96 lg:overflow-hidden">
          <div className="relative w-auto h-96">
            <img
              className="h-full w-full"
              src={`${import.meta.env.VITE_IMG_URL}${actualMovie.poster_path}`}
              alt={`Poster do filme ${actualMovie.title}`}
            />
            <span
              className={`w-12 h-12 absolute bottom-0 right-0 text-base text-[#F3FFF5]`}
            >
              2222
            </span>
          </div>
          <div className="flex flex-col gap-5 max-w-md">
            <h2 className="text-xl text-center font-semibold text-[#FFFCF9] lg:text-start">
              {actualMovie.title} -{" "}
              <span className="underline underline-offset-4">
                {convertStringDateTimeToDateTime(actualMovie.release_date)}
              </span>
            </h2>
            <span className="text-center px-4 text-[#FFFCF9] text-base font-normal overflow-y-auto lg:text-start lg:px-0">
              {actualMovie.overview !== ""
                ? actualMovie.overview
                : "Esse filme não tem uma descrição pré definida!"}
            </span>
          </div>
        </div>
      )}
      <div className="flex gap-4 mx-auto">
        <div className="flex flex-col">
          <span className="text-[#FFFCF9] text-base">Escolha um gênero</span>
          <select value={withGenres} onChange={(e) => setWithGenres(parseInt(e.target.value))}>
            <option value={undefined}>Aleatório</option>
            <option value={28}>Ação</option>
            <option value={12}>Aventura</option>
            <option value={16}>Animação</option>
            <option value={35}>Comédia</option>
            <option value={80}>Crime</option>
            <option value={99}>Documentário</option>
            <option value={18}>Drama</option>
            <option value={10751}>Família</option>
            <option value={14}>Fantasia</option>
            <option value={36}>História</option>
            <option value={27}>Terror</option>
            <option value={10402}>Musica</option>
            <option value={9648}>Mistério</option>
            <option value={10749}>Romance</option>
            <option value={878}>Ficção científica</option>
            <option value={10770}>Cinema TV</option>
            <option value={53}>Thriller</option>
            <option value={10752}>Guerra</option>
            <option value={37}>Faroeste</option>
          </select>
        </div>
        <div className="flex flex-col">
          <span className="text-[#FFFCF9] text-base">Ordenar filmes por</span>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Não ordenar</option>
            <option value="popularity.asc">Popularidade ASC</option>
            <option value="popularity.desc">Popularidade DESC</option>
            <option value="release_date.asc">Data de lançamento ASC</option>
            <option value="release_date.desc">Data de lançamento DESC</option>
            <option value="vote_average.asc">Média de nota ASC</option>
            <option value="vote_average.desc">Média de nota DESC</option>
          </select>
        </div>
        <div className="flex mt-auto gap-2">
          <span className="text-[#FFFCF9] text-base">
            Quantidade mínima de avaliações
          </span>
          <input
            min="0"
            className="w-12"
            type="number"
            value={voteCountGte}
            onChange={(e) => setVoteCountGte(parseInt(e.target.value))}
          />
        </div>
        <div className="flex mt-auto gap-2">
          <span className="text-[#FFFCF9] text-base">Incluir +18</span>
          <input
            type="checkbox"
            checked={includeAdult}
            onChange={(e) => setIncludeAdult(e.target.checked)}
          />
        </div>
      </div>
      <button
        onClick={() => getMoviesFromApi()}
        className="w-fit flex gap-4 justify-center items-center bg-[#E9E6E3] p-4 rounded-md mx-auto"
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
      <span className="w-fit text-center text-[#FFFCF9] text-base font-normal mx-auto lg:text-start">
        Clique em "Encontrar filme" que traremos informações de algum filme para
        você assistir hoje.
      </span>
    </main>
  );
}
