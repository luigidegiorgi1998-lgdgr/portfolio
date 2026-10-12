import Game from "@/components/game/Game";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-3 py-6 sm:px-6">
      <h1 className="sr-only">Luigi De Giorgi, Product Designer: portfolio interattivo in stile Pokémon</h1>
      <Game />
    </div>
  );
}
