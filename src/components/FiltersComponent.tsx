import { useContext, useState } from "react";

import { FiltersContext } from "../contexts/FiltersContext";

export function FiltersComponent() {
  const [filterOpened, setFilterOpened] = useState(false);

  const {
    sortBy,
    withGenres,
    voteCountGte,
    includeAdult,
    handleIncludeAdult,
    handleSortByFilter,
    handleVoteCountGte,
    handleWithGenresFilter,
    cleanAllFilters,
  } = useContext(FiltersContext);

  const saveFilters = () => {
    return setFilterOpened(false);
  }
  return (
    <div className="relative">
      <button
        onClick={() => setFilterOpened(!filterOpened)}
        className="w-fit flex gap-4 justify-center items-center bg-[#E9E6E3] p-4 rounded-md"
      >
        <span className="text-[#000] text-sm font-bold">Filtros</span>{" "}
        <img className="w-7 h-7" src="/assets/filter-icon.svg" alt="" />
      </button>
      <div
        className={`absolute bottom-[120%] right-0 overflow-hidden rounded-md bg-[#262626] transition-all duration-300 ${
          filterOpened ? "h-fit" : "h-0"
        }`}
      >
        <div className="flex flex-col gap-4 py-6 px-10 rounded-md ring-2 ring-blue-500 ring-inset">
          <div className="flex flex-col">
            <span className="text-[#FFFCF9] text-sm">Escolha um gênero</span>
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
            <select
              value={sortBy}
              onChange={(e) => handleSortByFilter(e.target.value)}
            >
              <option value="">Não ordenar</option>
              <option value="popularity.asc">Popularidade ASC</option>
              <option value="popularity.desc">Popularidade DESC</option>
              <option value="release_date.asc">Data de lançamento ASC</option>
              <option value="release_date.desc">Data de lançamento DESC</option>
              <option value="vote_average.asc">Média de nota ASC</option>
              <option value="vote_average.desc">Média de nota DESC</option>
            </select>
          </div>
          <div className="flex flex-col">
            <span className="text-[#FFFCF9] text-base">
              Quantidade mínima de avaliações
            </span>
            <input
              className="text-center"
              min="0"
              type="number"
              value={voteCountGte}
              onChange={(e) => handleVoteCountGte(parseInt(e.target.value))}
            />
          </div>
          <div className="flex gap-2 mx-auto items-center">
            <span className="text-[#FFFCF9] text-base">Incluir +18 ?</span>
            <input
              type="checkbox"
              checked={includeAdult}
              onChange={(e) => handleIncludeAdult(e.target.checked)}
            />
          </div>
          <div className="flex gap-4 items-center justify-center">
            <button onClick={saveFilters} className="w-fit flex gap-4 justify-center items-center bg-blue-600 py-2 px-6 rounded-md">
              <span className="text-[#fff] text-base">Salvar</span>
            </button>
            <button onClick={cleanAllFilters} className="w-fit flex gap-4 justify-center items-center bg-red-600 py-2 px-6 rounded-md">
              <span className="text-[#fff] text-base">Limpar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
