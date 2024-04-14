"use client";

import { Bebas_Neue } from "next/font/google";
import { useState } from "react";


const bebas = Bebas_Neue({weight: "400", preload: false});


export default function Babovka() {
    const includedFeatures: {[key: string]: {[key: string]: number}} = {
        'Polevy': {'žiadna': 0, 'vanilka': 3, 'citrón': 3, 'čokoláda': 3},
        'Plnka': {'čokoláda + kakao': 0, 'žiadna': 0},
        'Posyp': {'cukor': 0, 'oriešky': 2},
        'Diéta': {'žiadna': 0, 'bezlepková': 2, 'bezlaktózová': 2, 'oboje': 3}
    }
    const [selectedOptions, setSelectedOptions] = useState({
        'Polevy': 'žiadna',
        'Plnka': 'čokoláda + kakao',
        'Posyp': 'cukor',
        'Diéta': 'žiadna'
    });
    const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        const { name, value } = event.target;
        setSelectedOptions({ ...selectedOptions, [name]: value });
      };
    let price: number = Object.entries(selectedOptions).reduce(
        (acc, [optionType, selectedOption]) => {
          return acc + includedFeatures[optionType][selectedOption];
        }, 20);
    
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
                    <h2 className={`${bebas.className} mb-3 text-5xl font-semibold`}>
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
            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-4xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl sm:text-center">
                        <h2 className={`${bebas.className} text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl`}>Jednoduchý cenník</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Štandardne bábovka obsahuje kakao a kúsky čokolády a je posypaná cukrom. Na výber máte rôzne možnosti plnky a polevy.
                        </p>
                    </div>
                    <form className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
                        <div className="p-8 sm:p-10 lg:flex-auto">
                            <p className="text-base leading-7 text-gray-600">
                                Vyberte si spomedzi ponúkaných možností pre zobrazenie zodpovedajúcej ceny.
                            </p>
                            <div className="mt-2 flex items-center gap-x-4">
                                <div className="h-px flex-auto bg-gray-100" />
                            </div>
                            <div className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6">
                            {Object.keys(includedFeatures).map((feature) => (
                                <div className="sm:col-span-1" key={feature}>
                                <label htmlFor={feature} className="block text-sm font-medium leading-6 text-gray-900">
                                {feature}
                                </label>
                                <div className="mt-2">
                                <select
                                    id={feature}
                                    name={feature}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    onChange={handleOptionChange}
                                >   
                                    {Object.keys(includedFeatures[feature]).map((option) => (
                                        <option key={option}>{option}</option>
                                    ))}
                                </select>
                                </div>
                                </div>
                            ))}
                            </div>
                        </div>
                        <div className="-mt-2 p-2 lg:mt-0 lg:max-w-md lg:flex-shrink-0">
                            <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                            <div className="mx-auto max-w-xs px-8">
                                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                                <span className="text-5xl font-bold tracking-tight text-gray-900">
                                    {price}
                                </span>
                                <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">EUR</span>
                                </p>
                                <a
                                href="/user/order"
                                className="mt-10 block w-full rounded-md bg-yellow-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                Objednať
                                </a>
                                <p className="mt-6 text-xs leading-5 text-gray-600">
                                Váha TBDg
                                </p>
                                <p className="text-xs leading-5 text-gray-600 break-words">
                                Alergény: TBD
                                </p>
                            </div>
                            </div>
                        </div> 
                    </form>
                </div>
            </div>
        </main>
    );
}