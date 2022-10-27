import { createContext, ReactNode, useState } from "react";

type FiltersContextProps = {
  children: ReactNode;
};

type FiltersContextType = {
  sortBy: string;
  withGenres: number | undefined;
  voteCountGte: number;
  includeAdult: boolean;
  handleSortByFilter: (newValue: string) => void;
  handleWithGenresFilter: (newValue: number | undefined) => void;
  handleVoteCountGte: (newValue: number) => void;
  handleIncludeAdult: (newValue: boolean) => void;
};

export const FiltersContext = createContext<FiltersContextType>(
  {} as FiltersContextType
);

export const FiltersContextProvider = ({ children }: FiltersContextProps) => {
  const [sortBy, setSortBy] = useState("");
  const [withGenres, setWithGenres] = useState<number>();
  const [voteCountGte, setVoteCountGte] = useState(0);
  const [includeAdult, setIncludeAdult] = useState(false);

  const handleSortByFilter = (newValue: string) => {
    return setSortBy(newValue);
  };

  const handleWithGenresFilter = (newValue: number | undefined) => {
    return setWithGenres(newValue);
  };

  const handleVoteCountGte = (newValue: number) => {
    return setVoteCountGte(newValue);
  };

  const handleIncludeAdult = (newValue: boolean) => {
    return setIncludeAdult(newValue);
  };

  return (
    <FiltersContext.Provider
      value={{
        sortBy,
        withGenres,
        voteCountGte,
        includeAdult,
        handleSortByFilter,
        handleWithGenresFilter,
        handleVoteCountGte,
        handleIncludeAdult,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
