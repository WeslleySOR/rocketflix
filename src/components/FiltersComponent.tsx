import { useContext, useState } from "react";

import { FiltersContext } from "../contexts/FiltersContext";

export function FiltersComponent() {
  const [filterOpened, setFilterOpened] = useState(false);

  const { sortBy, withGenres, voteCountGte, includeAdult, handleIncludeAdult, handleSortByFilter, handleVoteCountGte, handleWithGenresFilter } = useContext(FiltersContext);

  return (
    <div className="relative">
      <button
        onClick={() => setFilterOpened(!filterOpened)}
        className="flex items-center gap-2 py-2 px-4 bg-purple-600 hover:bg-purple-700 text-lg text-[#fff] rounded-md"
      >
        Filtro <img className="w-7 h-7" src="/assets/filter-icon.svg" alt="" />
      </button>
      <div
        className={`absolute top-full right-0 flex flex-col overflow-hidden bg-[#262626] transition-all duration-300 ${
          filterOpened ? "h-fit" : "h-0"
        }`}
      >
        <div className="flex flex-col">
          <span className="text-[#FFFCF9] text-base">Escolha um gênero</span>
          <select
            value={withGenres}
            onChange={(e) => handleWithGenresFilter(parseInt(e.target.value))}
          >
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
          <select value={sortBy} onChange={(e) => handleSortByFilter(e.target.value)}>
            <option value="">Não ordenar</option>
            <option value="popularity.asc">Popularidade ASC</option>
            <option value="popularity.desc">Popularidade DESC</option>
            <option value="release_date.asc">Data de lançamento ASC</option>
            <option value="release_date.desc">Data de lançamento DESC</option>
            <option value="vote_average.asc">Média de nota ASC</option>
            <option value="vote_average.desc">Média de nota DESC</option>
          </select>
        </div>
        <div className="flex">
          <span className="text-[#FFFCF9] text-base">
            Quantidade mínima de avaliações
          </span>
          <input
            min="0"
            type="number"
            value={voteCountGte}
            onChange={(e) => handleVoteCountGte(parseInt(e.target.value))}
          />
        </div>
        <div className="flex">
          <span className="text-[#FFFCF9] text-base">Incluir +18</span>
          <input
            type="checkbox"
            checked={includeAdult}
            onChange={(e) => handleIncludeAdult(e.target.checked)}
          />
        </div>
      </div>
    </div>
  );
}
