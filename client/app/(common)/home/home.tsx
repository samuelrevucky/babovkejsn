import { Bebas_Neue } from "next/font/google"
import Link from "next/link";

const bebas = Bebas_Neue({weight: "400", preload: false});

export default function Home() {
    return (
    <>
      <div className="relative flex-col items-top justify-center white">
        <img
          className="relative"
          src="/babovky.jpg"
          alt="Babovkejsn Logo"
        />
        <div className="flex items-top justify-center">
            <p className={`${bebas.className} text-black font-thin text-4xl p-10`}>
              Naložené domáce koláče k vám domov</p>
        </div>
        <div className="flex mb-4 justify-center pb-10">
          <Link href="/user/order">
            <button className={`${bebas.className}  bg-gray-500 text-white rounded-lg items-center py-2 px-4 text-2xl`}>Objednať</button>
          </Link>
        </div>
      </div>

      <div className=" grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className={`${bebas.className} mb-3 text-2xl font-semibold`}>
            Čerstvosť
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-80 text-balance`}>
            Do koláčov nepridávame konzervanty. Budete ich teda musieť zjesť čím skôr, o to sa ale nebojíme {';)'}
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className={`${bebas.className} mb-3 text-2xl font-semibold`}>
            Tradícia
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-80 text-balance`}>
            Naše koláče sú rokmi overené rodinou a priateľmi a chceli by sme ich týmto sprístupniť aj ďalším kajšment..ľuďom.
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className={`${bebas.className} mb-3 text-2xl font-semibold`}>
            Bratislava
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-80 text-balance`}>
            Sme z Bratislavy a zatiaľ v nej aj ostávame, ale človek nikdy nevie, čo budúcnosť prinesie.
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className={`${bebas.className} mb-3 text-2xl font-semibold`}>
            Nie len bábovky
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-80 text-balance`}>
            Aj keď sa to na prvý pohľad môže zdať, náš skill sa nevzťahuje len na bábovky. Našu ponuku samozrejme plánujeme v budúcnosti zväčšovať.
          </p>
        </div>
      </div>
    </>
    );
}