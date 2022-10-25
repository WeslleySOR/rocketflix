// import { useEffect } from "react"

export function Home() {
  // useEffect(() => {
  //   console.log(import.meta.env.VITE_API_KEY)
  // }, [])
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
      {/* TODO: Aqui irá o component do filme escolhido */}
      <button className="flex gap-4 justify-center items-center bg-[#E9E6E3] p-4 rounded-md">
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
