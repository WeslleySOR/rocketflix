import { ReactNode } from "react";
import { FiltersContextProvider } from "./FiltersContext";

type Props = {
  children: ReactNode;
};

export default function GlobalContext({ children }: Props) {
  return <FiltersContextProvider>{children}</FiltersContextProvider>;
}
