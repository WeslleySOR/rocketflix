import { createContext, ReactNode, useState } from "react";
import { instance } from "../services/axios";

import { IMovie } from "../types/Movie";
import { IMovieList, IMovieListItem } from "../types/MovieList";

type MovieContextProps = {
  children: ReactNode;
};

type MovieContextType = {
  movie: IMovie;
  loadingImage: boolean;
  handleLoadingImage: (newValue: boolean) => void;
  updateMovie: (sortBy: string, withGenres: number | undefined, voteCountGte: number, includeAdult: boolean) => Promise<void>;
};

export const MovieContext = createContext<MovieContextType>(
  {} as MovieContextType
);

export const MoviesContextProvider = ({ children }: MovieContextProps) => {
  const [movie, setMovie] = useState<IMovie>({} as IMovie);
  const [loadingImage, setLoadingImage] = useState(true);

  const handleLoadingImage = (newValue: boolean) => {
    return setLoadingImage(newValue);
  };

  const updateMovie = async (sortBy: string, withGenres: number | undefined, voteCountGte: number, includeAdult: boolean) => {
    var image = document.getElementById("movie-poster") as HTMLImageElement;
    if (image) {
      image.src = "";
      image.alt = "";
    }
    handleLoadingImage(true);
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
        handleChangeMovie(response.data);
      });
  };

  const handleChangeMovie = (newValue: IMovie) => {
    return setMovie(newValue);
  };

  return (
    <MovieContext.Provider
      value={{
        movie,
        loadingImage,
        updateMovie,
        handleLoadingImage,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
