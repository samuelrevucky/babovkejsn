import { Bebas_Neue } from "next/font/google"
import Home from "./home";
import About from "./about";

const bebas = Bebas_Neue({weight: "400", preload: false});


export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Home/>
      <About/>
    </main>
  );
}
