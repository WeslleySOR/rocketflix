import { ReactNode } from "react";
import { FiltersContextProvider } from "./FiltersContext";
import { MoviesContextProvider } from "./MovieContext";

type Props = {
  children: ReactNode;
};

export default function GlobalContext({ children }: Props) {
  return (
    <MoviesContextProvider>
      <FiltersContextProvider>{children}</FiltersContextProvider>
    </MoviesContextProvider>
  );
}
