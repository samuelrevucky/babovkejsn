import { Bebas_Neue } from "next/font/google";
import Variants from "../variants";
import { getProducts } from "../../user/order/page";
import { Product } from "../../user/order/page";

const bebas = Bebas_Neue({weight: "400", preload: false});


export default async function Tiramisu() {
    const products: Product[] = await getProducts();
    const tiramisu: Product | undefined = products.find(prod => prod.name === 'Tiramisu');
    return (
        <main className="flex min-h-screen flex-col items-center">
            <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start lg:mx-auto px-6">
                <div className="lg:w-1/2">
                    <img
                    className="w-full md:h-auto md:w-auto"
                    src="/tiramisu.jpg"
                    alt="Product"
                    />
                </div>
                <div className="flex flex-col lg:w-1/2 my-10 items-center">
                    <h2 className={`${bebas.className} mb-3 text-5xl font-semibold`}>
                        Talianske tiramisu pre kožmekerov
                    </h2>
                    <div>
                        <p className="text-center mx-10 text-lg text-semibold mt-4 text-balance">
                        Poznáte to, objednáte si ku káve tiramisu a dostanete piškóty prekladané šľahačkou. 
                        Od nás dostanete koláč hutný a šťavnatý, taký aký má byť. Používame kvalitnú kávu, 
                        Amaretto, mascarpone a (samozrejme pasterizované) vajcia, lebo bez nich to nie je ono. 
                        Vychutnajte si tento lahodný zážitok. 
                        </p>
                    </div>  
                </div>
            </div>
            <div className="flex justify-center items-center bg-yellow-800 w-full mt-8">
                <div className="grid text-center w-full md:w-1/2 my-4 sm:grid-cols-4">
                    <h2 className={`${bebas.className} flex justify-center items-center text-2xl font-semibold text-white`}>
                        Čerstvé
                    </h2>
                    <h2 className={`${bebas.className} flex justify-center items-center text-2xl font-semibold text-white`}>
                        šťavnaté
                    </h2>
                    <h2 className={`${bebas.className} flex justify-center items-center text-2xl font-semibold text-white`}>
                        krémové
                    </h2>
                    <h2 className={`${bebas.className} flex justify-center items-center text-2xl font-semibold text-white`}>
                        konzistentné
                    </h2>
                </div>
            </div>
            {(() => {
                if (tiramisu === undefined) {
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
                            Štandardne tiramisu neposypávame, aby kakao nezvlhlo. Môžete si ale vybrať aj možnosť s posypom.
                            </p>
                            <Variants includedFeatures={tiramisu.variants} basePrice={tiramisu.base_price}/>
                        </div>
                    );
                }
            })()}
        </main>
    );
}