import Variants from "../variants";
import { Product } from "../../user/order/page";
import { getProducts } from "../../user/order/page";
import { Bebas_Neue } from "next/font/google";


const bebas = Bebas_Neue({weight: "400", preload: false});


export default async function Babovka() {
    const products: Product[] = await getProducts();
    const babovka: Product | undefined = products.find(prod => prod.name === 'Bábovka');
    return (
        <main className="flex min-h-screen flex-col items-center">
            <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start lg:mx-auto px-6">
                <div className="lg:w-1/2">
                    <img
                    className="w-full md:h-auto md:w-auto"
                    src="/babovka.jpg"
                    alt="Product"
                    />
                </div>
                <div className="flex flex-col lg:w-1/2 my-10 items-center">
                    <h2 className={`${bebas.className} mb-3 text-5xl text-center font-semibold`}>
                        Dobré rejnou bábovkejšn
                    </h2>
                    <div>
                        <p className="text-center mx-10 text-lg text-semibold mt-4 text-balance">
                        Luxusne namakaná bábovka, pripravená z domácich surovín.
                        Každý kúsok je nádychom čerstvosti a jemnosti. 
                        Užite si šťavnatú chuť s každým kúskom. 
                        Objednajte si teraz a premeňte aj svoje obyčajné chvíle na lahodné zážitky.
                        </p>
                    </div>  
                </div>
            </div>
            <div className="flex justify-center items-center bg-yellow-800 w-full mt-8">
                <div className="grid text-center w-1/2 my-4 grid-cols-3">
                    <h2 className={`${bebas.className} flex justify-center items-center text-2xl font-semibold text-white`}>
                        Čerstvá
                    </h2>
                    <h2 className={`${bebas.className} flex justify-center items-center text-2xl font-semibold text-white`}>
                        šťavnatá
                    </h2>
                    <h2 className={`${bebas.className} flex justify-center items-center text-2xl font-semibold text-white`}>
                        nadýchaná
                    </h2>
                </div>
            </div>
            {(() => {
                if (babovka === undefined) {
                    return (
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Ospravedlňujeme sa, varianty a ceny produktu sa nepodarilo načítať.
                            </h2>
                        </div>
                    );
                }
                else {
                    return (
                        <div className="mt-20 mx-auto max-w-2xl text-center">
                            <h2 className={`${bebas.className} text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl`}>Jednoduchý cenník</h2>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                Štandardne bábovka obsahuje kakao a kúsky čokolády a je posypaná cukrom. Na výber máte rôzne možnosti plnky a polevy.
                            </p>
                            <Variants includedFeatures={babovka.variants} basePrice={babovka.base_price}/>
                        </div>
                    );
                }
            })()}
        </main>
    );
}