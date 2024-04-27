"use client";

import { Bebas_Neue } from "next/font/google";
import { useState } from "react";


const bebas = Bebas_Neue({weight: "400", preload: false});


export default function Variants({includedFeatures, basePrice}: {includedFeatures: {
    [key: string]: {
      [key: string]: {
        cas: number,
        cena: number
      }
    }
  }, basePrice: number}) {
    
    const [selectedOptions, setSelectedOptions] = useState(() => {
        const tmp: {[key: string]: string} = {};
        for (let key in includedFeatures) {
            tmp[key] = Object.keys(includedFeatures[key])[0];
        }
        return tmp;
    });
    const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        const { name, value } = event.target;
        setSelectedOptions({ ...selectedOptions, [name]: value });
      };
    let price: number = Object.entries(selectedOptions).reduce(
        (acc, [optionType, selectedOption]) => {
          return acc + includedFeatures[optionType][selectedOption].cena;
        }, basePrice);
    
    return (
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
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
                    <div className="h-full rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 flex flex-col justify-center items-center">
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
                    </div>
                    </div>
                </div> 
            </form>
        </div>
    );
}